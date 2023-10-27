<script setup>
import { computed, onBeforeMount, ref, reactive, watch } from 'vue'
//components
import AlertMsg from './components/AlertMsg.vue'
import CardFilm from './components/CardFilm.vue'
import ContactInput from './components/ContactInput.vue'
import ContactTextArea from './components/ContactTextArea.vue'
import FooterSite from './components/FooterSite.vue'
import GoogleMap from './components/GoogleMap.vue'
import HeaderMain from './components/HeaderMain.vue'
import MainSection from './components/MainSection.vue'
import SubmitBtn from './components/SubmitBtn.vue'
//Icons
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
//composables
import { useFetchData } from './composables/useFetchData'
//stores
import { useFilmsStore } from './stores/films.js'
//assets
import BatmanJpg from './assets/Images/Batman.jpg'
import SpidermanJpg from './assets/Images/Spiderman.jpg'
import WildWestJpg from './assets/Images/WildWest.jpg'

//Form Data and Functions
const inputs = reactive({
  firstname: '',
  lastname: '',
  email: '',
  telephone: '',
  message: '',
  termscheck: false
})

const formReadyToSend = computed(() => {
  return inputs.firstname.trim().length === 0 ||
    inputs.lastname.trim().length === 0 ||
    inputs.email.trim().length === 0 ||
    !inputs.email.includes('@') ||
    inputs.message.trim().length === 0 ||
    !inputs.termscheck
    ? false
    : true
})

const formSent = ref(false)

const sendForm = () => {
  formSent.value = true
  inputs.firstname = ''
  inputs.lastname = ''
  inputs.email = ''
  inputs.telephone = ''
  inputs.message = ''
  inputs.termscheck = false
}

//Films Data and Functions
const filmsStore = useFilmsStore()

const preloadedFilms = [
  {
    id: 'BatmanExample',
    name: 'Batman',
    image: BatmanJpg,
    summary:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, laudantium. Nesciunt reprehenderit voluptates saepe natus officia dolorem itaque voluptas quos quo suscipit distinctio illo veritatis, cumque omnis quod nostrum similique!'
  },
  {
    id: 'SpidermanExample',
    name: 'Spiderman',
    image: SpidermanJpg,
    summary:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, laudantium. Nesciunt reprehenderit voluptates saepe natus officia dolorem itaque voluptas quos quo suscipit distinctio illo veritatis, cumque omnis quod nostrum similique!'
  },
  {
    id: 'WildWestExample',
    name: 'WildWest',
    image: WildWestJpg,
    summary:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, laudantium. Nesciunt reprehenderit voluptates saepe natus officia dolorem itaque voluptas quos quo suscipit distinctio illo veritatis, cumque omnis quod nostrum similique!'
  }
]

onBeforeMount(() => {
  preloadedFilms.forEach((film) => filmsStore.filmsDb.push(film))
})

const { errFetchMsg, doFetch } = useFetchData({})

const minChars = 2

const okMsgFilmAdded = ref(null)

const getSelectFilm = async (search, loading) => {
  errFetchMsg.value = null

  filmsStore.filmsFetched.splice(0, filmsStore.filmsFetched.length)

  const searchQ = search.trim()

  if (searchQ.length <= minChars) return

  okMsgFilmAdded.value = null

  loading(true)

  const endPoint = 'https://api.tvmaze.com/search/shows?q=' + searchQ
  const fetchOpts = { method: 'GET', accept: 'application/json' }

  const data = await doFetch(endPoint, fetchOpts)

  if (data) {
    data.forEach((film) => {
      if (
        !filmsStore.filmsFetched.find((item) => item.id == film.show.id) &&
        !filmsStore.filmsDb.find((item) => item.id == film.show.id)
      ) {
        filmsStore.filmsFetched.push({
          id: film.show.id,
          image: film.show.image?.original ? film.show.image.original : null,
          name: film.show.name,
          summary: film.show.summary
        })
      }
    })
  }

  loading(false)
}

const filmSelected = ref(null)

watch(filmSelected, (newSelected) => {
  if (newSelected !== null) {
    filmsStore.filmsDb.unshift(filmsStore.filmsFetched.find((film) => film.id === newSelected))
    okMsgFilmAdded.value = 'Film added succesfully!'
    filmSelected.value = null
  }
})

const dropdownShouldOpen = (VueSelect) => {
  if (filmSelected.value !== null) {
    return VueSelect.open
  }

  return VueSelect.search.length !== 0 && VueSelect.open
}

const removeFilm = (id) => {
  const index = filmsStore.filmsDb.findIndex((film) => film.id === id)
  filmsStore.filmsDb.splice(index, 1)
}

//GoogleMap
const googleMapUrl =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48588.133010545425!2d-3.7152472!3d40.4363503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f35d4f0c269%3A0x754405946e8ca584!2sAmadeus%20IT%20Group!5e0!3m2!1sen!2ses!4v1688161395020!5m2!1sen!2ses'
</script>

