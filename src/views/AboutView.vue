<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="min-h-[600px] h-auto md:h-[calc(100vh-80px)] bg-gradient-to-b from-gray-100 to-gray-300 pt-[72px] flex items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center h-full gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 text-center"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-2 md:mb-4"
      >
        About Us
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl">
        Learn more about our mission, values, and commitment to providing you with the best
        experience possible.
      </p>
      <RouterLink to="/products">
        <StaticButton size="large"> Shop now </StaticButton>
      </RouterLink>
    </div>
  </section>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Another Section</h2>
      Some content....
    </div>
  </section>
</template>
