"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatOverlay() {
    const router = useRouter();

    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userText = input.trim();
        setInput("");

        // Show user message immediately
        setMessages((prev) => [...prev, { role: "user", content: userText }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            });

            const data = await res.json();

            // Show assistant response
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);

            // Navigation based on intent
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
                {
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* 🔘 FLOATING BUTTON WHEN CHAT IS CLOSED */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-black text-white px-5 py-3 rounded-full shadow-lg"
                >
                    Chat
                </button>
            )}

            {/* 🌑 LIGHT TRANSPARENT BLACK BACKGROUND */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* 💬 CHAT MODAL */}
            {open && (
                <div className="fixed z-50 top-1/2 left-1/2 w-[92%] max-w-md h-[520px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl flex flex-col">
                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <span className="font-semibold">Chat Assistant</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-xl leading-none text-gray-500 hover:text-black"
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

                    {/* INPUT (NO SEND BUTTON) */}
                    <form onSubmit={handleSubmit} className="px-3 py-3 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask something…"
                            enterKeyHint="send"
                            inputMode="text"
                            disabled={loading}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                        />
                    </form>
                </div>
            )}
        </>
    );
}
