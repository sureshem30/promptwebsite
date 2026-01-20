"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
    role: "user" | "assistant";
    content: string;
};

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatOverlay() {
    const router = useRouter();

    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);

    const recognitionRef = useRef<any>(null);

    /* -----------------------------------------
       INIT SPEECH RECOGNITION
    ------------------------------------------ */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            setInput(transcript);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    /* -----------------------------------------
       START / STOP MIC
    ------------------------------------------ */
    function toggleListening() {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (listening) {
            recognitionRef.current.stop();
            setListening(false);
        } else {
            recognitionRef.current.start();
            setListening(true);
        }
    }

    /* -----------------------------------------
       SEND MESSAGE
    ------------------------------------------ */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userText = input.trim();
        setInput("");

        setMessages((prev) => [...prev, { role: "user", content: userText }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);

            if (data.intent === "ABOUT") router.push("/about");

            if (data.intent === "PROMOTION") {
                if (data.view === "LIST") router.push("/case-studies");
                if (data.view === "DETAIL" && data.caseStudies?.length) {
                    router.push(`/case-studies/${data.caseStudies[0].slug}`);
                }
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Something went wrong." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* BACKGROUND */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* CHAT MODAL */}
            {open && (
                <div className="fixed z-50 top-1/2 left-1/2 w-[92%] max-w-md h-[520px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl flex flex-col">
                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <span className="font-semibold">Chat Assistant</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-xl text-gray-500"
                        >
                            ×
                        </button>
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.role === "user"
                                    ? "ml-auto bg-black text-white"
                                    : "bg-gray-100"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="text-xs text-gray-400">Typing…</div>
                        )}
                    </div>

                    {/* INPUT + MIC */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 px-3 py-3 border-t"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={listening ? "Listening..." : "Ask something…"}
                            enterKeyHint="send"
                            disabled={loading}
                            className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
                        />

                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${listening ? "bg-red-500" : "bg-black"
                                }`}
                        >
                            🎤
                        </button>
                    </form>
                </div>
            )}

            {/* OPEN CHAT BUTTON */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-black text-white px-5 py-3 rounded-full shadow-lg"
                >
                    Chat
                </button>
            )}
        </>
    );
}
