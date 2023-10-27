import { reactive } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const windowData = reactive({
    width: 0,
    height: 0
  })

  const handleResize = () => {
    windowData.width = window.innerWidth
    windowData.height = window.innerHeight
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { windowData }
}
