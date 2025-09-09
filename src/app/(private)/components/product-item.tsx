'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DescriptionProduct } from './description-product'
import { formatPrice } from '@/utils/format-price'
import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { useProductDialogStore } from '@/stores/useProductDialogStore'
import { memo, useState } from 'react'

export interface Product {
  codigo: string
  nome: string
  descricao: string
  preco: number | string
  imagem: string
  cores?: string[]
  exclusivo?: boolean
}

interface ProductItemProps {
  product: Product
}

export const defaultColors = [
  'bg-amber-800',
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-400',
  'bg-purple-500',
  'bg-pink-500',
  'bg-gray-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-orange-500',
]

export const ProductItem = memo(function ProductItem({
  product,
}: ProductItemProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const { openDialog } = useProductDialogStore()
  const favorite = isFavorite(product.codigo)

  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="flex flex-col items-center justify-center">
        <h3 className="font-bold">{product.nome}</h3>
        <p>{product.codigo}</p>
      </header>

      <div className="relative flex w-full flex-col items-center justify-center border">
        {product.exclusivo !== false && (
          <p className="absolute top-0 right-0 bg-zinc-100 p-2 font-bold text-blue-400">
            EXCLUSIVO!
          </p>
        )}
        <Button
          variant="ghost"
          className="absolute top-0 left-0"
          size="lg"
          onClick={() => toggleFavorite(product.codigo)}
        >
          <Heart
            className={`h-8 w-8 ${favorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>

        {hasError || !product.imagem ? (
          <div className="flex h-[250px] w-[250px] items-center justify-center bg-zinc-100 text-zinc-500">
            Sem imagem
          </div>
        ) : (
          <Image
            src={product.imagem}
            alt={product.nome}
            width={250}
            height={250}
            className="object-contain"
            loading="lazy"
            priority={false}
            onError={() => setHasError(true)}
          />
        )}

        <div className="flex flex-col items-center justify-center space-y-4 py-3">
          <DescriptionProduct description={product.descricao} />
          <div className="flex flex-col space-y-4">
            <p className="font-semibold">Cores:</p>
            <div className="flex w-1/2 flex-wrap gap-1">
              {(product.cores || defaultColors).map((color) => (
                <span
                  key={color}
                  className={`h-6 w-6 rounded-full ${color} border`}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col text-right">
            <p>a partir de</p>
            <p className="text-2xl font-bold">{formatPrice(product.preco)}</p>
            <p>gerado pela melhor oferta</p>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <Button
          variant="innovation"
          size="product"
          className="w-full"
          onClick={() => openDialog(product)}
        >
          CONFIRA
        </Button>
      </div>
    </div>
  )
})
