import type { CategoryResponse } from '@/types/categoryTypes'
import api from './axios'
import { ref } from 'vue'
import { normalizeError } from '@/utils/formatString'

export const useCategories = () => {
  const categories = ref<CategoryResponse | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const fetchCategories = async (): Promise<[CategoryResponse | null, Error?]> => {
    try {
      loading.value = true
      const res = await api.get<CategoryResponse>('/categories')
      categories.value = res.data
      error.value = null
      return [res.data]
    } catch (err) {
      error.value = normalizeError(err)
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
