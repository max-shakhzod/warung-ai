import { useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  // Don't show footer on landing page (it has its own) or chat page
  if (location.pathname === '/' || location.pathname === '/chat') return null

  return (
    <footer className="bg-[#1A1A2E] text-gray-400 text-center py-6 text-sm">
      <p>🍛 <strong className="text-white">WarungAI</strong> — Empowering Malaysian SMEs with AI</p>
      <p className="mt-1">Powered by Google Gemini · GDGKL x GDG Cloud KL 2026</p>
    </footer>
  )
}
