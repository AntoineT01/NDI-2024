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

.human_bone {
  transform: translate(-50%, -50%) rotate(-3deg) scale(0.95) !important; /* Rotation initiale */
}

.human_bone:hover {
  transform: translate(-50%, -50%) rotate(-3deg) scale(1.07) !important; /* Rotation initiale */
  filter: brightness(1.15);
}

</style>
