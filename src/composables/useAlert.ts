import { ref, type FunctionalComponent, type Ref } from 'vue'
import { Check, TriangleAlert, X } from 'lucide-vue-next'

interface Alert {
  id: number
  message: string
  variant: 'success' | 'error' | 'warning'
  dismissible: boolean
  icon?: FunctionalComponent
}

const alerts: Ref<Alert[]> = ref([])

export const useAlert = () => {
  const addAlert = (
    message: string,
    variant: 'success' | 'error' | 'warning' = 'success',
    dismissible = true,
    icon?: FunctionalComponent,
  ) => {
    const id = Date.now()
    alerts.value.push({ id, message, variant, dismissible, icon })
  }

  const removeAlert = (id: number) => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id)
  }

  return {
    alerts,
    Alert: {
      success: (message: string, dismissible = true) =>
        addAlert(message, 'success', dismissible, Check),
      error: (message: string, dismissible = true) => addAlert(message, 'error', dismissible, X),
      warning: (message: string, dismissible = true) =>
        addAlert(message, 'warning', dismissible, TriangleAlert),
    },
    removeAlert,
  }
}
