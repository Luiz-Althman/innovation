'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { ProductItem } from './product-item'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from './pagination'
import { ProductsFilters } from './product-filters'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { Button } from '@/components/ui/button'

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

  const produtos = data?.data || []
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  const favoritesSet = new Set(favorites)

  let filteredProducts = produtos

  if (filters.onlyFavorites) {
    filteredProducts = filteredProducts.filter((p) =>
      favoritesSet.has(p.codigo),
    )
  }

  if (filters.sortBy === 'preco') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.preco) - Number(b.preco),
    )
  } else if (filters.sortBy === 'nome') {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.nome.localeCompare(b.nome),
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="mb-4 text-red-500">Erro ao carregar produtos.</p>
        <Button variant="innovation" onClick={() => refetch()} className="btn">
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <ProductsFilters onFilterChange={setFilters} />

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
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
      ) : (
        <>
          <div className="my-5 grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
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
