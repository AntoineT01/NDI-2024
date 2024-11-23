<script setup lang="ts">

</script>

<template>
  <el-button size="large" class="primary-animated-button"><slot></slot></el-button>
</template>

<style lang="scss" scoped>
.primary-animated-button {
  background: var(--el-color-primary);
  color: var(--el-color-white);
  border-radius: 32px;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
}

.primary-animated-button:hover {
  color: white;
}

.primary-animated-button:after {
  content: "";
  background: black;
  position: absolute;
  top: 0;
  bottom: 0;
  transform: skewX(-45deg) scale(0, 1);
  transition: all 0.5s;
}

.primary-animated-button:hover:after {
  transform: skewX(-45deg) scale(1, 1);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
</style>