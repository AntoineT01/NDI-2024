<script setup lang="ts">
const t = useI18n().t;

const msg = t('hero.title');
</script>

<template>
  <div class="hero">
    <Logos my="4"/>
    <h1 class="hero-text">{{ msg }}</h1>
  </div>
</template>

<style lang="scss">
.hero {
  height: 100%;
}

.hero-text {
  font-size: calc(3rem + 1.5vw);
  font-weight: 700;
  margin-top: 1rem;
  background: linear-gradient(90deg, #00aaff, #d3d3d3); /* Bleu vif et gris clair */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

html.dark .hero-text {
  background: linear-gradient(90deg, #00aaff, #d3d3d3); /* Gardez le même gradient pour le thème sombre */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>