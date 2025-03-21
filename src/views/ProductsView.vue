<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="border p-4">
        <h2 class="font-semibold">{{ product.name }}</h2>
        <p>Price: ${{ product.price }}</p>
        <RouterLink :to="'/shop/product/' + product.id" class="text-blue-500">
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Headphones', price: 150 },
])
</script>
