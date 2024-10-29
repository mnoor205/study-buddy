import { RAGChat, upstash, openai } from "@upstash/rag-chat";
import { redis } from "./redis";

// export const ragChat = new RAGChat({
//   model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
//   redis: redis,
// });

export const ragChat = new RAGChat({
  model: openai("gpt-4o"),
  redis: redis,
});