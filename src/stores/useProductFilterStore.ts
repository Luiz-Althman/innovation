import { create } from 'zustand'

interface ProductFilterState {
  search: string
  setSearch: (value: string) => void
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
}))
