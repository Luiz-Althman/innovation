'use client'

import { useState, useMemo, useCallback } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from './pagination'
import { ProductsFilters } from './product-filters'
import { useProducts } from '@/hooks/useProducts'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { ProductItem } from './product-item'

const PAGE_SIZE = 10

interface ProductListProps {
  searchNome?: string
  searchCodigo?: string
}

export function ProductList({ searchNome, searchCodigo }: ProductListProps) {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    onlyFavorites: false,
    sortBy: null as 'nome' | 'preco' | null,
  })

  const { favorites } = useFavoritesStore()

  const { data, isLoading, isError, refetch } = useProducts(
    page,
    PAGE_SIZE,
    searchNome,
    searchCodigo,
  )

  const totalPages = useMemo(() => {
    if (!data) return 1
    return Math.ceil(data.total / PAGE_SIZE)
  }, [data])

  const filteredProducts = useMemo(() => {
    if (!data) return []

    let items = data.data

    if (filters.onlyFavorites) {
      items = items.filter((p) => favorites.includes(p.codigo))
    }

    if (filters.sortBy === 'nome') {
      items = [...items].sort((a, b) => a.nome.localeCompare(b.nome))
    } else if (filters.sortBy === 'preco') {
      items = [...items].sort((a, b) => Number(a.preco) - Number(b.preco))
    }

    if (searchNome) {
      items = items.filter((p) =>
        p.nome.toLowerCase().includes(searchNome.toLowerCase()),
      )
    }
    if (searchCodigo) {
      items = items.filter((p) =>
        p.codigo.toLowerCase().includes(searchCodigo.toLowerCase()),
      )
    }

    return items
  }, [data, filters, favorites, searchNome, searchCodigo])

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Erro ao carregar produtos.</p>
        <button onClick={() => refetch()} className="btn">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <ProductsFilters onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex w-full flex-col items-center">
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="mb-4 h-4 w-20" />
              <Skeleton className="mb-4 h-[250px] w-[250px]" />
              <Skeleton className="mb-2 h-4 w-40" />
              <div className="mb-2 flex w-1/2 flex-wrap gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6 rounded-full" />
                ))}
              </div>
              <Skeleton className="mb-2 h-6 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="mt-8 text-center text-lg">Nenhum produto encontrado.</p>
      ) : (
        <>
          <div className="my-5 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            {filteredProducts.map((item) => (
              <ProductItem key={item.codigo} product={item} />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