<template>
  <HeaderMain />

  <MainSection
    :title="'MOVIE LIBRARY'"
    :description="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis autem voluptates saepe nostrum ducimus dignissimos. Esse cupiditate qui voluptate similique animi'"
  />
  <main>
    <section class="bg-gray-800 px-[20px] lg:px-[100px] py-10 flex flex-col">
      <div class="text-white flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <h2 class="text-2xl sm:w-1/2 font-bold pb-5 sm:pb-0">Collect your favourites</h2>

        <div class="sm:w-1/2 pb-5 sm:pt-5">
          <v-select
            :options="filmsStore.filmsFetched"
            label="name"
            :reduce="(film) => film.id"
            :value="filmSelected"
            v-model="filmSelected"
            @search="getSelectFilm"
            :filterable="false"
            :dropdown-should-open="dropdownShouldOpen"
            class="films-select"
            :dir="'auto'"
            :placeholder="'Search and add films...'"
          >
            <template #search="{ attributes, events }">
              <MagnifyingGlassIcon class="h-6 w-6 mx-2 my-2" v-if="filmSelected === null" />
              <input class="vs__search" v-bind="attributes" v-on="events" />
            </template>

            <template v-slot:no-options="{ search, searching, loading }">
              <template v-if="!loading && searching && search.length > minChars">
                No results for <em>{{ search }}</em>
              </template>
              <template v-if="searching && loading && search.length > minChars">
                Searching for <em>{{ search }}</em>
              </template>
              <em v-if="search.length <= minChars"> Min three characters... </em>
            </template>

            <template #spinner="{ loading }">
              <div
                v-if="loading"
                style="border-color: #9ca3af; border-left-color: #fff"
                class="vs__spinner"
              ></div>
            </template>
          </v-select>
        </div>
      </div>

      <AlertMsg v-if="errFetchMsg" :msg="errFetchMsg" class="bg-red-500" />

      <AlertMsg v-if="okMsgFilmAdded" :msg="okMsgFilmAdded" class="bg-green-500" />

      <hr class="h-[1px] border-gray-400" />

      <div class="grid grid-cols-1 gap-5 lg:grid-cols-3 sm:grid-cols-2">
        <CardFilm
          v-for="item in filmsStore.filmsDb"
          :key="item.id"
          :image="item.image"
          :name="item.name"
          :summary="item.summary"
          @removeItem="removeFilm(item.id)"
        />
      </div>
    </section>

    <section class="bg-black text-white pt-10 lg:py-10">
      <h2 class="text-2xl font-bold pb-5 px-[20px] lg:px-[100px]">How to reach us</h2>
      <p class="block w-1/2 text-base pb-5 text-gray-400 px-[20px] lg:px-[100px]">
        Lorem ipsum dolor sit amet, consetetur.
      </p>
      <div class="flex flex-col lg:flex-row gap-10">
        <form class="lg:w-1/2 flex flex-col px-[20px] lg:pl-[100px]">
          <div class="flex flex-col sm:flex-row sm:justify-between">
            <div class="flex flex-col gap-1 mb-3 sm:w-1/2 sm:mr-2">
              <ContactInput
                v-model="inputs.firstname"
                :label="'First Name'"
                :id="'firstname'"
                :type="'text'"
                :required="true"
              />
            </div>
            <div class="flex flex-col gap-1 mb-3 sm:w-1/2 sm:ml-2">
              <ContactInput
                v-model="inputs.lastname"
                :label="'Last Name'"
                :id="'lastname'"
                :type="'text'"
                :required="true"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1 mb-3">
            <ContactInput
              v-model="inputs.email"
              :label="'Email'"
              :id="'email'"
              :type="'email'"
              :required="true"
            />
          </div>
          <div class="flex flex-col gap-1 mb-3">
            <ContactInput
              v-model="inputs.telephone"
              :label="'Telephone'"
              :id="'telephone'"
              :type="'tel'"
              :required="false"
            />
          </div>
          <div class="flex flex-col gap-1 mb-3">
            <ContactTextArea
              v-model="inputs.message"
              :label="'Message'"
              :id="'message'"
              :required="true"
            />
          </div>
          <div class="flex flex-col mb-3">
            <span class="text-gray-400">* required fields</span>
          </div>
          <div class="flex flex-row items-center gap-3 mb-3">
            <input
              class="w-[20px] h-[20px] accent-gray-800"
              v-model="inputs.termscheck"
              type="checkbox"
              id="termscheck"
              name="termscheck"
            />

            <label class="text-gray-400" for="termscheck"
              >I agree to the
              <span class="text-white cursor-pointer"><u>Terms & Conditions</u></span></label
            >
          </div>

          <AlertMsg v-if="formSent" :msg="'Form sent! Thanks!'" class="bg-green-500" />

          <SubmitBtn
            v-if="!formSent"
            class="w-1/2 self-center sm:self-end"
            :formReadyToSend="formReadyToSend"
            :label="'Submit'"
            :formSent="formSent"
            @submitForm="sendForm"
          />
        </form>
        <div class="lg:w-1/2 lg:pr-[100px]">
          <GoogleMap class="w-full h-[450px] lg:h-[100%] border-none" :src="googleMapUrl" />
        </div>
      </div>
    </section>
  </main>
  <FooterSite />
</template>

<style>
.films-select .vs__dropdown-toggle,
.films-select .vs__dropdown-menu {
  background-color: #1f2937;
  border-color: #9ca3af;
  border-style: solid;
  border-width: 2px;
  background: #1f2937;
  color: #9ca3af;
}
.films-select .vs__dropdown-menu {
  border-top: 0;
}
.films-select .vs__dropdown-menu :hover {
  background: #9ca3af;
  color: #1f2937;
}
#termscheck {
  border: 1px solid #9ca3af;
  background: #1f2937;
}
#termscheck:not(:checked) {
  appearance: none;
}
#termscheck:checked {
  outline-color: #9ca3af;
  outline-style: solid;
  outline-width: 1px;
}
</style>
