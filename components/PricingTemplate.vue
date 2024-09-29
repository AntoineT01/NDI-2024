<script setup lang="ts">
import PricingUnit from "~/components/PricingUnit.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const buyBasic = () => {
};

const buyPremium = () => {
};

const buyUltimate = () => {
};
</script>

<template>
  <h1 class="hero-text">{{ t('pricing.title') }}</h1> <!-- Titre traduit -->
  <div class="price-cards-wrapper price-cards">
    <!-- Utilisation des traductions pour les titres des plans -->
    <PricingUnit :price="50" :title="t('pricing.basic')" :buyCallback="buyBasic"></PricingUnit>
    <PricingUnit :price="100" :title="t('pricing.premium')" :buyCallback="buyPremium"></PricingUnit>
    <PricingUnit :price="150" :title="t('pricing.ultimate')" :buyCallback="buyUltimate"></PricingUnit>
  </div>
</template>

<style scoped>
.price-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

</style>
