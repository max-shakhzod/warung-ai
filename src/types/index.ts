export interface MenuItem {
  id: string
  name: string
  nameEn: string
  price: number
  category: 'food' | 'drink' | 'snack'
  dailySales: number
}

export interface WarungProfile {
  name: string
  ownerName: string
  location: string
  type: 'nasi_lemak' | 'mamak' | 'chinese' | 'mixed' | 'other'
  language: 'bm' | 'en' | 'manglish'
  menu: MenuItem[]
  operatingHours: {
    open: string   // "07:00"
    close: string  // "22:00"
  }
}

export interface ChatMessage {
  id: string
  role: 'user' | 'model'
  content: string
  timestamp: Date
}

export interface DailySales {
  date: string       // "2026-03-08"
  totalRevenue: number
  totalOrders: number
  topItem: string
}

export type AIMode =
  | 'general'        // General Q&A
  | 'promo'          // Generate promo posts
  | 'reply'          // Auto-reply customer messages
  | 'suggest'        // Menu/pricing suggestions
