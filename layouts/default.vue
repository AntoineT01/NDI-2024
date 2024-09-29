<script setup lang="ts">
import BaseHeader from "~/components/layouts/BaseHeader.vue";
</script>

<template>
  <div>
    <el-header>
      <BaseHeader/>
    </el-header>
    <slot/>
  </div>
</template>