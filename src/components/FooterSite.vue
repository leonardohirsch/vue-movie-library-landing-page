<script setup>
import YoutubeWhite from '../assets/Icons/YoutubeWhite.svg'
import TwitterWhite from '../assets/Icons/TwitterWhite.svg'
</script>
<template>
  <footer class="bg-gray-800 flex flex-col gap-5 py-10">
    <div
      class="px-[20px] lg:px-[100px] text-white flex flex-col gap-5 sm:gap-0 sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col items-center sm:items-start">
        <span class="inner-block font-bold pb-2">Amadeus IT Group</span>
        <span>C. Salvador de Madariaga, 1</span>
        <span>28027 Madrid</span>
        <span>Spain</span>
      </div>

      <div class="flex flex-row gap-2 self-center sm:self-start">
        <span>Follow us on</span>
        <img :src="TwitterWhite" class="w-[1.5rem] cursor-pointer" />
        <img :src="YoutubeWhite" class="w-[1.5rem] cursor-pointer" />
      </div>
    </div>

    <hr class="h-[1px] border-gray-400" />

    <div
      class="px-[20px] lg:px-[100px] text-gray-400 text-sm flex flex-col items-center gap-2 lg:flex-row lg:justify-between text-center"
    >
      <span>Copyright © 2022 Amadeus Hotels. All rights reserved.</span>

      <span>Photos by <u>Felix Mooneeram</u> & <u>Serge Kutuzov</u> on <u>Unsplash</u></span>
    </div>
  </footer>
</template>
