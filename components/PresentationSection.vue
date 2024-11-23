<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const years = new Date().getFullYear() - 2019; // Par exemple, démarrage en 2019
</script>

<template>
  <div class="presentation-section">
    <div class="presentation-section-text">
      <p class="primary-text">
        {{ t('presentation_section.title') }}
      </p>
      <p>
        {{ t('presentation_section.text', { years }) }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.presentation-section {
  background-color: var(--el-color-primary);
  width: 100%;
}

.presentation-section-text {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  width: 40%;
  padding: 9rem 0;
  margin: 0 auto;
  line-height: 1.5;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  align-items: center;
}

@media (max-width: 1024px) {
  .presentation-section-text {
    width: 80%;
    padding: 7rem 0;
  }
}

@media(max-width: 768px) {
  .presentation-section-text {
    width: 90%;
    padding: 5rem 0;
    font-size: 1.25rem;
  }
}

::v-deep(.el-input__wrapper) {
  --el-main-padding: 0;
}

.primary-text {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
}
</style>