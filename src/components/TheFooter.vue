<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto text-center">
      <p class="text-sm">&copy; {{ currentYear }} Ecwid by Lightspeed. All rights reserved.</p>
    </div>
  </footer>
</template>
