<template>
  <div class="credentials-card-container">
    <el-card shadow="always">
      <slot/>
    </el-card>
  </div>
</template>

<style scoped>
.credentials-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

@media (max-width: 500px) {
  .credentials-card-container {
    width: 90%;
    margin: auto;
  }
}
</style>