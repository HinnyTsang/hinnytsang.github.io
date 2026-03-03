import type { UIMessageStreamWriter } from "ai";

// ─── Types ───────────────────────────────────────────────────────────────────

type UIMessage = { role: string; parts: Array<{ type: string; text?: string }> };

type ChatMessage = { role: string; content: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert UI messages (parts format) to OpenAI chat messages */
export function toOpenAIMessages(uiMessages: UIMessage[], systemPrompt: string): ChatMessage[] {
  return [
    { role: "system", content: systemPrompt },
    ...uiMessages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role,
        content: m.parts
          .filter((p) => p.type === "text")
          .map((p) => p.text ?? "")
          .join(""),
      })),
  ];
}

// ─── SSE stream parser ───────────────────────────────────────────────────────

/**
 * Streams an SSE response from a llama.cpp-compatible endpoint,
 * parsing reasoning_content and content deltas into UI message chunks.
 */
export async function streamLlamaResponse(writer: UIMessageStreamWriter, body: ReadableStream) {
  const reader = body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  const reasoningId = "r0";
  const textId = "t0";
  let inReasoning = false;
  let inText = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") {
        if (inReasoning) writer.write({ type: "reasoning-end", id: reasoningId });
        if (inText) writer.write({ type: "text-end", id: textId });
        return;
      }

      try {
        const parsed = JSON.parse(payload);
        const delta = parsed.choices?.[0]?.delta;
        if (!delta) continue;

        if (delta.reasoning_content) {
          if (!inReasoning) {
            writer.write({ type: "reasoning-start", id: reasoningId });
            inReasoning = true;
          }
          writer.write({
            type: "reasoning-delta",
            id: reasoningId,
            delta: delta.reasoning_content,
          });
        }

        if (delta.content) {
          if (inReasoning) {
            writer.write({ type: "reasoning-end", id: reasoningId });
            inReasoning = false;
          }
          if (!inText) {
            writer.write({ type: "text-start", id: textId });
            inText = true;
          }
          writer.write({ type: "text-delta", id: textId, delta: delta.content });
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  if (inReasoning) writer.write({ type: "reasoning-end", id: reasoningId });
  if (inText) writer.write({ type: "text-end", id: textId });
}
