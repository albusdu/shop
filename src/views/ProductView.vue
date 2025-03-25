<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '@/api/productsService'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/productTypes'
import QuantityPicker from '@/elements/QuantityPicker.vue'
import { ChevronLeft } from 'lucide-vue-next'
import { useAlert } from '@/composables/useAlert'

const route = useRoute()
const cartStore = useCartStore()
const { Alert } = useAlert()

const { product, error, loading, fetchProduct } = useProduct()
const quantity = ref(1)

onMounted(async () => {
  try {
    const productID = Number(route.query.id)
    if (!productID) throw new Error('Product ID not found')
    await fetchProduct(productID)
  } catch (error) {
    console.error('Failed to fetch product:', error)
  }
})

function addToCart(product: Product) {
  cartStore.addItem(product, quantity.value)
  Alert.success('Product added to cart')
  quantity.value = 1
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 space-y-5 py-8 min-h-screen">
    <div class="max-w-4xl mx-auto mb-3">
      <RouterLink :to="{ name: 'Products' }" class="inline-flex">
        <StaticButton background-color="gray" size="small"
          ><ChevronLeft /> Back to Products
        </StaticButton>
      </RouterLink>
    </div>
    <div v-if="loading" class="max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row gap-6">
        <div
          class="w-full md:w-1/2 aspect-(--aspect-ratio-img) bg-gray-200 animate-pulse rounded-lg"
        ></div>
        <div class="w-full md:w-1/2 space-y-4">
          <div class="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div class="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
          <div class="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
          <div class="h-12 bg-gray-200 animate-pulse rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-600 font-medium">Error: {{ error }}</p>
    </div>

    <div v-else-if="product" class="max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <img
            :src="product.hdThumbnailUrl"
            :alt="product.name"
            class="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div class="w-full md:w-1/2 flex flex-col space-y-4">
          <h1 class="text-1xl md:text-2xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="text-lg text-gray-600">
            Price:
            <span class="font-semibold text-gray-900"
              >€ {{ (product.price * quantity).toFixed(2) }}</span
            >
          </p>
          <p v-html="product.description" class="text-gray-700 leading-relaxed text-sm"></p>
          <div class="flex items-center gap-4">
            <label for="quantity" class="text-gray-700">Quantity:</label>
            <QuantityPicker id="quantity" v-model="quantity" :min="1" :max="10" class="w-32" />
          </div>
          <div class="hidden md:flex flex-grow"></div>
          <StaticButton cta @click="addToCart(product)"> Add to Cart </StaticButton>
        </div>
      </div>
    </div>
  </div>
</template>
