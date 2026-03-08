import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWarungStore } from '../store/useWarungStore'
import { SAMPLE_MENU, WARUNG_TYPES, LANGUAGE_OPTIONS } from '../constants/warungData'
import type { WarungProfile, MenuItem } from '../types'

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setWarung } = useWarungStore()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<WarungProfile>({
    name: '',
    ownerName: '',
    location: '',
    type: 'mixed',
    language: 'manglish',
    menu: SAMPLE_MENU,
    operatingHours: { open: '07:00', close: '22:00' },
  })

  const update = (fields: Partial<WarungProfile>) =>
    setForm((prev) => ({ ...prev, ...fields }))

  const handleFinish = () => {
    setWarung(form)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-3xl">🍛</span>
        <span className="text-2xl font-bold text-[#E8500A]">WarungAI</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% done</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#E8500A] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8">

        {/* STEP 1 — Basic Info */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Warung Details 🏪</h2>
            <p className="text-gray-500 text-sm mb-6">Tell us about your warung</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Warung Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Warung Pak Cik Ahmad"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmad bin Ali"
                  value={form.ownerName}
                  onChange={(e) => update({ ownerName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Petaling Jaya, Selangor"
                  value={form.location}
                  onChange={(e) => update({ location: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Type of Warung
                </label>
                <select
                  value={form.type}
                  onChange={(e) => update({ type: e.target.value as WarungProfile['type'] })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                >
                  {WARUNG_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Menu */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Your Menu 🍽️</h2>
            <p className="text-gray-500 text-sm mb-6">Edit or keep the sample menu below</p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {form.menu.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...form.menu]
                      updated[index] = { ...updated[index], name: e.target.value }
                      update({ menu: updated })
                    }}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                    placeholder="Item name"
                  />
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-1">
                    <span className="text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        const updated = [...form.menu]
                        updated[index] = { ...updated[index], price: parseFloat(e.target.value) || 0 }
                        update({ menu: updated })
                      }}
                      className="w-14 text-sm focus:outline-none"
                      step="0.50"
                      min="0"
                    />
                  </div>
                  <button
                    onClick={() => update({ menu: form.menu.filter((_, i) => i !== index) })}
                    className="text-red-400 hover:text-red-600 text-lg font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const newItem: MenuItem = {
                  id: Date.now().toString(),
                  name: '',
                  nameEn: '',
                  price: 0,
                  category: 'food',
                  dailySales: 0,
                }
                update({ menu: [...form.menu, newItem] })
              }}
              className="mt-4 w-full border-2 border-dashed border-[#E8500A] text-[#E8500A] rounded-xl py-2 text-sm font-semibold hover:bg-orange-50 transition"
            >
              + Add Menu Item
            </button>
          </div>
        )}

        {/* STEP 3 — Operating Hours */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Operating Hours ⏰</h2>
            <p className="text-gray-500 text-sm mb-6">When does your warung open and close?</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={form.operatingHours.open}
                  onChange={(e) =>
                    update({ operatingHours: { ...form.operatingHours, open: e.target.value } })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={form.operatingHours.close}
                  onChange={(e) =>
                    update({ operatingHours: { ...form.operatingHours, close: e.target.value } })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]"
                />
              </div>
            </div>

            {/* Visual preview */}
            <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-500">Your warung is open</p>
              <p className="text-2xl font-bold text-[#E8500A] mt-1">
                {form.operatingHours.open} – {form.operatingHours.close}
              </p>
            </div>
          </div>
        )}

        {/* STEP 4 — Language */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">AI Language 🗣️</h2>
            <p className="text-gray-500 text-sm mb-6">
              How should WarungAI talk to you?
            </p>

            <div className="space-y-3">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => update({ language: lang.value as WarungProfile['language'] })}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition text-left ${
                    form.language === lang.value
                      ? 'border-[#E8500A] bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="text-2xl">
                    {lang.value === 'bm' ? '🇲🇾' : lang.value === 'en' ? '🇬🇧' : '😄'}
                  </span>
                  <div>
                    <p className="font-semibold text-[#1A1A2E]">{lang.label}</p>
                    <p className="text-xs text-gray-400">
                      {lang.value === 'bm'
                        ? 'AI akan balas dalam Bahasa Malaysia'
                        : lang.value === 'en'
                        ? 'AI will reply in English'
                        : 'AI will reply in Manglish lah!'}
                    </p>
                  </div>
                  {form.language === lang.value && (
                    <span className="ml-auto text-[#E8500A] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-sm text-gray-600 space-y-1">
              <p>🏪 <strong>{form.name || 'Your Warung'}</strong></p>
              <p>👤 {form.ownerName || 'Owner'}</p>
              <p>📍 {form.location || 'Malaysia'}</p>
              <p>🍽️ {form.menu.length} menu items</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-400 transition"
            >
              ← Back
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && (!form.name || !form.ownerName)}
              className="flex-1 bg-[#E8500A] text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex-1 bg-[#E8500A] text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              🚀 Let's Go!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
