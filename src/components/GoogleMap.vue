<script setup>
defineProps({
  url: {
    type: String
  }
})
</script>
<template>
  <iframe
    :src="url"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>
