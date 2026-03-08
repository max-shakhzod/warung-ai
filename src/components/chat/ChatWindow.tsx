import { useEffect, useRef } from 'react'
import { useWarungStore } from '../../store/useWarungStore'
import ChatBubble from './ChatBubble'

const SUGGESTIONS = [
  'How can I improve my nasi lemak sales?',
  'What price should I charge for laksa?',
  'Help me create a WhatsApp promo',
  'Macam mana nak kurangkan food waste?',
]

interface ChatWindowProps {
  onSuggestionClick?: (text: string) => void
}

export default function ChatWindow({ onSuggestionClick }: ChatWindowProps) {
  const chatMessages = useWarungStore((s) => s.chatMessages)
  const isChatLoading = useWarungStore((s) => s.isChatLoading)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  return (
    <div className="h-full overflow-y-auto px-4 py-6">
      {chatMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <p className="text-6xl mb-4">🍛</p>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">
            Selamat datang!
          </h2>
          <p className="text-gray-500 mb-6 max-w-sm">
            Ask me anything about your warung business. I can help with menu planning, pricing, promos, and more!
          </p>
          <div className="space-y-2 w-full max-w-sm">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSuggestionClick?.(q)}
                className="w-full text-left bg-white rounded-xl px-4 py-3 text-sm text-gray-600 shadow-sm hover:shadow-md hover:border-[#E8500A] transition cursor-pointer border border-gray-100"
              >
                💡 &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>
      )}

      {isChatLoading && (
        <div className="flex items-center gap-1.5 max-w-2xl mx-auto mt-4 px-4">
          <span className="w-2.5 h-2.5 bg-[#E8500A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-2.5 bg-[#E8500A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-2.5 bg-[#E8500A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
