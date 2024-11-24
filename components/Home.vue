<template>
    <!-- Contenu principal centré -->
    <el-main>
      <el-container class="center-content">
        <el-row justify="center" align="middle">
          <el-col :span="24" class="text-center">
            <Hero />
          </el-col>
          <HeroIllustration/>
          <PresentationSection/>
          <SkillsSection/>
        </el-row>
      </el-container>
    </el-main>
</template>

<script setup>
import Hero from '~/components/Hero.vue';
import HeroIllustration from "~/components/HeroIllustration.vue";
import PresentationSection from "~/components/PresentationSection.vue";
</script>

<style scoped lang="scss">
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.el-main {
  padding: 0;
}
</style>
