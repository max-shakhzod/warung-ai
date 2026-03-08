import { formatCompactCurrency } from '../../utils/formatCurrency'

interface SalesCardProps {
  title: string
  value: number
  type: 'currency' | 'number'
  icon?: string
}

export default function SalesCard({ title, value, type, icon }: SalesCardProps) {
  const displayValue =
    type === 'currency' ? formatCompactCurrency(value) : value.toLocaleString()

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
      {icon && <span className="text-3xl mb-2">{icon}</span>}
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-extrabold text-[#1A1A2E] mt-1">{displayValue}</p>
    </div>
  )
}
