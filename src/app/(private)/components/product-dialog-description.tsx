'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { formatPrice } from '@/utils/format-price'
import { useProductDialogStore } from '@/stores/useProductDialogStore'
import { defaultColors } from './product-item'

export function ProductDialog() {
  const { selectedProduct, closeDialog } = useProductDialogStore()

  if (!selectedProduct) return null

  return (
    <Dialog
      open={!!selectedProduct}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <DialogContent className="w-full max-w-sm px-6 sm:px-6 md:px-8">
        <DialogHeader>
          <DialogTitle className="text-md">
            {selectedProduct.nome || 'Produto'}
          </DialogTitle>
          <DialogDescription className="max-h-24 overflow-y-auto">
            {selectedProduct.descricao || 'Descrição não disponível'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex max-h-[60vh] flex-col gap-6 overflow-y-auto md:flex-row">
          <div className="flex flex-shrink-0 justify-center md:justify-start">
            <Image
              src={selectedProduct.imagem}
              alt={selectedProduct.nome}
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-semibold">Código: {selectedProduct.codigo}</p>
            <p className="text-lg font-bold">
              {formatPrice(selectedProduct.preco)}
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-sm font-semibold">Cores disponíveis:</p>
              <div className="mt-1 flex w-1/2 flex-wrap gap-2">
                {defaultColors.map((color) => (
                  <span
                    key={color}
                    className={`h-6 w-6 rounded-full border ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <DialogClose className="btn">Fechar</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
