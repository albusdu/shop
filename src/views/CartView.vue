<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useAlert } from '@/composables/useAlert'
import QuantityPicker from '@/elements/QuantityPicker.vue'
import { Trash } from 'lucide-vue-next'

defineProps<{
  loading?: boolean
}>()

const cartStore = useCartStore()
const { Alert } = useAlert()

function checkout() {
  // router.push('/checkout')
  Alert.success('Congratulations! Your purchase was successful!')
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 space-y-5 py-8 min-h-screen">
    <div v-if="loading" class="max-w-4xl mx-auto space-y-6">
      <div class="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>
      <div
        v-for="n in 2"
        :key="n"
        class="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-md"
      >
        <div class="w-full md:w-24 h-24 bg-gray-200 animate-pulse rounded"></div>
        <div class="flex-1 space-y-3">
          <div class="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div class="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
        </div>
      </div>
      <div class="h-12 bg-gray-200 animate-pulse rounded w-1/3 ml-auto"></div>
    </div>

    <div v-else-if="cartStore.items.length === 0" class="max-w-4xl mx-auto text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
      <p class="mt-2 text-gray-600">Add some items to get started!</p>
      <router-link
        to="/products"
        class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Shop Now
      </router-link>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>

      <div class="space-y-4">
        <div
          v-for="(item, index) in cartStore.items"
          :key="item.product.id"
          class="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-md"
        >
          <img
            :src="item.product.hdThumbnailUrl"
            :alt="item.product.name"
            class="w-full md:w-24 h-24 object-cover rounded-md"
          />

          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ item.product.name }}</h3>
              <p class="text-gray-600">
                Price:
                <span class="font-medium"
                  >${{ (item.product.price * item.quantity).toFixed(2) }}</span
                >
              </p>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2">
                <label :for="`quantity-${index}`" class="text-gray-700">Qty:</label>
                <QuantityPicker
                  :id="`quantity-${index}`"
                  v-model="item.quantity"
                  :min="1"
                  :max="10"
                  class="w-24"
                />
              </div>
              <StaticButton
                size="small"
                background-color="red"
                rounded
                cta
                @click="cartStore.removeItem(item.product.id)"
              >
                <Trash />
              </StaticButton>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <div class="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <div class="flex justify-between text-lg">
            <span class="text-gray-700">Subtotal:</span>
            <span class="font-semibold text-gray-900">${{ cartStore.cartTotal }}</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">Shipping calculated at checkout</p>
          <StaticButton cta @click="checkout"> Proceed to Checkout </StaticButton>
        </div>
      </div>
    </div>
  </div>
</template>
