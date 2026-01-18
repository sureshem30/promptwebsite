"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatOverlay() {
    const router = useRouter();
    const pathname = usePathname();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);

    const isHome = pathname === "/";
    const isModal = isHome && open;
    const isMini = !isHome;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await res.json();

        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
        ]);

        setLoading(false);

        // Navigation
        if (data.intent === "ABOUT") router.push("/about");
        if (data.intent === "HOME") router.push("/");
        if (data.intent === "PROMOTION") {
            if (data.view === "LIST") {
                router.push("/case-studies");
            }

            if (data.view === "DETAIL" && data.caseStudies?.length) {
                router.push(`/case-studies/${data.caseStudies[0].slug}`);
            }
        }


        setOpen(false);
    }

    return (
        <>
            {/* BACKDROP (ONLY HOME MODAL) */}
            {isModal && <div className="fixed inset-0 bg-black/40 z-40" />}

            {/* CHAT CONTAINER */}
            <div
                className={`
          fixed z-50 bg-white shadow-2xl transition-all duration-500 flex flex-col
          ${isModal
                        ? "top-1/2 left-1/2 w-[90%] max-w-md h-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                        : isMini
                            ? "bottom-4 right-4 w-[340px] h-[420px] rounded-xl"
                            : ""
                    }
        `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-3 border-b text-sm font-semibold">
                    Website Assistant
                    {!isModal && (
                        <button
                            onClick={() => setOpen(true)}
                            className="text-xs text-gray-500 hover:text-black"
                        >
                            Expand
                        </button>
                    )}
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[85%] p-2 rounded-lg ${msg.role === "user"
                                ? "ml-auto bg-blue-600 text-white"
                                : "mr-auto bg-gray-100 text-gray-800"
                                }`}
                        >
                            {msg.content}
                        </div>
                    ))}

                    {loading && (
                        <div className="mr-auto bg-gray-100 p-2 rounded-lg text-gray-500">
                            Typing…
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* INPUT */}
                <form onSubmit={handleSubmit} className="p-3 border-t">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about us, promotions..."
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                    />
                </form>
            </div>
        </>
    );
}
