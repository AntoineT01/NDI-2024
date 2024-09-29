<script setup lang="ts">
import { useI18n } from 'vue-i18n'; // Importer la fonction t pour la traduction

interface Props {
  price: number;
  title: string;
  buyCallback: () => {};
}

const props = defineProps<Props>();
const { t } = useI18n(); // Utiliser t pour traduire

// Fonction d'achat
const buy = () => {
  props.buyCallback(); // Exécuter le callback d'achat
  alert(t('pricing.bought', { price: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(props.price) }));
};
</script>

<template>
  <el-card class="pricing-card" style="min-width: 140px" shadow="hover">
    <h2 mt-0 color="$ep-color-primary">{{ title }}</h2>
    <!-- Formatage du prix avec une devise -->
    <h3 mb-10 mt-0>{{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price) }}</h3>

    <!-- Bouton traduit pour acheter -->
    <el-button @click="buy" plain>{{ t('pricing.buy_button') }}</el-button>
  </el-card>
</template>

<style lang="scss" scoped>
.pricing-card {
  min-width: 140px;
}
.pricing-card:hover {
  scale: 1.1;
}
</style>
