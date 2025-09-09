'use client'

import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '@/services/auth'
import { Product } from '@/app/(private)/components/product-item'

interface FetchProductsParams {
  page: number
  pageSize: number
}

async function fetchProducts({
  page,
  pageSize,
}: FetchProductsParams): Promise<{ data: Product[]; total: number }> {
  const token = getAuthToken()

  const res = await fetch(
    'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) throw new Error('Erro ao buscar produtos')
  const data: Product[] = await res.json()
  const total = data.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return { data: data.slice(start, end), total }
}

export function useProducts(page: number, pageSize: number) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts({ page, pageSize }),
    staleTime: 1000 * 60 * 5,
  })
}
