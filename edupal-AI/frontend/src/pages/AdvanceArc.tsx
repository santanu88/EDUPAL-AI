import type React from "react";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Send, Copy, ChevronRight, ArrowLeft, ArrowUp } from "lucide-react";
import architectureImage from "../assets/pic3.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ComputerArchitecture() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const subjectExpert = "computer architecture";
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Format AI response with better styling
  const formatResponse = (text: string) => {
    const formatted = text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Headers
      .replace(/^(#+\s.*$)/gm, "<strong>$1</strong>")
      // Code blocks
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Lists
      .replace(/^\s*[-*+]\s+(.*$)/gm, "• $1")
      // Steps
      .replace(/^\s*\d+\.\s+(.*$)/gm, "→ $1")
      // Line breaks
      .replace(/\n/g, "<br/>");

    return formatted;
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const { scrollTop } = chatContainerRef.current;
      setShowScrollTop(scrollTop > 300);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: msg.content,
        })),
        {
          role: "user",
          parts: input,
        },
      ];

      // Using Axios for the API call
     const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/ai/expert-chat`,
        {
          messages: apiMessages,
          subjectExpert,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleBack = () => {
    // Navigate back or implement custom back functionality
    window.history.back();
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header with back button */}
      <div className="p-4 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto flex items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-zinc-800 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white font-medium">Computer Architecture Expert Chat</h1>
        </div>
      </div>

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fade-in">
              <Avatar className="h-24 w-24 mb-6 transition-transform duration-300 hover:scale-110">
                <img
                  src={architectureImage}
                  alt="Computer Architecture Expert"
                  className="rounded-full bg-zinc-900"
                />
              </Avatar>
              <h1 className="text-2xl font-bold text-white mb-2">
                Computer Architecture Expert
              </h1>
              <p className="text-zinc-400 max-w-md">
                Ask me about CPU design, memory hierarchy, pipelining, cache optimization, 
                parallel computing, RISC vs CISC, or any computer architecture concepts
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full transition-all duration-300 ease-out",
                  message.role === "user" ? "justify-end" : "justify-start",
                  message.role === "assistant" ? "hover:bg-zinc-900/10" : ""
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[95%] md:max-w-[90%] transition-all duration-300",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {message.role !== "user" && (
                    <div className="flex-shrink-0 mr-3">
                      <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
                        <img
                          src={architectureImage}
                          alt="Computer Architecture Expert"
                          className="rounded-full bg-zinc-900"
                        />
                      </Avatar>
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 relative group transition-all duration-300",
                      message.role === "user"
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-900 text-gray-100 w-full"
                    )}
                  >
                    <>
                      <div className="flex justify-between items-center mb-1">
                        {message.role !== "user" && (
                          <div className="font-medium text-purple-400">
                            Computer Architecture Expert
                          </div>
                        )}
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                            title="Copy"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "whitespace-pre-wrap",
                          message.role === "assistant"
                            ? "prose prose-invert max-w-none"
                            : ""
                        )}
                        dangerouslySetInnerHTML={{
                          __html:
                            message.role === "assistant"
                              ? formatResponse(message.content)
                              : message.content,
                        }}
                      />

                      {message.role === "assistant" && (
                        <div className="mt-2 pt-2 border-t border-zinc-800 text-xs text-zinc-400 opacity-70">
                          <div className="flex items-center">
                            <ChevronRight size={12} className="mr-1" />
                            <span>
                              Specialized in{" "}
                              {subjectExpert.replace(/\b\w/g, (l) =>
                                l.toUpperCase()
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[95%] md:max-w-[90%]">
                <div className="flex-shrink-0 mr-3">
                  <Avatar className="h-8 w-8">
                    <img
                      src={architectureImage}
                      alt="Computer Architecture Expert"
                      className="rounded-full bg-zinc-900"
                    />
                  </Avatar>
                </div>
                <div className="rounded-2xl px-4 py-3 bg-zinc-900 text-gray-100 w-full">
                  <div className="font-medium text-purple-400 mb-3">
                    Generating...
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-16 h-16 relative">
                      {/* Infinity loading animation matching the image */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="156.2 156.2"
                          strokeDashoffset="156.2"
                          className="animate-infinity"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="156.2"
                            to="-156.2"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#86efac" />
                            <stop offset="50%" stopColor="#facc15" />
                            <stop offset="100%" stopColor="#f97316" />
                          </linearGradient>
                        </defs>
                        <style>
                          {`
                            path {
                              stroke: url(#gradient);
                            }
                            @keyframes infinity {
                              0% { stroke-dashoffset: 156.2; }
                              100% { stroke-dashoffset: -156.2; }
                            }
                            .animate-infinity {
                              animation: infinity 2s linear infinite;
                            }
                          `}
                        </style>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-800 bg-black p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto flex items-center space-x-2 transition-all duration-300"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about CPU design, memory hierarchy, pipelining, cache optimization..."
            className="flex-1 bg-white border-zinc-300 text-black placeholder:text-zinc-500 focus-visible:ring-purple-500 transition-all duration-300"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-20 right-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-10"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}