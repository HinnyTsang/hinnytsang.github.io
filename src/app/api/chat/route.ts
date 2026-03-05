import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import {
  CHAT_MODEL,
  MAX_COMPLETION_TOKENS,
  SYSTEM_PROMPT,
} from "@/app/[locale]/_components/visuals/hooks/chat-config";
import {
  streamLlamaResponse,
  toOpenAIMessages,
} from "@/app/[locale]/_components/visuals/hooks/use-llama-stream";

export const runtime = "edge";

const API_URL = `${process.env.LLAMA_BASE_URL}/v1/chat/completions`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const chatMessages = toOpenAIMessages(messages, SYSTEM_PROMPT);

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: async ({ writer }) => {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: CHAT_MODEL,
            messages: chatMessages,
            max_completion_tokens: MAX_COMPLETION_TOKENS,
            stream: true,
          }),
        });

        if (!res.ok || !res.body) {
          writer.write({ type: "error", errorText: "Could not reach the model." });
          return;
        }

        await streamLlamaResponse(writer, res.body);
      },
    }),
  });
}
