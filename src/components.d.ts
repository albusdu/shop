declare module 'vue' {
  export interface GlobalComponents {
    StaticButton: (typeof import('@/elements/StaticButton.vue'))['default']
  }
}

export {}
