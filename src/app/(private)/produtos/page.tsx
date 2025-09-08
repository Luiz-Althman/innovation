import { HeaderPrivate } from '../components/header'

export default async function Products() {
  return (
    <div className="h-screen">
      <HeaderPrivate />
      <div className="px-6 py-12">
        <h1>Produtos</h1>
      </div>
    </div>
  )
}
