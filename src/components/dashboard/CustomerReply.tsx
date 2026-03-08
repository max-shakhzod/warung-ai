import { useState } from 'react'
import { useWarungStore } from '../../store/useWarungStore'
import { generateCustomerReply } from '../../services/gemini'

export default function CustomerReply() {
  const warung = useWarungStore((s) => s.warung)
  const [customerMessage, setCustomerMessage] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!warung || !customerMessage.trim()) return
    setLoading(true)
    setError('')

    try {
      const result = await generateCustomerReply(warung, customerMessage.trim())
      setReply(result)
    } catch {
      setError('Failed to generate reply. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(reply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!warung) {
    return (
      <div className="bg-orange-50 rounded-2xl p-6 text-center text-gray-500">
        <p className="text-4xl mb-3">💬</p>
        <p>Complete onboarding to use customer reply AI.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-500 mb-3">
        Paste a customer message below and AI will draft a polite reply for you.
      </p>

      <textarea
        placeholder="e.g. Kenapa nasi lemak hari ini tak sedap? Sambal kurang pedas..."
        value={customerMessage}
        onChange={(e) => setCustomerMessage(e.target.value)}
        rows={3}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A] focus:border-transparent resize-none mb-4"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !customerMessage.trim()}
        className="w-full bg-[#E8500A] text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Drafting reply...
          </span>
        ) : (
          '💬 Draft Reply'
        )}
      </button>

      {error && (
        <p className="mt-4 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>
      )}

      {reply && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-xs text-green-600 font-semibold mb-2">✅ Suggested Reply:</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed mb-3">
            {reply}
          </pre>
          <button
            onClick={handleCopy}
            className="w-full border-2 border-green-500 text-green-600 py-2 rounded-xl font-semibold hover:bg-green-100 transition"
          >
            {copied ? '✅ Copied!' : '📋 Copy Reply'}
          </button>
        </div>
      )}
    </div>
  )
}
