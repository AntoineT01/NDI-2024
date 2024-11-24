<script setup lang="ts">
const props = defineProps(
    {
        icon_class: String,
    }
);

const final_icon_class = computed(() => {
    return props.icon_class + ' icon-circle';
});
</script>

<template>
    <i :class="final_icon_class"></i>
</template>

<style scoped lang="scss">
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