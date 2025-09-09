'use client'

import { useState } from 'react'
import { SearchInputs } from '../components/search-input'
import { ProductList } from '../components/product-list'

export function ProductsClient() {
  const [searchFilters, setSearchFilters] = useState<{
    nome?: string
    codigo?: string
  }>({})

  return (
    <>
      <SearchInputs onSearchChange={setSearchFilters} />
      <ProductList
        searchNome={searchFilters.nome}
        searchCodigo={searchFilters.codigo}
      />
    </>
  )
}
