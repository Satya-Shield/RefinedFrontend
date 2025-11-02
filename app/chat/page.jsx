"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const ChatPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get claim from URL params and add initial context
    const claim = searchParams.get("claim");
    const verdict = searchParams.get("verdict");
    
    if (claim) {
      setMessages([
        {
          type: "system",
          content: `Continue your conversation about: "${claim}" (Verdict: ${verdict || "Unknown"})`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAnalyzing) return;

    const userMessage = {
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAnalyzing(true);

    // Simulate AI response (replace with your actual API call)
    setTimeout(() => {
      const aiMessage = {
        type: "ai",
        content: `I understand you're asking about: "${inputValue}". Let me analyze this further for you...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background - Same as Combat page */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-25"></div>

      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-60 -left-60 w-[1000px] h-[1000px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(245,245,220,0.15) 0%, rgba(255,228,181,0.08) 30%, rgba(255,248,220,0.04) 60%, transparent 100%)",
            filter: "blur(150px)",
          }}
        ></div>
        <div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, rgba(245,245,220,0.12) 0%, rgba(255,228,181,0.06) 40%, rgba(255,248,220,0.03) 70%, transparent 100%)",
            filter: "blur(120px)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Verification
          </button>

          {/* Chat Header */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
                <p className="text-sm text-gray-600">Ask follow-up questions about your claim</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "system" ? (
                    <div className="w-full text-center">
                      <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                          : "bg-white/80 text-gray-800"
                      } rounded-2xl px-5 py-3 shadow-md`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.type === "user"
                            ? "text-purple-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-white/80 rounded-2xl px-5 py-3 shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <span className="text-sm text-gray-600 ml-2">
                        Analyzing data, please wait...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask, write or search for anything..."
                className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
                disabled={isAnalyzing}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isAnalyzing}
                className="w-10 h-10 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Create in-depth analysis
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                Identify actionable tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;