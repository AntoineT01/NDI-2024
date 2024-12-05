<template>
  <el-row :gutter="30" class="cards_section" justify="center" type="flex">
    <el-col
        v-for="(skill, index) in skills"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
    >
      <SkillsCards class="skills_card">
        <BaseIcon :icon_class="skill.icon"></BaseIcon>
        <h2>SKills</h2>
        <p>Sous titre</p>
        <p class="strong-primary-text"><strong>Primaire</strong></p>
        <p>Section 1</p>
        <p class="strong-primary-text"><strong>Text</strong></p>
        <p>
          Items
          <br>
          Items
        </p>
      </SkillsCards>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import SkillsCards from "~/components/SkillsCards.vue";
import BaseIcon from "~/components/BaseIcon.vue";

// Structure des compétences pour simplifier le template
const skills = [
  {
    icon: "fa-solid fa-code",
    title: "skills_section.title.web_dev",
    subtitle: "skills_section.subtitle.web_dev",
    bold_section1: "skills_section.bold_section1.web_dev",
    section1: "skills_section.section1.web_dev",
    bold_section2: "skills_section.bold_section2.web_dev",
    section2: "skills_section.section2.web_dev"
  },
  {
    icon: "fa-solid fa-chalkboard-user",
    title: "skills_section.title.consultant",
    subtitle: "skills_section.subtitle.consultant",
    bold_section1: "skills_section.bold_section1.consultant",
    section1: "skills_section.section1.consultant",
    bold_section2: "skills_section.bold_section2.consultant",
    section2: "skills_section.section2.consultant"
  }
];
</script>

<style scoped lang="scss">
.cards_section {
  width: 100%;
  margin-top: -50px;
}

.strong-primary-text {
  color: var(--el-color-primary);
  margin-top: 3rem;
}

/* Styles pour les petites cartes */
@media (max-width: 768px) {
  .skills_cards {
    padding: 2rem;
    font-size: 1.2rem;
  }

  .icon-circle {
    width: 5rem;
    height: 5rem;
    font-size: 2.5rem;
  }
}

/* Assurer que toutes les cartes ont la même hauteur */
.el-col {
  display: flex;
}

.skills_card {
  flex: 1;
}
</style>
