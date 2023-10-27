<script setup>
defineProps({
  menuItems: {
    type: Array
  }
})
</script>
<template>
  <nav class="fixed top-[0] right-[0] h-screen z-[99] w-1/2 bg-black">
    <ul class="mt-[70px]">
      <li v-for="item in menuItems" :key="item.id" class="uppercase text-center sm:text-left">
        <a :href="item.url" class="block no-underline text-xl p-3 my-0 mx-[20px] text-white">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
a {
  transition: 0.4s ease;
}

@media (hover: hover) {
  a:hover {
    background: #808080;
  }
}

@media (hover: none) {
  a:active {
    background: #808080;
  }
}
</style>
