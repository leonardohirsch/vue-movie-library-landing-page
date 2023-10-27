<script setup>
import NavBar from './NavBar.vue'
import HeaderJpg from '../assets/Images/Header.jpg'

const menuItems = [
  { id: 0, name: 'home', url: '#' },
  { id: 1, name: 'our screens', url: '#' },
  { id: 2, name: 'schedule', url: '#' },
  { id: 3, name: 'movie library', url: '#' },
  { id: 4, name: 'location & contact', url: '#' }
]
</script>
<template>
  <header
    class="bg-black bg-cover bg-center h-[50vh]"
    :style="{ 'background-image': 'url(' + HeaderJpg + ')' }"
  >
    <NavBar :menuItems="menuItems" />
  </header>
</template>
