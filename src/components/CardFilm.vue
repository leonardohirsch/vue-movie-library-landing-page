<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  image: {
    type: String
  },
  name: {
    type: String
  },
  summary: {
    type: String
  }
})

defineEmits(['removeItem'])
</script>
<template>
  <article class="relative bg-gray-700 text-white my-2">
    <button
      class="absolute z-[98] top-[10px] right-[10px] flex justify-center items-center w-[50px] h-[50px] border-none cursor-pointer"
      @click="$emit('removeItem')"
      alt="Quitar film"
    >
      <XMarkIcon class="h-6 w-6 text-white" />
    </button>
    <div
      class="bg-cover bg-center h-[450px]"
      :style="{ 'background-image': 'url(' + image + ')' }"
    ></div>
    <h2 class="p-4 text-2xl font-bold">{{ name }}</h2>
    <p v-html="summary" class="text-base pb-4 px-4"></p>
  </article>
</template>
<style scoped>
button {
  background-color: rgba(25, 25, 25, 0.4);
}
</style>
