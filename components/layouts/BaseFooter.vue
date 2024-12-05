<script setup lang="ts">
const githubUrl = "https://github.com/Flintpop";
const linkedinUrl = "https://www.linkedin.com/in/tanguy-le-goff/";
const emailUrl = "mailto:tanguy.legoff2@gmail.com";
</script>

<template>
  <div class="footer">
    <el-col class="footer-items">
      <el-row justify="center">
        <p>
          Footer main
        </p>
      </el-row>
      <el-row justify="center" :gutter="50" mt-6 mb-6>
        <BaseFooterIcon :url="linkedinUrl" class="footer-icon">
          <i class="fab fa-linkedin-in"></i>
        </BaseFooterIcon>
        <BaseFooterIcon :url="githubUrl" class="footer-icon">
          <i class="fab fa-github"></i>
        </BaseFooterIcon>
        <BaseFooterIcon :url="emailUrl" class="footer-icon">
          <i class="fa-solid fa-envelope"/>
        </BaseFooterIcon>
      </el-row>
      <el-row justify="center">
        <p>
          Fait par
        </p>
      </el-row>
      <el-row justify="center">
        <p>
          Hey
        </p>
        <img src="/nuxt_logo2.svg" class="nuxt-logo" alt="nuxt logo">
      </el-row>
    </el-col>
  </div>
</template>

<style scoped lang="scss">
.footer {
  background-color: var(--el-color-primary);
  color: white;
  text-align: center;
  font-size: 20px;
  align-items: center;
  margin: 2rem 0;
  padding: 5rem 0;
}

.footer-items {
  width: 300px;
  margin: 0 auto;
}

.footer-icon {
  margin-right: 20px;
}

.footer-icon:last-child {
  margin-right: 0;
}

.nuxt-logo {
  width: 100px;
}
</style>