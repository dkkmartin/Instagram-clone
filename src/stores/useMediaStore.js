import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useData = create(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: 'data_storage', // unique name
    }
  )
)
