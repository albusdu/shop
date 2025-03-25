<script setup lang="ts">
import { computed, ref, onMounted, type FunctionalComponent } from 'vue'

interface Props {
  message: string
  variant?: 'success' | 'error' | 'warning'
  dismissible?: boolean
  icon?: FunctionalComponent
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'success',
  dismissible: false,
  icon: undefined,
})

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const variantStyles = {
  success: {
    wrapper: 'bg-green-100 border-l-4 border-green-500 text-green-700',
    closeButton: 'text-green-700',
  },
  error: {
    wrapper: 'bg-red-100 border-l-4 border-red-500 text-red-700',
    closeButton: 'text-red-700',
  },
  warning: {
    wrapper: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
    closeButton: 'text-yellow-700',
  },
}

const currentVariantStyles = computed(() => variantStyles[props.variant])

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    dismiss()
  }, 3000)
})

const dismiss = () => {
  isVisible.value = false
}

const onAfterLeave = () => {
  emit('dismiss')
}
</script>

<template>
  <transition name="slide" @after-leave="onAfterLeave">
    <div
      v-if="isVisible"
      :class="[
        'p-4 mb-4 rounded-lg flex items-center justify-between',
        currentVariantStyles.wrapper,
      ]"
      role="alert"
    >
      <div class="flex items-center">
        <span class="mr-2" v-if="icon"> <component :is="icon" /></span>
        <span>{{ message }}</span>
      </div>
      <button
        v-if="dismissible"
        @click="dismiss()"
        class="ml-4 text-sm font-medium hover:opacity-75 focus:outline-none"
        :class="currentVariantStyles.closeButton"
      >
        ✕
      </button>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active {
  animation: var(--animate-slide-in);
}

.slide-leave-active {
  animation: var(--animate-slide-out);
}
</style>
