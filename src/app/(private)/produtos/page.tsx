import { HeaderPrivate } from '../components/header'
import { ProductDialog } from '../components/product-dialog-description'
import { ProductsClient } from '../components/products-client'

export default function Products() {
  return (
    <div className="h-screen">
      <HeaderPrivate />
      <div className="px-6 py-12">
        <ProductsClient />
      </div>
      <ProductDialog />
    </div>
  )
}
