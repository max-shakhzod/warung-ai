import { useNavigate } from 'react-router-dom'
import { useWarungStore } from '../store/useWarungStore'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isOnboarded } = useWarungStore()

  const handleStart = () => {
    navigate(isOnboarded ? '/dashboard' : '/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍛</span>
          <span className="text-xl font-bold text-[#E8500A]">WarungAI</span>
        </div>
        <button
          onClick={handleStart}
          className="bg-[#E8500A] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition"
        >
          {isOnboarded ? 'Go to Dashboard' : 'Get Started'}
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="inline-block bg-orange-100 text-[#E8500A] text-sm font-semibold px-4 py-1 rounded-full mb-6">
          🏆 Built for GDGKL x GDG Cloud KL Hackathon
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A1A2E] leading-tight max-w-3xl">
          Your Warung's
          <span className="text-[#E8500A]"> AI Business </span>
          Assistant
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Powered by Google Gemini. Speaks BM, English, and Manglish.
          Helps warung owners write promos, reply customers, and grow their business — for free.
        </p>

        <button
          onClick={handleStart}
          className="mt-10 bg-[#E8500A] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition shadow-lg"
        >
          {isOnboarded ? '👋 Welcome Back' : 'Cuba Sekarang — Free! 🚀'}
        </button>

        <p className="mt-3 text-sm text-gray-400">
          No sign up needed. Setup in 2 minutes.
        </p>
      </main>

      {/* Features */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-center text-2xl font-bold text-[#1A1A2E] mb-10">
          Apa WarungAI boleh buat untuk you?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-[#FFF8F0] rounded-2xl p-6 text-center hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-[#1A1A2E] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-[#E8500A]">{s.value}</div>
              <div className="text-gray-500 mt-1 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#E8500A] py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Dah ready nak start? Jom cuba sekarang! 🎉
        </h2>
        <button
          onClick={handleStart}
          className="bg-white text-[#E8500A] px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition"
        >
          {isOnboarded ? 'Back to Dashboard' : 'Setup Your Warung — Free'}
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-400 text-center py-6 text-sm">
        <p>🍛 WarungAI — Built with ❤️ for Malaysian warung owners</p>
        <p className="mt-1">Powered by Google Gemini · GDGKL x GDG Cloud KL 2026</p>
      </footer>

    </div>
  )
}

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Chat Assistant',
    desc: 'Tanya apa-apa pasal bisnes warung you. AI akan jawab dalam BM, English, atau Manglish.',
  },
  {
    icon: '📢',
    title: 'Promo Generator',
    desc: 'Generate WhatsApp & Facebook promo posts dalam masa 5 saat. Copy paste je!',
  },
  {
    icon: '💬',
    title: 'Customer Reply',
    desc: 'Customer complaint? Paste the message, AI drafts a polite reply for you.',
  },
  {
    icon: '📊',
    title: 'Sales Dashboard',
    desc: 'Tengok mana item paling laku dan berapa revenue you buat setiap hari.',
  },
]

const STATS = [
  { value: '1.2M+', label: 'Warung & SMEs in Malaysia' },
  { value: '80%', label: 'Have zero digital tools' },
  { value: '< 2 min', label: 'Setup time' },
]
