
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));


export const  usechatWindow = create((set)=>({
  chatWindow: null,

  setChatWindow: (chat) => set({ chat }),

  clearChatWindow: () => set({ chat: null }),
}))
