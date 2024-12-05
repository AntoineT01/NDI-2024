<script setup lang="ts">
import Subtitle from "~/components/BaseSubtitle.vue";

</script>

<template>
  <div>
    <h1 class="hero-text">
      <span>First message</span>
      <span>Second message</span>
    </h1>
    <subtitle message="hero.subtitle" />
    <CustomAvatar class="mt-10" />
  </div>
</template>

<style lang="scss">
.hero-text {
  font-size: calc(1.8rem + 2vw);
  letter-spacing: -0.05em;
  font-weight: 600;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(90deg, #FFDEE9, #B5FFFC); /* Bleu vif et gris clair */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  align-items: center;
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
