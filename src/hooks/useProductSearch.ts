'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

export function useProductSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const param = searchParams.get('search') || ''
    setSearch(param)
  }, [searchParams])

  const handleSearchChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
    setSearch(value)
  }, 500)

  return { search, handleSearchChange }
}
