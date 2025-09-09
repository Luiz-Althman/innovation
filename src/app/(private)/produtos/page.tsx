'use client'

import { useState } from 'react'
import { HeaderPrivate } from '../components/header'
import { ProductList } from '../components/product-list'
import SearchInput from '../components/search-input'

export default function Products() {
  const [search, setSearch] = useState('')

  return (
    <div className="h-screen">
      <HeaderPrivate />
      <div className="px-6 py-12">
        <SearchInput onSearch={setSearch} />
        <ProductList />
      </div>
    </div>
  )
}
