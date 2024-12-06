<script setup lang="ts">
defineProps({
  name: String,
  src: String,
  alt: String,
  position: Object,
  size: String,
  visible: Boolean,
  zIndex: Number,
  onClick: Function,
});
</script>

<template>
  <img
      v-if="visible"
      :src="src"
      :alt="alt"
      :class="'human_' + name"
      :style="{
      top: position.top,
      left: position.left,
      width: size,
      zIndex,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    }"
      @click="onClick && onClick()"
  />
</template>

<style scoped>
img {
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

img:hover {
  transform: translate(-50%, -50%) scale(1.1) !important;
  filter: brightness(1.3);
}
</style>
