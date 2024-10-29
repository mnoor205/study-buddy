import { cookies } from "next/headers";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { ChatUI } from "@/components/chatui";


export default async function Home() {
  const sessionCookie = (await cookies()).get("sessionId")?.value

  const url = "https://en.wikipedia.org/wiki/Tony_Stark_(Marvel_Cinematic_Universe)"

  const sessionId = (url + "--" + sessionCookie).replace(/\//g, "")

  const isAlreadyIndexed = await redis.sismember("indexed-url", url)

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId})

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: url,
      config: { chunkOverlap: 50, chunkSize: 200 }
    })

    redis.sadd("indexed-url", url)
  }

  return <ChatUI sessionId={sessionId} initialMessages={initialMessages} />
}
