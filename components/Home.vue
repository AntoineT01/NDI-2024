<template>
    <!-- Contenu principal centré -->
    <el-main>
      <el-container class="center-content">
        <el-row justify="center" align="middle" class="full-height-row">
          <el-col :span="24" class="text-center">
            <Hero />
          </el-col>
        </el-row>
      </el-container>
      <div style="height: 50vh"></div>
    </el-main>

    <!-- Pied de page -->
    <el-footer>
      <BaseFooter />
    </el-footer>
</template>

<script setup>
import Hero from '~/components/Hero.vue';
import BaseFooter from "~/components/layouts/BaseFooter.vue";
</script>

<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%; /* S'assure que le contenu est centré verticalement */
}

.full-height-row {
  height: calc(50vh); /* Hauteur de la fenêtre moins l'en-tête et le pied de page */
}
</style>
