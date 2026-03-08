import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  // Don't show navbar on landing page (it has its own nav)
  if (location.pathname === '/') return null

  const navLinks = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/chat', label: '💬 Chat' },
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">🍛</span>
        <span className="text-xl font-bold text-[#E8500A]">WarungAI</span>
      </Link>
      <div className="flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-full text-sm font-semibold no-underline transition ${
              location.pathname === link.path
                ? 'bg-[#E8500A] text-white'
                : 'text-gray-600 hover:bg-orange-50 hover:text-[#E8500A]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
