'use client'

import { useState, useEffect } from 'react'
import { ProductItem } from './product-item'
import { useProducts } from '@/hooks/useProducts'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from './pagination'

const PAGE_SIZE = 10

export function ProductList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useProducts(page, PAGE_SIZE)
  const produtos = data?.data
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  if (isError) return <p>Erro ao carregar produtos.</p>

  return (
    <div className="mt-5">
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
            {produtos?.map((item) => (
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
