<script setup lang="ts">
import BaseHeader from "~/components/layouts/BaseHeader.vue";
import BaseFooter from "~/components/layouts/BaseFooter.vue";
</script>

<template>
  <div>
    <el-header>
      <BaseHeader/>
    </el-header>
    <slot/>
    <el-footer>
      <BaseFooter/>
    </el-footer>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-footer) {
  --el-footer-padding: 0;
}
</style>