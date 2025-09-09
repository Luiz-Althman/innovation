'use client'

import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '@/services/auth'
import type { Product } from '@/app/(private)/components/product-item'

async function fetchProducts(): Promise<Product[]> {
  const token = getAuthToken()
  const res = await fetch(
    'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) throw new Error('Erro ao buscar produtos')

  return res.json()
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
