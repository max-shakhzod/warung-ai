import { create } from 'zustand';
import type {
  WarungProfile,
  MenuItem,
  ChatMessage,
  DailySales,
} from '../types';

interface WarungState {
  // --- Warung Profile ---
  warung: WarungProfile | null;
  isOnboarded: boolean;
  setWarung: (warung: WarungProfile) => void;
  updateMenu: (menu: MenuItem[]) => void;
  setLanguage: (lang: WarungProfile['language']) => void;

  // --- Sales ---
  dailySales: DailySales[];
  setDailySales: (sales: DailySales[]) => void;

  // --- Chat ---
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  addChatMessage: (message: ChatMessage) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  setChatLoading: (loading: boolean) => void;
  clearChat: () => void;

  // --- General ---
  resetStore: () => void;
}

const initialState = {
  warung: null,
  isOnboarded: false,
  dailySales: [],
  chatMessages: [],
  isChatLoading: false,
};

export const useWarungStore = create<WarungState>((set) => ({
  ...initialState,

  // --- Warung Profile ---
  setWarung: (warung) => set({ warung, isOnboarded: true }),
  updateMenu: (menu) =>
    set((state) => ({
      warung: state.warung ? { ...state.warung, menu } : null,
    })),
  setLanguage: (language) =>
    set((state) => ({
      warung: state.warung ? { ...state.warung, language } : null,
    })),

  // --- Sales ---
  setDailySales: (dailySales) => set({ dailySales }),

  // --- Chat ---
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setChatMessages: (chatMessages) => set({ chatMessages }),
  setChatLoading: (isChatLoading) => set({ isChatLoading }),
  clearChat: () => set({ chatMessages: [] }),

  // --- General ---
  resetStore: () => set(initialState),
}));
