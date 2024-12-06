
<template>
  <div class="container mx-auto px-4 py-8">
    
    
    <img src="~/assets/images/coeur.png"  @click="isComponentVisible = true">
    <Popup v-model="isComponentVisible" />
  </div>
</template>

<script>
// Aucune logique spécifique n'est nécessaire pour l'instant
import  Popup from '~/components/Popup.vue'



export default {
  components: {
    Popup,
  },
  data() {
    return {
      isComponentVisible: false, // Tracks open/close state
    };
  },
};



</script>
