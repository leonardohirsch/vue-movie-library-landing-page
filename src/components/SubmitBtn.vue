<script setup>
defineProps(['label', 'formReadyToSend', 'formSent'])
defineEmits(['submitForm'])
</script>

<template>
  <button
    type="button"
    style="color: #fff"
    @click="$emit('submitForm')"
    class="text-white bg-yellow-700 rounded-sm px-5 py-2.5"
    :class="{
      'focus:outline-none bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-600':
        formReadyToSend,
      'cursor-not-allowed': !formReadyToSend
    }"
    :disabled="!formReadyToSend || formSent"
  >
    <span v-if="!formSent">{{ label }}</span>
    <span v-else>Procesando...</span>
  </button>
</template>
