<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const min = props.min ?? 0
const max = props.max ?? 999

const value = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = clamp(newValue)
  },
)

watch(value, (newValue) => {
  emit('update:modelValue', clamp(newValue))
})

const clamp = (val: number): number => {
  return Math.min(Math.max(val, min), max)
}

const increase = () => {
  value.value = clamp(value.value + 1)
}

const decrease = () => {
  value.value = clamp(value.value - 1)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = parseInt(target.value) || min
  value.value = clamp(val)
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      @click="decrease"
      :disabled="value <= min"
      class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
      -
    </button>
    <input
      type="number"
      v-model.number="value"
      @input="handleInput"
      class="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :min="min"
      :max="max"
    />
    <button
      @click="increase"
      :disabled="value >= max"
      class="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
      +
    </button>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
