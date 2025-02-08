import { useState } from 'react'

interface ChatInterfaceProps {
  initialMessage: string;
  onSendMessage: (message: string) => void;
}

export default function ChatInterface({ initialMessage, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Message Display Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="text-gray-800">{initialMessage}</p>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
} 