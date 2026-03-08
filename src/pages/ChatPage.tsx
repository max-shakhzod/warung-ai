import { useState } from 'react'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'
import { useWarungStore } from '../store/useWarungStore'

export default function ChatPage() {
  const clearChat = useWarungStore((s) => s.clearChat)
  const chatMessages = useWarungStore((s) => s.chatMessages)
  const [pendingMessage, setPendingMessage] = useState<string | undefined>()

  const handleSuggestionClick = (text: string) => {
    setPendingMessage(text)
  }

  return (
    <div className="flex flex-col h-screen bg-[#FFF8F0]">
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">💬 AI Assistant</h1>
          <p className="text-sm text-gray-500">Ask me anything about running your warung!</p>
        </div>
        {chatMessages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-sm text-gray-400 hover:text-red-500 transition px-3 py-1 rounded-lg hover:bg-red-50"
          >
            🗑️ Clear Chat
          </button>
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow onSuggestionClick={handleSuggestionClick} />
      </div>

      {/* Chat Input */}
      <ChatInput
        externalMessage={pendingMessage}
        onExternalMessageConsumed={() => setPendingMessage(undefined)}
      />
    </div>
  )
}
