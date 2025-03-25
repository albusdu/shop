import { defineStore } from 'pinia'
import type { Product } from '@/types/productTypes'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; quantity: number }[],
  }),
  getters: {
    cartCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2),
  },
  actions: {
    addItem(product: Product, quantity: number = 1) {
      const existingItem = this.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      this.$state = { ...this.$state }
    },
    removeItem(productId: number) {
      const index = this.items.findIndex((item) => item.product.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    clearCart() {
      this.items = []
    },
  },
})
