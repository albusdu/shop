<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingCart, User, Search, Menu } from 'lucide-vue-next'

interface NavigationItem {
  name: string
  link: string
}

interface ActionItem {
  name: string
  link: string
  icon: typeof ShoppingCart | typeof User | typeof Search
  badgeCount?: number
  func?: () => void
}

const navigation = ref<NavigationItem[]>([
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/shop/products' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
])

const actionButtons = ref<ActionItem[]>([
  { name: 'Search', link: '', icon: Search, func: () => console.log('Open Search Modal') },
  { name: 'Account', link: '', icon: User, func: () => console.log('Open Auth Modal') },
  { name: 'Cart', link: '/shop/cart', icon: ShoppingCart, badgeCount: 3 },
])
</script>

<template>
  <header class="py-4 bg-amber-300 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/logo.png" alt="Vue Mastery" class="h-10 w-auto" />
      </RouterLink>
      <nav>
        <ul class="hidden md:flex items-center gap-6">
          <li v-for="item in navigation" :key="item.link">
            <RouterLink
              v-if="!item.link.startsWith('http')"
              :to="item.link"
              class="text-black hover:text-blue-600 transition duration-200"
            >
              {{ item.name }}
            </RouterLink>
            <a
              v-else
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-black hover:text-blue-600 transition duration-200"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-2">
        <div v-for="button in actionButtons" :key="button.name" class="cursor-pointer">
          <template v-if="button.link && button.link.trim() !== ''">
            <RouterLink
              :to="button.link"
              class="relative text-black hover:text-blue-600 transition duration-200"
            >
              <StaticButton
                background-color="transparent"
                text-color="black"
                size="small"
                rounded
                :badge-count="button.badgeCount"
              >
                <component :is="button.icon" class="w-6 h-6" />
                <span
                  v-if="button.badgeCount"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {{ button.badgeCount }}
                </span>
              </StaticButton>
            </RouterLink>
          </template>
          <template v-else>
            <StaticButton
              background-color="transparent"
              text-color="black"
              size="small"
              rounded
              :badge-count="button.badgeCount"
              cta
              @click="button.func && button.func()"
            >
              <component :is="button.icon" class="w-6 h-6" />
            </StaticButton>
          </template>
        </div>
        <div class="block md:hidden">
          <StaticButton
            background-color="transparent"
            text-color="black"
            size="small"
            rounded
            cta
            @click="() => console.log('Open Mobile Menu')"
          >
            <Menu class="w-6 h-6" />
          </StaticButton>
        </div>
      </div>
    </div>
  </header>
</template>
