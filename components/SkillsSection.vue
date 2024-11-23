<script setup lang="ts">

import SkillsCards from "~/components/SkillsCards.vue";
</script>

<template>
<el-row :gutter="30" class="cards_section" justify="center">
  <el-col :span="6">
<!--    <SkillsCards>-->
<!--      <i class="fa-solid fa-code icon-circle"></i>-->
<!--      <h2>Fullstack web developer</h2>-->
<!--    </SkillsCards>-->
  </el-col>
  <el-col :span="6">
<!--    <SkillsCards>-->
<!--      sfda-->
<!--    </SkillsCards>-->
  </el-col>
</el-row>
</template>

<style scoped lang="scss">
.cards_section {
  width: 100%;
  margin-top: -50px;
}

.icon-circle {
  display: inline-flex; /* Centrer le contenu */
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  background-color: red; /* Couleur de fond */
  color: white; /* Couleur de l'icône */
  border-radius: 50%; /* Cercle parfait */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optionnel : ombre pour l'effet */
}
</style>