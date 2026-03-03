"use client";

import { useChat } from "@ai-sdk/react";
import { Bot, ChevronDown, Info, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Thinking toggle ────────────────────────────────────────────────────────

function ThinkingBlock({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[10px] text-cyan-400/50 transition-colors hover:text-cyan-400/80"
      >
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "" : "-rotate-90"}`} />
        {isStreaming ? (
          <span className="animate-pulse">Thinking…</span>
        ) : (
          <span>Thought process</span>
        )}
      </button>
      {open && (
        <div className="mt-1 border-l border-cyan-400/20 pl-2 text-[10px] leading-relaxed text-white/30">
          {text}
        </div>
      )}
    </div>
  );
}

// ─── Message bubble ──────────────────────────────────────────────────────────

function MessageBubble({
  role,
  parts,
  isStreaming,
}: {
  role: string;
  parts: Array<{ type: string; text?: string }>;
  isStreaming: boolean;
}) {
  const isUser = role === "user";

  const reasoningParts = parts.filter((p) => p.type === "reasoning");
  const textParts = parts.filter((p) => p.type === "text");
  const reasoningText = reasoningParts.map((p) => p.text ?? "").join("");
  const textContent = textParts.map((p) => p.text ?? "").join("");
  const hasText = textParts.some((p) => (p.text ?? "").length > 0);

  return (
    <div className="space-y-1">
      {reasoningText && (
        <ThinkingBlock text={reasoningText} isStreaming={isStreaming && !hasText} />
      )}
      <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400/60" />}
        <div
          className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed ${
            isUser ? "bg-cyan-500/20 text-white/80" : "bg-white/5 text-white/60"
          }`}
        >
          {textContent ||
            (isStreaming ? <Loader2 className="h-3 w-3 animate-spin text-white/40" /> : null)}
        </div>
        {isUser && <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />}
      </div>
    </div>
  );
}

// ─── Starter prompts ─────────────────────────────────────────────────────────

const starters = ["What can you do?", "Tell me about Hinny", "What model are you?"];

// ─── Main card ───────────────────────────────────────────────────────────────

export function ChatCard() {
  const { messages, sendMessage, status, error } = useChat();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, []);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    sendMessage({ text: trimmed });
  }

  const visibleMessages = messages.filter((m) => m.role !== "system");

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-cyan-400/60" />
          <span className="text-xs font-medium text-white/60">
            <a
              href="https://huggingface.co/hinny/Qwen3.5-4B-GGUF-Q4_K_M"
              target="_blank"
              rel="noopener noreferrer"
            >
              Qwen3.5-4B-GGUF-Q4_K_M
            </a>
          </span>
          <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
            SELF-HOSTED
          </span>
        </div>
        <div className="group relative">
          <Info className="h-3.5 w-3.5 cursor-help text-white/30 transition-colors hover:text-white/50" />
          <div className="pointer-events-none absolute right-0 top-full z-50 w-64 rounded-lg border border-white/10 bg-black/90 p-3 pt-5 opacity-0 shadow-xl backdrop-blur-md transition-opacity before:absolute before:inset-x-0 before:-top-2 before:h-2 group-hover:pointer-events-auto group-hover:opacity-100">
            <ul className="space-y-1.5 text-[10px] leading-relaxed text-white/50">
              <li>
                A simple demo of self-hosted LLM inference, no complex architecture, just prompt
                engineering.
              </li>
              <li>
                Based on{" "}
                <a
                  href="https://huggingface.co/Qwen/Qwen3.5-4B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400/60 hover:text-cyan-400"
                >
                  Qwen/Qwen3.5-4B
                </a>
                , quantized to Q4_K_M (2.7 GB) to run on a laptop with llama.cpp.
              </li>
              <li>
                The model may occasionally be offline, hosting on a laptop means the fan gets loud!
              </li>
              <li>
                Try it yourself:{" "}
                <a
                  href="https://huggingface.co/hinny/Qwen3.5-4B-GGUF-Q4_K_M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400/60 hover:text-cyan-400"
                >
                  download the weights
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex h-48 flex-col gap-2 overflow-y-auto px-3 py-3 md:h-56">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Bot className="h-6 w-6 text-white/15" />
            <p className="text-[10px] text-white/30">Ask me anything</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage({ text: s })}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40 transition-colors hover:bg-white/5 hover:text-white/60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          visibleMessages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              parts={msg.parts}
              isStreaming={isBusy && i === visibleMessages.length - 1}
            />
          ))
        )}
      </div>

      {/* Error bar */}
      {error && (
        <div className="border-t border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] text-red-400/80">
          Could not reach the model. It may be offline.
        </div>
      )}

      {/* Input area */}
      <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          disabled={isBusy}
          className="flex-1 bg-transparent text-xs text-white/80 placeholder:text-white/25 focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isBusy || !input.trim()}
          className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/60 disabled:opacity-30"
        >
          {isBusy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-between border-t border-white/10 px-4 py-1.5 text-[10px] text-white/30">
        <span>Self-hosted via Tailscale Funnel</span>
        <span>
          <a
            href="https://huggingface.co/hinny/Qwen3.5-4B-GGUF-Q4_K_M"
            target="_blank"
            rel="noopener noreferrer"
          >
            Qwen3.5-4B-GGUF-Q4_K_M
          </a>
        </span>
      </div>
    </div>
  );
}
