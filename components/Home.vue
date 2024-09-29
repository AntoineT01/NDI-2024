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
      <!-- Section de tarification centrée -->
      <el-container class="pricing-template center-content">
        <el-row justify="center">
          <el-col :span="24" class="text-center">
            <PricingTemplate />
          </el-col>
        </el-row>
      </el-container>
    </el-main>

    <!-- Pied de page -->
    <el-footer>
      <BaseFooter />
    </el-footer>
</template>

<script setup>
import Hero from '~/components/Hero.vue';
import PricingTemplate from '~/components/PricingTemplate.vue';
import BaseHeader from "~/components/layouts/BaseHeader.vue";
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

.pricing-template {
  margin-top: 100vh;
}

.full-height-row {
  height: calc(50vh); /* Hauteur de la fenêtre moins l'en-tête et le pied de page */
}
</style>
