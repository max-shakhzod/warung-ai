import { useState, useEffect } from 'react'
import { useWarungStore } from '../../store/useWarungStore'
import { sendChatMessage } from '../../services/gemini'
import type { ChatMessage } from '../../types'

interface ChatInputProps {
  externalMessage?: string
  onExternalMessageConsumed?: () => void
}

export default function ChatInput({ externalMessage, onExternalMessageConsumed }: ChatInputProps) {
  const [input, setInput] = useState('')

  const warung = useWarungStore((s) => s.warung)
  const chatMessages = useWarungStore((s) => s.chatMessages)
  const addChatMessage = useWarungStore((s) => s.addChatMessage)
  const setChatLoading = useWarungStore((s) => s.setChatLoading)
  const isChatLoading = useWarungStore((s) => s.isChatLoading)

  const doSend = async (text: string) => {
    if (!text.trim() || isChatLoading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    addChatMessage(userMessage)
    setInput('')
    setChatLoading(true)

    try {
      const response = await sendChatMessage(text.trim(), chatMessages, warung)

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'model',
        content: response,
        timestamp: new Date(),
      }

      addChatMessage(assistantMessage)
    } catch {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'model',
        content: 'Maaf, something went wrong. Please try again.',
        timestamp: new Date(),
      }
      addChatMessage(errorMessage)
    } finally {
      setChatLoading(false)
    }
  }

  // Handle external message (from suggestion click)
  useEffect(() => {
    if (externalMessage && !isChatLoading) {
      doSend(externalMessage)
      onExternalMessageConsumed?.()
    }
  }, [externalMessage])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      doSend(input)
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-end gap-3">
        <textarea
          placeholder="Tanya apa sahaja... / Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isChatLoading}
          className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={() => doSend(input)}
          disabled={!input.trim() || isChatLoading}
          className="bg-[#E8500A] text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {isChatLoading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  )
}
