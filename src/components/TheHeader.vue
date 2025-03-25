<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingCart, User, Search, Menu } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useAlert } from '@/composables/useAlert'

const cartStore = useCartStore()
const { Alert } = useAlert()

interface NavigationItem {
  name: string
  link: string
}

interface ActionItem {
  name: string
  link: string
  icon: typeof ShoppingCart | typeof User | typeof Search
  func?: () => void
}

const navigation = ref<NavigationItem[]>([
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'About', link: '/about' },
])

const actionButtons = ref<ActionItem[]>([
  {
    name: 'Search',
    link: '',
    icon: Search,
    func: () => Alert.warning('Search is not available yet'),
  },
  {
    name: 'Account',
    link: '',
    icon: User,
    func: () => Alert.warning('Account is not available yet'),
  },
  { name: 'Cart', link: '/products/cart', icon: ShoppingCart },
])

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header
    class="py-4 bg-white shadow-md fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/logo.png" alt="Vue Mastery" class="h-10 w-auto md:h-12" />
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8">
        <ul class="flex items-center gap-8">
          <li v-for="item in navigation" :key="item.link">
            <RouterLink
              :to="item.link"
              class="text-gray-700 text-sm md:text-base font-medium hover:text-blue-600 transition-colors duration-200"
              exact-active-class="font-bold text-blue-700"
            >
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2 md:gap-4">
        <div v-for="button in actionButtons" :key="button.name" class="relative">
          <RouterLink
            v-if="button.link && button.link.trim() !== ''"
            :to="button.link"
            :aria-label="'Go to ' + button.name"
          >
            <StaticButton
              background-color="transparent"
              text-color="gray-700"
              size="small"
              rounded
              class="hover:bg-gray-100 transition-colors duration-200"
              :aria-title="button.name"
            >
              <component :is="button.icon" class="w-5 h-5 md:w-6 md:h-6" />
              <span
                v-if="button.name === 'Cart' && cartStore.cartCount"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full"
              >
                {{ cartStore.cartCount }}
              </span>
            </StaticButton>
          </RouterLink>
          <StaticButton
            v-else
            background-color="transparent"
            text-color="gray-700"
            size="small"
            rounded
            cta
            class="hover:bg-gray-100 transition-colors duration-200"
            :aria-title="button.name"
            @click="button.func && button.func()"
          >
            <component :is="button.icon" class="w-5 h-5 md:w-6 md:h-6" />
          </StaticButton>
        </div>

        <div class="md:hidden">
          <StaticButton
            background-color="transparent"
            text-color="gray-700"
            size="small"
            rounded
            cta
            class="hover:bg-gray-100 transition-colors duration-200"
            aria-title="Mobile Menu"
            @click="toggleMobileMenu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </StaticButton>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-0 bg-gray-800/75 z-20"
        @click="toggleMobileMenu"
      >
        <div
          class="fixed top-0 right-0 w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col gap-6"
          @click.stop
        >
          <div class="flex justify-end">
            <StaticButton
              background-color="transparent"
              text-color="gray-700"
              size="small"
              rounded
              @click="toggleMobileMenu"
            >
              <X class="w-6 h-6" />
            </StaticButton>
          </div>
          <nav>
            <ul class="flex flex-col gap-4">
              <li v-for="item in navigation" :key="item.link">
                <RouterLink
                  :to="item.link"
                  class="text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors duration-200"
                  exact-active-class="font-bold text-blue-700"
                  @click="toggleMobileMenu"
                >
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
}
</style>
