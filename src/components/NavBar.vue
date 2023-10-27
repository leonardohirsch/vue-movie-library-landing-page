<script setup>
import { ref } from 'vue'
//componentes
import HamburgerBtn from './HamburgerBtn.vue'
import NavSideMenu from './NavSideMenu.vue'
//composables
import { useWindowSize } from '../composables/useWindowSize.js'
//assets
import logoWhiteUrl from '../assets/Logos/LogoWhite.svg'

defineProps({
  menuItems: {
    type: Array
  }
})
const { windowData } = useWindowSize()
const navOpen = ref(false)
</script>
<template>
  <div class="relative top-[20px] bg-black text-white pl-[20px] lg:px-[100px]">
    <nav class="flex flex-row items-center h-[50px]">
      <div class="w-1/3">
        <img :src="logoWhiteUrl" alt="Logoipsum White" />
      </div>
      <ul class="w-2/3 flex flex-row gap-2 justify-around">
        <template v-for="item in menuItems" :key="item.id">
          <li
            v-if="
              (item.id < 3 && windowData.width >= 768) || (item.id < 5 && windowData.width > 1024)
            "
            class="uppercase"
          >
            <a :href="item.url"> {{ item.name }} </a>
          </li>
        </template>
        <li v-if="windowData.width < 1024">
          <HamburgerBtn @handleNav="navOpen = !navOpen" :navOpen="navOpen" />
        </li>
      </ul>
    </nav>

    <transition name="translateX">
      <NavSideMenu v-if="windowData.width < 1024" v-show="navOpen" :menuItems="menuItems" />
    </transition>
  </div>
</template>
<style scoped>
@media (hover: hover) {
  a:hover {
    text-decoration: underline;
  }
}

@media (hover: none) {
  a:active {
    text-decoration: underline;
  }
}
.translateX-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,
.translateX-leave-active {
  transform-origin: top left 0;
  transition: 0.2s ease;
}

.translateX-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
