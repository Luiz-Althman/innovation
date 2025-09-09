'use client'

import { HeaderPrivate } from '../components/header'
import { ProductList } from '../components/product-list'
import { SearchInputs } from '../components/search-input'
import { useState } from 'react'

export default function Products() {
  const [searchFilters, setSearchFilters] = useState<{
    nome?: string
    codigo?: string
  }>({})

  return (
    <div className="h-screen">
      <HeaderPrivate />
      <div className="px-6 py-12">
        <SearchInputs onSearchChange={setSearchFilters} />
        <ProductList
          searchNome={searchFilters.nome}
          searchCodigo={searchFilters.codigo}
        />
      </div>
    </div>
  )
}
