'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: string[]
  toggleFavorite: (codigo: string) => void
  isFavorite: (codigo: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (codigo) => {
        const { favorites } = get()
        if (favorites.includes(codigo)) {
          set({ favorites: favorites.filter((f) => f !== codigo) })
        } else {
          set({ favorites: [...favorites, codigo] })
        }
      },
      isFavorite: (codigo) => get().favorites.includes(codigo),
    }),
    { name: 'favorites-storage' },
  ),
)
