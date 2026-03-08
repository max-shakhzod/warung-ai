import { useState } from 'react'
import { useWarungStore } from '../../store/useWarungStore'
import { generateMenuSuggestions } from '../../services/gemini'

export default function MenuSuggestion() {
  const warung = useWarungStore((s) => s.warung)
  const [suggestions, setSuggestions] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!warung) return
    setLoading(true)
    setError('')

    try {
      const result = await generateMenuSuggestions(warung)
      setSuggestions(result)
    } catch {
      setError('Failed to generate suggestions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!warung) {
    return (
      <div className="bg-orange-50 rounded-2xl p-6 text-center text-gray-500">
        <p className="text-4xl mb-3">🤖</p>
        <p>Complete onboarding to get AI menu suggestions.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#E8500A] text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          '✨ Get AI Suggestions'
        )}
      </button>

      {error && (
        <p className="mt-4 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>
      )}

      {suggestions && (
        <div className="mt-4 bg-orange-50 rounded-2xl p-5">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
            {suggestions}
          </pre>
        </div>
      )}
    </div>
  )
}
