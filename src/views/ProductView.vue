<template>
  <div>
    <h1 class="text-2xl font-bold">{{ product.name }}</h1>
    <p>Price: ${{ product.price }}</p>
    <button @click="addToCart" class="mt-4 px-4 py-2 bg-green-500 text-white rounded">
      Add to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref({ id: route.params.id, name: 'Sample Product', price: 100 })

const addToCart = () => {
  console.log('Added to cart:', product.value)
}
</script>
