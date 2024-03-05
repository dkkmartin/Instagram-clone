import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface themeStore {
  themeStore: string | null
  setThemeStore: (themeStore: any) => void
}

export const useThemeStore = create<themeStore>()(
  persist(
    (set) => ({
      themeStore: 'light',
      setThemeStore: (themeStore: any) => set({ themeStore }),
    }),
    {
      name: 'theme_storage',
    }
  )
)
