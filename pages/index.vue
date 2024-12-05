
<template>
  <div class="container mx-auto px-4 py-8">
    <button @click="clicked">test</button>
    <popuptest v-if="affiche"/>
    <img src="~/public/sketch_peau.jpg"  @click="clicked">
  </div>
</template>

<script setup lang="ts">
// Aucune logique spécifique n'est nécessaire pour l'instant
import  popuptest from '~/components/popuptest.vue'
const affiche=ref(false)
const deaffiche=ref(0)
function clicked(){
  affiche.value=true
  
  if(deaffiche.value==1){
    affiche.value=false
    deaffiche.value=0  
  }
  else{
    deaffiche.value=1
  }
  

}


</script>
