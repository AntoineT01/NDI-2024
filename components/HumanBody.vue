<script setup lang="ts">
const display_lungs = ref(false)

const heart_clicked = function () {
  display_lungs.value = true
}
</script>

<template>
  <div class="human_container">
    <img src="~/assets/human_body/sketch_personnage.png" alt="Image d'un humain" class="human_body">
    <img src="~/assets/human_body/sketch_coeur.png" @click=heart_clicked alt="Image d'un coeur" class="human_heart">
    <img src="~/assets/human_body/sketch_poumons.png" v-if="display_lungs" alt="Image d'un poumon" class="human_lungs">
  </div>
</template>

<style scoped>
.human_container {
  position: relative;
  width: 500px; /* Correspond à la largeur de human_body */
  height: 500px; /* Correspond à la hauteur de human_body */
  margin: auto; /* Centre le conteneur dans la page */
}

.human_body {
  width: 100%; /* Prend toute la largeur du conteneur */
  height: 100%; /* Prend toute la hauteur du conteneur */
}

.human_lungs {
  position: absolute; /* Permet de positionner l'image par rapport au conteneur */
  top: 37%; /* Ajuste verticalement, en partant du haut */
  left: 57%; /* Ajuste horizontalement, en partant de la gauche */
  transform: translate(-50%, -50%); /* Centre l'image au niveau du point défini par top et left */
  width: 30%; /* Ajuste la taille du cœur (optionnel) */
  z-index: -1;
  height: auto; /* Conserve les proportions */
}

.human_heart {
  position: absolute; /* Permet de positionner l'image par rapport au conteneur */
  top: 39%; /* Ajuste verticalement, en partant du haut */
  left: 60%; /* Ajuste horizontalement, en partant de la gauche */
  transform: translate(-50%, -50%); /* Centre l'image au niveau du point défini par top et left */
  width: 10%; /* Ajuste la taille du cœur (optionnel) */
  height: auto; /* Conserve les proportions */
  z-index: 999;

  pointer-events: visible;
}

</style>
