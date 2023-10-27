<script setup>
defineProps({
  navOpen: {
    type: Boolean
  }
})
defineEmits(['handleNav'])
</script>
<template>
  <button
    class="fixed z-[100] top-[20px] right-[20px] block w-[50px] h-[50px] bg-black border-none cursor-pointer outline-none appearance-none"
    :class="{ active: navOpen }"
    @click="$emit('handleNav')"
  >
    <span class="top"></span>
    <span class="mid"></span>
    <span class="bottom"></span>
  </button>
</template>
<style scoped>
span {
  display: block;
  width: 20px;
  height: 2px;
  margin: auto;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.4s ease;
}
span.top {
  transform: translateY(-8px);
}
span.bottom {
  transform: translateY(8px);
}

.active .top {
  transform: rotate(-45deg);
}
.active .mid {
  transform: translateX(-20px) rotate(360deg);
  opacity: 0;
}
.active .bottom {
  transform: rotate(45deg);
}
</style>
