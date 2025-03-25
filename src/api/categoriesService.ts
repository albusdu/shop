import type { CategoryResponse } from '@/types/categoryTypes'
import api from './axios'
import { ref } from 'vue'

export const useCategories = () => {
  const categories = ref<CategoryResponse | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const fetchCategories = async (): Promise<[CategoryResponse | null, Error?]> => {
    try {
      loading.value = true
      const res = await api.get('/categories')
      categories.value = res.data
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
    categories,
    error,
    loading,
    fetchCategories,
  }
}
