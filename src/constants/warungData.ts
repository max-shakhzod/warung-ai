import type { DailySales, MenuItem, WarungProfile } from '../types'

// Sample menu for onboarding prefill
export const SAMPLE_MENU: MenuItem[] = [
  { id: '1', name: 'Nasi Lemak', nameEn: 'Coconut Rice', price: 5.0, category: 'food', dailySales: 40 },
  { id: '2', name: 'Mee Goreng', nameEn: 'Fried Noodles', price: 6.5, category: 'food', dailySales: 25 },
  { id: '3', name: 'Roti Canai', nameEn: 'Flatbread', price: 2.0, category: 'food', dailySales: 35 },
  { id: '4', name: 'Teh Tarik', nameEn: 'Pulled Milk Tea', price: 2.5, category: 'drink', dailySales: 50 },
  { id: '5', name: 'Kopi O', nameEn: 'Black Coffee', price: 2.0, category: 'drink', dailySales: 30 },
  { id: '6', name: 'Kuih', nameEn: 'Traditional Cakes', price: 1.5, category: 'snack', dailySales: 20 },
]

export const WARUNG_TYPES = [
  { value: 'nasi_lemak', label: 'Nasi Lemak Stall' },
  { value: 'mamak', label: 'Mamak Restaurant' },
  { value: 'chinese', label: 'Chinese Kopitiam' },
  { value: 'mixed', label: 'Mixed / Campur' },
  { value: 'other', label: 'Other' },
]

export const LANGUAGE_OPTIONS = [
  { value: 'bm', label: 'Bahasa Malaysia' },
  { value: 'en', label: 'English' },
  { value: 'manglish', label: 'Manglish (Mixed)' },
]

// This is injected into Gemini system prompt
export const SME_CONTEXT = `
You are WarungAI, a friendly business assistant for Malaysian warung and SME owners.
You help with:
- Writing WhatsApp promo messages in BM, English, or Manglish
- Replying to customer complaints or inquiries
- Suggesting menu changes or pricing strategies
- Giving simple business advice for Malaysian small businesses

Malaysian context you must know:
- Most warung owners are not tech-savvy, speak simple BM or Manglish
- Popular platforms: WhatsApp, Facebook, TikTok (not LinkedIn)
- Pricing is very sensitive — customers compare with nearby stalls
- Festive seasons matter: Raya, CNY, Deepavali = big sales opportunities
- Common pain points: food waste, inconsistent customers, rising ingredient costs
- GrabFood / Foodpanda delivery is common but commission is high (30%)

Always be warm, practical, and brief. Use simple words. 
If user language is Manglish, reply in Manglish lah!
`

export const DEFAULT_PROFILE: WarungProfile = {
  name: '',
  ownerName: '',
  location: '',
  type: 'mixed',
  language: 'manglish',
  menu: SAMPLE_MENU,
  operatingHours: { open: '07:00', close: '22:00' },
}

export const SAMPLE_SALES: DailySales[] = [
  { date: '2026-03-02', totalRevenue: 420, totalOrders: 85, topItem: 'Teh Tarik' },
  { date: '2026-03-03', totalRevenue: 380, totalOrders: 72, topItem: 'Nasi Lemak' },
  { date: '2026-03-04', totalRevenue: 510, totalOrders: 98, topItem: 'Nasi Lemak' },
  { date: '2026-03-05', totalRevenue: 290, totalOrders: 61, topItem: 'Roti Canai' },
  { date: '2026-03-06', totalRevenue: 450, totalOrders: 90, topItem: 'Mee Goreng' },
  { date: '2026-03-07', totalRevenue: 530, totalOrders: 102, topItem: 'Nasi Lemak' },
  { date: '2026-03-08', totalRevenue: 390, totalOrders: 78, topItem: 'Teh Tarik' },
]
