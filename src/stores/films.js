import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useFilmsStore = defineStore('films', () => {
  const filmsFetched = reactive([])
  const filmsDb = reactive([])

  return { filmsFetched, filmsDb }
})
