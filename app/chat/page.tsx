"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { CustomButton } from "@/components/button";
import { getUser } from "@/services/authService";
import { sendChatMessage } from "@/services/chatService";


interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}


function ChatPageContent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "in_progress">("idle");
  const [user, setUser] = useState<User | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "in_progress") return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStatus("in_progress");

    try {
      const res = await sendChatMessage(userMessage.text);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: res.data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            "I’m here with you, but something went wrong. Please try again 💙",
        },
      ]);
    } finally {
      setStatus("idle");
    }
  };

  const suggestedPrompts = [
    "I'm feeling anxious today",
    "How can I manage stress better?",
    "I need help sleeping",
    "Tips for staying motivated",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <div className="px-4 pt-24 pb-32 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Wellness AI Companion
          </h1>
          <p className="text-lg text-gray-600">
            Chat with an empathetic AI assistant about your mental wellness
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
          {/* Messages */}
          <div className="p-6 h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-5xl">💬</div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-700">
                    Start a conversation,{user ? ` ${user.name}` : ""}
                  </h2>
                  <p className="text-gray-500">
                    Share how you&apos;re feeling or ask for wellness tips
                  </p>
                </div>

                <div className="w-full">
                  <p className="mb-3 text-sm font-medium text-gray-600">
                    Try asking:
                  </p>
                  <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(prompt)}
                        className="p-3 text-sm text-left text-gray-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}

                {status === "in_progress" && (
                  <div className="flex justify-start mb-4">
                    <div className="px-4 py-3 bg-gray-100 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share how you're feeling..."
                disabled={status === "in_progress"}
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === "in_progress"}
              >
                Send
              </button>
            </form>

            <p className="mt-2 text-xs text-center text-gray-500">
              This AI assistant provides supportive guidance but does not replace
              professional therapy
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 text-sm text-center text-gray-600 bg-yellow-50 rounded-lg border border-yellow-200">
          <strong>Important:</strong> If you&apos;re experiencing a mental health
          crisis, please contact a mental health professional or call a crisis
          helpline immediately.
        </div>
      </div>
    </div>
  );
}


export default function ChatPage() {
  return (
      <ChatPageContent />
  );
}
