<script setup lang="ts">
</script>

<template>
  <div class="human_container">
    <img src="~/assets/human_body/sketch_personnage.png" alt="Image d'un humain" class="human_body">
    <img src="~/assets/human_body/sketch_coeur.png" alt="Image d'un coeur" class="human_heart">
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

.human_heart {
  position: absolute; /* Permet de positionner l'image par rapport au conteneur */
  top: 38%; /* Ajuste verticalement, en partant du haut */
  left: 62%; /* Ajuste horizontalement, en partant de la gauche */
  transform: translate(-50%, -50%); /* Centre l'image au niveau du point défini par top et left */
  width: 10%; /* Ajuste la taille du cœur (optionnel) */
  height: auto; /* Conserve les proportions */
}
</style>
