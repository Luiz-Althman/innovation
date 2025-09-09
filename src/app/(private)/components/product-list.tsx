'use client'

import { useState, useEffect } from 'react'
import { ProductItem, Product } from './product-item'
import { useProducts } from '@/hooks/useProducts'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from './pagination'
import { ProductsFilters } from './product-filters'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

const PAGE_SIZE = 10

export function ProductList() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    onlyFavorites: false,
    sortBy: null as 'nome' | 'preco' | null,
  })
  const { favorites } = useFavoritesStore()
  const { data, isLoading, isError } = useProducts(1, 1000)
  const produtos = data?.data || []

  const filteredAndSorted = () => {
    let items: Product[] = [...produtos]

    if (filters.onlyFavorites) {
      items = items.filter((p) => favorites.includes(p.codigo))
    }

    if (filters.sortBy === 'preco') {
      items.sort((a, b) => Number(a.preco) - Number(b.preco))
    } else if (filters.sortBy === 'nome') {
      items.sort((a, b) => a.nome.localeCompare(b.nome))
    }

    return items
  }

  const finalProducts = filteredAndSorted()
  const totalPages = Math.ceil(finalProducts.length / PAGE_SIZE)
  const paginatedProducts = finalProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  if (isError) return <p>Erro ao carregar produtos.</p>

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
            {paginatedProducts.map((item) => (
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
