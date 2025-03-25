<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '@/api/productsService'
import { useCategories } from '@/api/categoriesService'
import CategoriesMenu from '@/components/Products/CategoriesList.vue'
import ProductsGrid from '@/components/Products/ProductsGrid.vue'

const {
  categories,
  error: categoriesError,
  loading: categoriesLoading,
  fetchCategories,
} = useCategories()
const { products, error: productsError, loading: productsLoading, fetchProducts } = useProducts()

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 space-y-5 py-8 min-h-screen">
    <CategoriesMenu
      :categories="categories ? categories.items : []"
      :error="categoriesError"
      :loading="categoriesLoading"
    />
    <ProductsGrid
      :products="products ? products.items : []"
      :error="productsError"
      :loading="productsLoading"
      :has-title="true"
    />
  </div>
</template>
