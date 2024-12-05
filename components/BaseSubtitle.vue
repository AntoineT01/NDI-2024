<script setup lang="ts">

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
    <h2 class="subtitle">Message</h2>
</template>

<style lang="scss" scoped>
.subtitle {
  font-weight: 400;
  color: var(--ep-color-primary);
}
</style>