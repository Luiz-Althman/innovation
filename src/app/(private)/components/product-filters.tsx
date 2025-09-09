'use client'

import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { useEffect, useState } from 'react'

type SortOption = 'nome' | 'preco' | null

interface ProductsFiltersProps {
  onFilterChange: (filters: {
    onlyFavorites: boolean
    sortBy: SortOption
  }) => void
}

export function ProductsFilters({ onFilterChange }: ProductsFiltersProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function updateFilters(newFilters: {
    onlyFavorites: boolean
    sortBy: SortOption
  }) {
    setOnlyFavorites(newFilters.onlyFavorites)
    setSortBy(newFilters.sortBy)
    localStorage.setItem('productsFilters', JSON.stringify(newFilters))
    onFilterChange(newFilters)
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Button
        variant={onlyFavorites ? 'default' : 'outline'}
        onClick={() => updateFilters({ onlyFavorites: !onlyFavorites, sortBy })}
        disabled={favorites.length === 0}
      >
        Favoritos
      </Button>

      <Button
        variant={sortBy === 'nome' ? 'default' : 'outline'}
        onClick={() =>
          updateFilters({
            onlyFavorites,
            sortBy: sortBy === 'nome' ? null : 'nome',
          })
        }
      >
        Ordenar por Nome
      </Button>

      <Button
        variant={sortBy === 'preco' ? 'default' : 'outline'}
        onClick={() =>
          updateFilters({
            onlyFavorites,
            sortBy: sortBy === 'preco' ? null : 'preco',
          })
        }
      >
        Ordenar por Preço
      </Button>
    </div>
  )
}
