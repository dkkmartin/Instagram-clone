import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useData = create(
  persist(
    (set) => ({
      data: null,
      setData: (data: any) => set({ data }),
    }),
    {
      name: 'data_storage', // unique name
    }
  )
)
