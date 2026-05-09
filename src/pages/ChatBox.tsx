import { useState } from "react"
import { useResumeStore } from "@/store/resumeStore"

export default function ChatBox() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const selectedResume = useResumeStore((s) => s.selected)

  const handleSend = () => {
    if (!input) return

    setMessages((prev) => [...prev, { role: "user", text: input }])

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: `Answer based on ${selectedResume || "no resume"}` },
    ])

    setInput("")
  }

  return (
    <div className="p-4 border rounded mt-4">
      <h2 className="font-bold mb-2">AI Chatbot</h2>

      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        className="border w-full p-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        Send
      </button>
    </div>
  )
}
