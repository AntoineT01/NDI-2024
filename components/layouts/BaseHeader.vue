<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { Comment } from "@element-plus/icons-vue";

const router = useRouter();
const { t, locale } = useI18n();

// Langues disponibles dans l'application
const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' }
];


// Initialiser le cookie pour mémoriser la langue choisie
const languageCookie = useCookie('i18n_redirected');

// Fonction pour changer la langue et mettre à jour le cookie
function changeLanguage(lang: string) {
  locale.value = lang; // Mettre à jour la langue actuelle
  languageCookie.value = lang; // Mettre à jour le cookie
}

function navigateTo(route: string) {
  router.push(route);
}
</script>

<template>
  <el-menu mode="horizontal">
    <NuxtLink to="/" style="margin-right: auto">
      <el-menu-item index="0" style="display: flex; align-items: center;" class="link">
          <img style="width:150px; margin-right: 10px;" src="/logo_tanguy_v1.png" alt="website logo" />
      </el-menu-item>
    </NuxtLink>

    <el-menu-item index="1" @click="navigateTo('/contact')">
      {{ t('header.contact') }}
    </el-menu-item>

    <!-- Dropdown pour changer la langue avec une icône langue -->
    <el-menu-item index="2">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><Comment /></el-icon> <!-- Icône de langue -->
          {{ t('header.language') }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
                v-for="lang in languages"
                :key="lang.value"
                @click="changeLanguage(lang.value)"
            >
              {{ lang.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  font-size: 16px;
}
//.el-menu--horizontal > .NuxtLink:nth-child(1) {
//  margin-right: auto;
//}
</style>
