import { create } from 'zustand'
import { Product } from '@/app/(private)/components/product-item'

interface ProductDialogState {
  selectedProduct: Product | null
  openDialog: (product: Product) => void
  closeDialog: () => void
}

export const useProductDialogStore = create<ProductDialogState>((set) => ({
  selectedProduct: null,
  openDialog: (product) => set({ selectedProduct: product }),
  closeDialog: () => set({ selectedProduct: null }),
}))
