<script setup lang="ts">
import { useAlert } from '@/composables/useAlert'
import Alert from './AlertMessage.vue'

const { alerts, removeAlert } = useAlert()
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
    <Alert
      v-for="alert in alerts"
      :key="alert.id"
      :message="alert.message"
      :variant="alert.variant"
      :dismissible="alert.dismissible"
      :icon="alert.icon"
      @dismiss="removeAlert(alert.id)"
    />
  </div>
</template>
