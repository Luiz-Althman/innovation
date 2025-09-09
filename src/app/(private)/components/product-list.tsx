'use client'

import { useProducts } from '@/hooks/useProducts'
import { ProductItem, Product } from './product-item'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductList() {
  const { data: produtos, isLoading, isError } = useProducts()

  if (isLoading) {
    return (
      <div className="mt-5 grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, idx) => (
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
    )
  }

  if (isError || !produtos) return <p>Erro ao carregar produtos.</p>

  return (
    <div className="mt-5 grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
      {produtos.map((item: Product) => (
        <ProductItem key={item.codigo} product={item} />
      ))}
    </div>
  )
}
