<script setup lang="ts">
const display_heart = ref(true)
const display_lungs = ref(false)
const display_skin = ref(false)

const heart_clicked = function () {
  display_lungs.value = true
}

const lungs_clicked = function () {
  display_skin.value = true
}

const skin_clicked = function () {
  display_skin.value = true
}
</script>

<template>
  <div class="human_container">
    <img src="~/assets/human_body/sketch_personnage.png" alt="Image d'un humain" class="human_body">
    <img src="~/assets/human_body/sketch_coeur.png" @click=heart_clicked alt="Image d'un coeur" class="human_heart">
    <img src="~/assets/human_body/sketch_poumons.png" @click="lungs_clicked" v-if="display_lungs" alt="Image d'un poumon" class="human_lungs">
    <img src="~/assets/human_body/sketch_peau.png" v-if="display_skin" alt="Image d'une peau" class="human_skin">
  </div>
</template>

<style scoped>
.human_container {
  position: relative;
  width: 800px;
  height: auto;
  margin: auto;
}

.human_body {
  width: 100%;
  height: 100%;
}

.human_lungs {
  position: absolute;
  top: 37%;
  left: 57%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: auto;
  cursor: pointer;
}

.human_heart {
  position: absolute; /* Permet de positionner l'image par rapport au conteneur */
  top: 39%; /* Ajuste verticalement, en partant du haut */
  left: 60%; /* Ajuste horizontalement, en partant de la gauche */
  transform: translate(-50%, -50%); /* Centre l'image au niveau du point défini par top et left */
  width: 10%; /* Ajuste la taille du cœur (optionnel) */
  height: auto; /* Conserve les proportions */
  z-index: 999;
  cursor: pointer;
}
.human_skin {
  position: absolute;
  top: 64%; /* Ajuste verticalement, en partant du haut */
  left: 75%; /* Ajuste horizontalement, en partant de la gauche */
  transform: translate(-50%, -50%); /* Centre l'image au niveau du point défini par top et left */
  width: 14%; /* Ajuste la taille du cœur (optionnel) */
  height: auto; /* Conserve les proportions */
  z-index: 999;
  cursor: pointer;
}
</style>
