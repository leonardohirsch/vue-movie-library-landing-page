<script setup>
defineProps({
  msg: {
    type: String
  }
})
</script>
<template>
  <div class="my-3 p-3 text-white text-center">
    <span> {{ msg }} </span>
  </div>
</template>
