<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/TheHeader.vue'
import Footer from '@/components/TheFooter.vue'
import AlertContainer from './elements/Alert/AlertContainer.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
  <AlertContainer />
</template>
