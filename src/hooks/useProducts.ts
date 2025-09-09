'use client'

import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '@/services/auth'
import { Product } from '@/app/(private)/components/product-item'

interface FetchProductsParams {
  page: number
  pageSize: number
  search?: string
}

interface ProductFilterPayload {
  nome_produto?: string
  codigo_produto?: string
}

async function fetchProducts({
  page,
  pageSize,
  search,
}: FetchProductsParams): Promise<{ data: Product[]; total: number }> {
  const token = getAuthToken()
  const payload: ProductFilterPayload = {}

  if (search) {
    payload.nome_produto = search
    if (/^\d+$/.test(search)) {
      payload.codigo_produto = search
    }
  }

  const res = await fetch(
    'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  )

  if (!res.ok) throw new Error('Erro ao buscar produtos')
  const data: Product[] = await res.json()
  const total = data.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return { data: data.slice(start, end), total }
}

export function useProducts(page: number, pageSize: number, search?: string) {
  return useQuery({
    queryKey: ['products', page, search],
    queryFn: () => fetchProducts({ page, pageSize, search }),
    staleTime: 1000 * 60 * 5,
  })
}
