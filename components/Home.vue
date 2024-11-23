<template>
    <!-- Contenu principal centré -->
    <el-main>
      <el-container class="center-content">
        <el-row justify="center" align="middle">
          <el-col :span="24" class="text-center">
            <Hero />
          </el-col>
          <HeroIllustration/>
        </el-row>
      </el-container>
      <PresentationSection/>
      <SkillsSection/>
    </el-main>

    <!-- Pied de page -->
    <el-footer>
      <BaseFooter />
    </el-footer>
</template>

<script setup>
import Hero from '~/components/Hero.vue';
import BaseFooter from "~/components/layouts/BaseFooter.vue";
import HeroIllustration from "~/components/HeroIllustration.vue";
import PresentationSection from "~/components/PresentationSection.vue";
</script>

<style scoped lang="scss">
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.el-main {
  padding: 0;
}
</style>
