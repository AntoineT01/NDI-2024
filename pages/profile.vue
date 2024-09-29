<script setup lang="ts">
import { onMounted, reactive, ref, onBeforeMount } from "vue";
import { ElMessage, type FormRules, type FormInstance } from 'element-plus';
import { useUserProfileStore } from "~/stores/userProfile";
import {useI18n} from 'vue-i18n';
import {loginUser, updatePassword} from "~/services/auth"; // Importer useI18n pour accéder à la fonction t

const { t } = useI18n(); // Utiliser t pour récupérer les traductions

onBeforeMount(() => {
  if (!userProfileStore.isUserLoggedIn) {
    router.push({ name: 'sign-in' });
  }
});

const loading_save_profile = ref(false);
const loading_save_password = ref(false);

const userProfileStore = useUserProfileStore();
const profileForm = reactive({
  id: '',
  email: '',
  firstname: '',
  lastname: '',
  locale: '',
});

onMounted(async () => {
  await userProfileStore.checkConnected();
  profileForm.email = userProfileStore.email;
  profileForm.firstname = userProfileStore.firstname;
  profileForm.lastname = userProfileStore.lastname;
  profileForm.locale = userProfileStore.locale;
  profileForm.id = userProfileStore.id;
});

// Modèle de formulaire pour le changement de mot de passe
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});

const profileFormRef = ref<FormInstance>();
const passwordFormRef = ref<FormInstance>();

// Règles de validation pour le formulaire de profil
const profileRules = reactive<FormRules>({
  mail: [
    { required: true, message: t('form.email_required'), trigger: 'blur' },
    { type: 'email', message: t('form.email_invalid'), trigger: ['blur', 'change'] },
  ],
});

// Règles de validation pour le formulaire de changement de mot de passe
const passwordRules = reactive<FormRules>({
  currentPassword: [
    { required: true, message: t('form.current_password_required'), trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: t('form.new_password_required'), trigger: 'blur' },
    { min: 6, message: t('form.password_min_length'), trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: t('form.confirm_password_required'), trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error(t('form.password_mismatch')));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
});

// Fonction pour sauvegarder les modifications du profil
const saveProfile = async () => {
  if (!profileFormRef.value) return;

  loading_save_profile.value = true;
  await profileFormRef.value.validate(async (valid) => {
    if (valid) {
      // Logique pour sauvegarder les modifications du profil
      try {
        await userProfileStore.updateProfile(profileForm);
        ElMessage.success(t('profile.save_success'));
      } catch (error) {
        ElMessage.error(t('profile.save_failed'));
      }
    } else {
      console.log('Profile form validation failed');
    }
  });
  loading_save_profile.value = false;
};

// Fonction pour changer le mot de passe
const changePassword = async () => {
  if (!passwordFormRef.value) return;

  loading_save_password.value = true;
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      // Vérifier le mot de passe actuel
      try {
        await loginUser({email: userProfileStore.email, password: passwordForm.currentPassword});
      } catch (error: any) {
        ElMessage.error(t('password.current_password_incorrect'));
        loading_save_password.value = false;
        return;
      }

      try {
        // Modifier le mot de passe
        await updatePassword(userProfileStore.email, passwordForm.newPassword);
        ElMessage.success(t('password.change_success'));

        // Réinitialiser le formulaire de mot de passe
        passwordForm.currentPassword = '';
        passwordForm.newPassword = '';
        passwordForm.confirmNewPassword = '';

      } catch (error) {
        ElMessage.error(t('password.change_failed'));
      }
    } else {
      console.log('Password form validation failed');
    }
  });
  loading_save_password.value = false;
};
</script>

<template>
  <div class="mt-24">
    <el-card class="box-card">
      <h2 class="mb-12">{{ t('profile.title') }}</h2>
      <el-form ref="profileFormRef" :model="profileForm" :rules="profileRules" size="large" label-width="auto">
        <el-form-item :label="t('form.email')" label-position="top" prop="email">
          <el-input v-model="profileForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item :label="t('form.firstname')" label-position="top" prop="firstname">
          <el-input v-model="profileForm.firstname"></el-input>
        </el-form-item>
        <el-form-item :label="t('form.lastname')" label-position="top" prop="lastname">
          <el-input v-model="profileForm.lastname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button w-full type="primary" :loading="loading_save_profile" @click="saveProfile">{{ t('profile.save_button') }}</el-button>
        </el-form-item>
      </el-form>

      <el-divider/>

      <h2 class="mb-12">{{ t('password.change_title') }}</h2>
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" size="large" label-width="auto">
        <el-form-item :label="t('password.current_password')" label-position="top" prop="currentPassword">
          <el-input v-model="passwordForm.currentPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item :label="t('password.new_password')" label-position="top" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item :label="t('password.confirm_new_password')" label-position="top" prop="confirmNewPassword">
          <el-input v-model="passwordForm.confirmNewPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button w-full type="primary" :loading="loading_save_password" @click="changePassword">{{ t('password.change_button') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  width: 400px;
  margin: auto;
}

@media (max-width: 560px) {
  .box-card {
    width: 90%;
  }
}
</style>
