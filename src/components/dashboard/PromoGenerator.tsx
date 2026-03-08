import { useState } from 'react'
import { useWarungStore } from '../../store/useWarungStore'
import { generatePromoContent } from '../../services/gemini'

export default function PromoGenerator() {
  const warung = useWarungStore((s) => s.warung)
  const [platform, setPlatform] = useState('whatsapp')
  const [promoText, setPromoText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const platforms = [
    { value: 'whatsapp', label: '📱 WhatsApp' },
    { value: 'facebook', label: '📘 Facebook' },
    { value: 'instagram', label: '📸 Instagram' },
  ]

  const handleGenerate = async () => {
    if (!warung) return
    setLoading(true)
    setError('')

    try {
      const result = await generatePromoContent(warung, platform)
      setPromoText(result)
    } catch {
      setError('Failed to generate promo. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(promoText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!warung) {
    return (
      <div className="bg-orange-50 rounded-2xl p-6 text-center text-gray-500">
        <p className="text-4xl mb-3">📱</p>
        <p>Complete onboarding to generate promotional content.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Platform selector */}
      <div className="flex gap-2 mb-4">
        {platforms.map((p) => (
          <button
            key={p.value}
            onClick={() => setPlatform(p.value)}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition border-2 ${
              platform === p.value
                ? 'border-[#E8500A] bg-orange-50 text-[#E8500A]'
                : 'border-gray-200 text-gray-500 hover:border-orange-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

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
          '🚀 Generate Promo'
        )}
      </button>

      {error && (
        <p className="mt-4 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>
      )}

      {promoText && (
        <div className="mt-4 bg-orange-50 rounded-2xl p-5">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed mb-3">
            {promoText}
          </pre>
          <button
            onClick={handleCopy}
            className="w-full border-2 border-[#E8500A] text-[#E8500A] py-2 rounded-xl font-semibold hover:bg-orange-100 transition"
          >
            {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  )
}
