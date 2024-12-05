<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 border-1 border-black rounded-lg p-4 shadow-lg max-w-sm w-full text-right w-1000 bg-blue-500">
        <button @click="close" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-white">
          <p> X </p>
        </button>
        <div class = "p-12">

        <h2 class="text-xl font-bold mb-4 text-center underline">Titre</h2>
        <img class = "text-center border-4 border-black rounded-lg p-12" src = "~/assets/images/sketch_coeur.png">
        <br>
        <p class="mb-4 text-black text-left">Ceci est un exemple de pop-up avec Vue 3 et Tailwind CSS.</p>
        <!-- Bouton pour fermer la modal -->
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits()
  
  const close = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  /* Styles optionnels pour le modal */
  </style>
  