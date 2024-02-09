import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MediaStore {
  data: [] | null
  setData: (data: any) => void
}

export const useData = create<MediaStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data: any) => set({ data }),
    }),
    {
      name: 'data_storage',
    }
  )
)
