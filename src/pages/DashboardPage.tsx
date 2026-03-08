import { useEffect } from 'react'
import { useWarungStore } from '../store/useWarungStore'
import { SAMPLE_SALES } from '../constants/warungData'
import SalesCard from '../components/dashboard/SalesCard'
import MenuSuggestion from '../components/dashboard/MenuSuggestion'
import PromoGenerator from '../components/dashboard/PromoGenerator'
import CustomerReply from '../components/dashboard/CustomerReply'

export default function DashboardPage() {
  const warung = useWarungStore((s) => s.warung)
  const dailySales = useWarungStore((s) => s.dailySales)
  const setDailySales = useWarungStore((s) => s.setDailySales)

  // Load sample sales data if none exists
  useEffect(() => {
    if (dailySales.length === 0) {
      setDailySales(SAMPLE_SALES)
    }
  }, [dailySales.length, setDailySales])

  const totalRevenue = dailySales.reduce((sum, d) => sum + d.totalRevenue, 0)
  const totalOrders = dailySales.reduce((sum, d) => sum + d.totalOrders, 0)
  const topItem = dailySales.length > 0 ? dailySales[dailySales.length - 1].topItem : '—'

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white px-6 py-8 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-[#1A1A2E]">📊 Dashboard</h1>
          {warung && (
            <p className="text-gray-500 mt-1">
              Welcome back, <span className="font-semibold text-[#E8500A]">{warung.name}</span>
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Sales Cards */}
        <section>
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">📈 Sales Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SalesCard title="Total Revenue" value={totalRevenue} type="currency" icon="💰" />
            <SalesCard title="Total Orders" value={totalOrders} type="number" icon="🧾" />
            <SalesCard title="Menu Items" value={warung?.menu.length ?? 0} type="number" icon="🍽️" />
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
              <span className="text-3xl mb-2">⭐</span>
              <p className="text-sm text-gray-500 font-medium">Today's Top Item</p>
              <p className="text-xl font-extrabold text-[#E8500A] mt-1">{topItem}</p>
            </div>
          </div>
        </section>

        {/* Daily Sales Table */}
        {dailySales.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">📅 Daily Breakdown</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 text-left">
                    <th className="px-5 py-3 font-semibold text-gray-600">Date</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Revenue</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Orders</th>
                    <th className="px-5 py-3 font-semibold text-gray-600">Top Item</th>
                  </tr>
                </thead>
                <tbody>
                  {dailySales.map((day) => (
                    <tr key={day.date} className="border-t border-gray-100 hover:bg-orange-50/50 transition">
                      <td className="px-5 py-3 text-gray-700">{day.date}</td>
                      <td className="px-5 py-3 font-semibold text-[#1A1A2E]">RM {day.totalRevenue.toFixed(2)}</td>
                      <td className="px-5 py-3 text-gray-600">{day.totalOrders}</td>
                      <td className="px-5 py-3">
                        <span className="bg-orange-100 text-[#E8500A] text-xs font-semibold px-2 py-1 rounded-full">
                          {day.topItem}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* AI Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">🤖 AI Menu Suggestions</h2>
            <MenuSuggestion />
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">📱 Promo Generator</h2>
            <PromoGenerator />
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">💬 Customer Reply</h2>
            <CustomerReply />
          </section>
        </div>
      </div>
    </div>
  )
}
