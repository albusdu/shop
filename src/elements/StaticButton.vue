<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// This button is designed as a static,
// memoized component for performance,
// as it may be used (n times) on all products in a platform with static props after render.

interface ButtonWrapperProps {
  cta?: boolean
  backgroundColor?: 'transparent' | 'green' | 'blue' | 'red' | 'yellow' | 'gray'
  textColor?: 'white' | 'black' | 'gray'
  borderColor?: 'transparent' | 'blue' | 'red'
  size?: 'small' | 'medium' | 'large'
  rounded?: boolean
}

const props = defineProps<ButtonWrapperProps>()
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.cta) emit('click', event)
}

const classCache = new Map<string, string[]>()
const MAX_CACHE_SIZE = 100

const bgClasses = {
  transparent: 'bg-transparent',
  green: 'bg-green-500 hover:bg-green-600',
  blue: 'bg-blue-500 hover:bg-blue-600',
  red: 'bg-red-500 hover:bg-red-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  gray: 'bg-gray-500 hover:bg-gray-600',
} as const

const textClasses = {
  white: props.backgroundColor === 'transparent' ? 'text-white hover:text-blue-600' : 'text-white',
  black: props.backgroundColor === 'transparent' ? 'text-black hover:text-blue-600' : 'text-black',
  gray:
    props.backgroundColor === 'transparent' ? 'text-gray-800 hover:text-blue-600' : 'text-gray-800',
} as const

const borderClasses = {
  transparent: 'border-transparent',
  blue: 'border-blue-500',
  red: 'border-red-500',
} as const

const sizeClasses = {
  small: 'py-1 px-1 text-sm gap-1',
  medium: 'py-2 px-2 text-base gap-2',
  large: 'py-3 px-3 text-lg gap-2',
} as const

const getCacheKey = (props: ButtonWrapperProps): string => {
  return `${props.backgroundColor || 'blue'}-${props.textColor || 'white'}-${props.borderColor || 'transparent'}-${props.size || 'medium'}-${props.rounded ? 'rounded' : 'not-rounded'}`
}

const getButtonClasses = (props: ButtonWrapperProps): string[] => {
  const cacheKey = getCacheKey(props)

  if (classCache.has(cacheKey)) {
    return classCache.get(cacheKey)!
  }

  const classes = [
    'flex items-center cursor-pointer',
    props.rounded ? 'rounded-full' : 'rounded',
    bgClasses[props.backgroundColor || 'blue'],
    textClasses[props.textColor || 'white'],
    borderClasses[props.borderColor || 'transparent'],
    sizeClasses[props.size || 'medium'],
    'border',
  ]
  if (classCache.size >= MAX_CACHE_SIZE) {
    classCache.clear()
  }

  classCache.set(cacheKey, classes)
  return classes
}

const buttonClasses = getButtonClasses(props)
</script>

<template>
  <button :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>
