<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserProfileStore } from "~/stores/userProfile";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from "element-plus";
import { Comment } from "@element-plus/icons-vue";
import {logOut} from "~/services/auth";

const userProfileStore = useUserProfileStore();
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


onMounted(async () => {
  await userProfileStore.checkConnected();
});

async function logOutClick() {
  try {
    await ElMessageBox.confirm(
        t('header.log_out_confirm'),
        t('header.warning'),
        {
          confirmButtonText: t('form.submit'),
          cancelButtonText: t('form.cancel'),
          type: 'warning',
        }
    );
    await logOut();
    ElMessage.success(t('log_out.success'));
    await userProfileStore.checkConnected();
    await router.push('/');
  } catch {
    ElMessage({
      type: 'info',
      message: t('header.log_out_canceled'),
    });
  }
}

function navigateTo(route: string) {
  router.push(route);
}
</script>

<template>
  <el-menu mode="horizontal">
    <el-menu-item index="0">
      <NuxtLink to="/" style="display: flex; align-items: center;" class="link">
        <img style="width: 40px; margin-right: 10px;" src="~/assets/vue.svg" alt="logo" />Template
      </NuxtLink>
    </el-menu-item>

    <el-menu-item v-if="!userProfileStore.isUserLoggedIn" index="1" @click="navigateTo('/sign-in')">
      {{ t('header.sign_in') }}
    </el-menu-item>
    <el-menu-item v-if="userProfileStore.isUserLoggedIn" index="2" @click="navigateTo('/sign-up')">
      {{ t('header.sign_up') }}
    </el-menu-item>
    <el-menu-item v-if="userProfileStore.isUserLoggedIn" index="3" @click="navigateTo('/profile')">
      {{ t('header.profile') }}
    </el-menu-item>
    <el-menu-item v-if="userProfileStore.isUserLoggedIn" index="4" @click="logOutClick">
      {{ t('header.log_out') }}
    </el-menu-item>

    <el-menu-item index="5" @click="navigateTo('/contact')">
      {{ t('header.contact') }}
    </el-menu-item>

    <!-- Dropdown pour changer la langue avec une icône langue -->
    <el-menu-item index="6">
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
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
