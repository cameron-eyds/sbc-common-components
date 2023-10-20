import { Products } from '@sbc/models/product'
import ProductService from '@sbc/services/product.services'
import { ProductsStateIF } from '@sbc/interfaces/product-state-interface'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useProductsStore = defineStore('product', () => {
  const state = reactive<ProductsStateIF>({
    products: []
  })
  async function syncProducts (): Promise<Products> {
    const response = await ProductService.getAllProducts()
    if (response && response.data) {
      state.products = response.data?.sort((a, b) => a.name.localeCompare(b.name))
      return state.products
    }
  }
  return {
    state,
    syncProducts
  }
})
