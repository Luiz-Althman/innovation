'use client'

import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '@/services/auth'
import { Product } from '@/app/(private)/components/product-item'

interface FetchProductsParams {
  page: number
  pageSize: number
  nomeProduto?: string
  codigoProduto?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string

async function fetchProducts({
  page,
  pageSize,
  nomeProduto,
  codigoProduto,
}: FetchProductsParams) {
  const token = getAuthToken()
  const body = {
    nome_produto: nomeProduto || '',
    codigo_produto: codigoProduto || '',
  }

  const res = await fetch(`${API_BASE_URL}/innova-dinamica/produtos/listar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error('Erro ao buscar produtos')

  const data: Product[] = await res.json()
  const total = data.length
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return { data: data.slice(start, end), total }
}

export function useProducts(
  page: number,
  pageSize: number,
  nomeProduto?: string,
  codigoProduto?: string,
) {
  return useQuery({
    queryKey: ['products', page, nomeProduto, codigoProduto],
    queryFn: () =>
      fetchProducts({ page, pageSize, nomeProduto, codigoProduto }),
    staleTime: 1000 * 60 * 5,
  })
}
