'use client'

import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { useEffect, useState } from 'react'

type SortOption = 'nome' | 'preco' | null

export function ProductsFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    onlyFavorites: boolean
    sortBy: SortOption
  }) => void
}) {
  const { favorites } = useFavoritesStore()
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>(null)

  useEffect(() => {
    const saved = localStorage.getItem('productsFilters')
    if (saved) {
      const parsed = JSON.parse(saved) as {
        onlyFavorites: boolean
        sortBy: SortOption
      }
      setOnlyFavorites(parsed.onlyFavorites)
      setSortBy(parsed.sortBy)
      onFilterChange(parsed)
    }
  }, [onFilterChange])

  function toggleFavorites() {
    const newValue = !onlyFavorites
    setOnlyFavorites(newValue)
    const updated = { onlyFavorites: newValue, sortBy }
    localStorage.setItem('productsFilters', JSON.stringify(updated))
    onFilterChange(updated)
  }

  function toggleSort(option: SortOption) {
    const newValue = sortBy === option ? null : option
    setSortBy(newValue)
    const updated = { onlyFavorites, sortBy: newValue }
    localStorage.setItem('productsFilters', JSON.stringify(updated))
    onFilterChange(updated)
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Button
        variant={onlyFavorites ? 'default' : 'outline'}
        onClick={toggleFavorites}
        disabled={favorites.length === 0}
      >
        Favoritos
      </Button>

      <Button
        variant={sortBy === 'nome' ? 'default' : 'outline'}
        onClick={() => toggleSort('nome')}
      >
        Ordenar por Nome
      </Button>

      <Button
        variant={sortBy === 'preco' ? 'default' : 'outline'}
        onClick={() => toggleSort('preco')}
      >
        Ordenar por Preço
      </Button>
    </div>
  )
}
