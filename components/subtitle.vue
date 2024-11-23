<script setup lang="ts">
const t = useI18n().t;

defineProps(
  {
    message: {
      type: String,
      required: true,
    },
  }
);
</script>

<template>
    <h2 class="subtitle">{{ t(message) }}</h2>
</template>

<style lang="scss" scoped>
.subtitle {
  font-weight: 400;
  color: var(--ep-color-primary);
}
</style>