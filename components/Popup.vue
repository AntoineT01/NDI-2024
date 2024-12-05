<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center bg-blue-500">
      <div class="bg-white border-1 border-black rounded-lg shadow-lg text-right flex-column w-1/2">
        <div class="bg-white border-1 border-black rounded-lg p-4 shadow-lg w-full text-right flex flex-row h-[400px]">
          <div class = "">
            <img class = "text-center border-4 border-black rounded-lg object-contain" src = "~/assets/images/coeur.png">
          </div>
          <div class = "w-1/4">
            <br>
            <br>
            <h2 class="text-xl font-bold mb-4 text-center underline"> Coeur : </h2>
            <br>
            <p class="mb-4 text-black text-left"> Le cœur est un organe vital situé dans la poitrine, légèrement à gauche du centre du thorax. 
            Il joue un rôle fondamental dans la circulation sanguine, agissant comme une pompe pour faire circuler le sang dans tout le corps. </p>
         </div>
          <div>
            <button @click="close" class=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-white">
              <p> X </p>
            </button>
          </div>
        </div>
        <div class = "bg-white border-1 border-black rounded-lg p-4 shadow-lg w-full text-left text-black">
          <p class = "ml-8"> Circulation fluide : </p>
          <br>
          <p class = "ml-8"> - Être humain : Le sang circule dans le corps via le système cardiovasculaire, transportant l’oxygène, les nutriments, et les déchets. </p>
          <br>
          <p class = "ml-8"> - Océan : Les courants marins agissent comme un système circulatoire, transportant la chaleur, les nutriments, et les gaz dissous à travers le globe. </p>
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
  