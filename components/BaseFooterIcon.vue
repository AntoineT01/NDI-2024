<script setup lang="ts">

const props = defineProps<{
  url: string;
}>();
</script>

<template>
  <a :href="props.url" target="_blank">
    <el-button type="danger" size="large" circle>
      <slot></slot>
    </el-button>
  </a>
</template>