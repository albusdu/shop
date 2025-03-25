<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/api/productsService'
import ProductsGrid from '@/components/Products/ProductsGrid.vue'
import { formatSlugToTitle } from '@/utils/formatString.ts'
import { ChevronLeft } from 'lucide-vue-next'

// Following the instruction: "When you click on a category,
// the app takes you to a page with subcategories and products belonging to that category."
// However, instead of using URL params, the page is created as a route.
// In my opinion, it would be better to use URL params to handle category navigation dynamically.

const route = useRoute()
const {
  products,
  query,
  error: productsError,
  loading: productsLoading,
  fetchProducts,
} = useProducts()

onMounted(async () => {
  try {
    const categoryID = Number(route.query.id)
    if (!categoryID) throw new Error('Category ID not found')

    query.value.category = categoryID
    await fetchProducts()
  } catch (error) {
    console.error('Failed to fetch product:', error)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 space-y-5 py-8 min-h-screen">
    <RouterLink :to="{ name: 'Products' }" class="inline-flex">
      <StaticButton background-color="gray" size="small"
        ><ChevronLeft /> Back to Products
      </StaticButton>
    </RouterLink>

    <h2
      class="text-2xl md:text-3xl font-bold mb-6 text-gray-900 tracking-tight text-center md:text-left"
    >
      {{
        formatSlugToTitle(
          Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug,
        )
      }}
    </h2>

    <ProductsGrid
      :products="products ? products.items : []"
      :error="productsError"
      :loading="productsLoading"
    />
  </div>
</template>
