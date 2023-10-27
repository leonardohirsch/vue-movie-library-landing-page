<script setup>
defineProps({
  title: {
    type: String
  },
  description: {
    type: String
  }
})
</script>
<template>
  <section class="bg-black px-[20px] lg:px-[100px] py-10 text-white">
    <h1 class="uppercase text-3xl font-bold pb-5">{{ title }}</h1>
    <p class="block sm:w-3/4 lg:w-1/2 text-base pb-5">
      {{ description }}
    </p>
  </section>
</template>
