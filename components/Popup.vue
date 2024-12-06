<template>
    <div class="relative"></div>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center bg-blue-500">
        <div class="bg-white border-1 border-black rounded-lg shadow-lg text-right flex-column w-1/2">
          <div class="bg-white border-1 border-black rounded-lg p-4 shadow-lg w-full text-right flex flex-row h-[400px]">
            <div class = "w-1/2 h-[350px]">
              <img class = "text-center border-4 border-black rounded-lg w-full h-full" :src="src">
            </div>
            <div class = "w-1/2">
              <br>
              <br>
              <h2 class="text-4xl font-bold mb-4 text-center underline ml-12 text-black"> {{ title }} </h2>
              <br>
              <p class="mb-4 text-black text-left ml-12"> {{ description }} </p>
            </div>
            <div>
              <button @click="close" class=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-white"> <p> X </p> </button>
            </div>
          </div>
          <div class = "bg-white border-1 border-black rounded-lg p-4 shadow-lg w-full text-left text-black">
            <p class = "ml-8 underline"> {{ fluidTitle }} </p>
            <br>
            <p class = "ml-8"> - {{ text }} </p>
            <br>
            <p class = "ml-8"> - {{ extraInfo }} </p>
          </div>
        </div>
        <div v-if="isPopupClosed" class="mt-10 p-6 bg-red-200 rounded-full shadow-lg text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <p class="text-xl font-semibold text-red-600">Coupe !</p>
        </div>
      </div>
  </template>
  
  <script setup>

import { defineProps, ref } from 'vue'

// Définition des props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  fluidTitle: {
    type: String,
    default: 'Circulation fluide'
  },
  fluidText: {
    type: Array,
    default: () => []
  },
  extraInfo: {
    type: String,
    default: ''
  }
})

// Variables d'état
const isPopupOpen = ref(true)
const isPopupClosed = ref(false)

const emit = defineEmits()
// Fonction pour fermer le pop-up
const close = () => {
  emit('close') // Émet l'événement pour fermer la modal dans le parent
}
  </script>
  
  <style scoped>
  /* Styles optionnels pour le modal */
  </style>
  