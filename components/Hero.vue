<script setup lang="ts">
const t = useI18n().t;

</script>

<template>
  <div class="hero">
    <h1 class="hero-text">
      <span>{{ t('hero.title.first_part') }}</span>
      <span>{{ t('hero.title.second_part') }}</span>
    </h1>
  </div>
</template>

<style lang="scss">
.hero {
  height: 100%;
}

.hero-text {
  font-size: calc(2.2rem + 2vw);
  font-weight: 600;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(90deg, #FFDEE9, #B5FFFC); /* Bleu vif et gris clair */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

html.dark .hero-text {
  //background: linear-gradient(90deg, #2193b0, #6dd5ed);
  //background: linear-gradient(90deg, #2C3E50, #4CA1AF);
  background: linear-gradient(90deg, #141E30, #243B55);


  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>
