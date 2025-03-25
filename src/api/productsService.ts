import type { Product, ProductResponse } from '@/types/productTypes'
import api from './axios'

import { getQueryString } from '@/utils/useQuery'
import { computed, ref } from 'vue'

interface ProductQuery {
  category?: number
  priceFrom?: number
  priceTo?: number
  [key: string]: string | number | undefined
}

export const useProducts = () => {
  const products = ref<ProductResponse | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const query = ref<ProductQuery>({ category: undefined, priceFrom: undefined, priceTo: undefined })
  const queryString = computed(() => getQueryString<ProductQuery>(query.value))

  const fetchProducts = async (): Promise<[ProductResponse | null, Error?]> => {
    try {
      loading.value = true
      const res = await api.get(`/products${queryString.value}`)
      products.value = res.data
      error.value = null
      loading.value = false
      return [res.data]
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      return [null, error.value]
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    error,
    loading,
    query,
    queryString,
    fetchProducts,
  }
}

export const useProduct = () => {
  const product = ref<Product | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  // Caching could be implemented here to avoid redundant API calls
  // if multiple components fetch the same product.
  // However, since this func is used in only one component,
  // caching is not necessary, keeping it simpler.
  const fetchProduct = async (id: number): Promise<[Product | null, Error?]> => {
    try {
      loading.value = true
      const res = await api.get(`/products/${id}`)
      product.value = res.data
      error.value = null
      return [res.data]
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      return [null, error.value]
    } finally {
      loading.value = false
    }
  }

  return {
    product,
    error,
    loading,
    fetchProduct,
  }
}
