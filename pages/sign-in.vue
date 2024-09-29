<script setup lang="ts">
import {reactive, ref, onBeforeMount} from "vue";
import {useRouter} from 'vue-router';
import {useUserProfileStore} from "~/stores/userProfile";
import {useI18n} from 'vue-i18n'; // Importer i18n
import {loginUser} from "~/services/auth";
import {ElMessage, type FormInstance, type FormRules} from "element-plus";
import CredentialsCard from "~/components/authentication/CredentialsCard.vue";
import {User, Lock} from "@element-plus/icons-vue";

const {t} = useI18n(); // Accéder à la fonction de traduction
const router = useRouter();
const formRef = ref<FormInstance>();
const userProfileStore = useUserProfileStore();

onBeforeMount(() => {
  if (userProfileStore.isUserLoggedIn) {
    router.push({name: 'profile'});
  }
});

// État réactif pour le formulaire de connexion
const loginForm = reactive({
  email: '',
  password: ''
});

const loading = ref(false);

const login = async () => {
  loading.value = true;

  // Appel au service de connexion
  const response = await loginUser({
    email: loginForm.email,
    password: loginForm.password,
  });

  loading.value = false;

  if (!response.success) {
    ElMessage({
      message: response.message ? t(response.message) : t('sign_in.error_message'),
      type: 'error',
    });
    return;
  }

  ElMessage({
    message: t('sign_in.success_message'), // Message de succès traduit
    type: 'success',
  });

  // Mise à jour du profil utilisateur et redirection
  await userProfileStore.checkConnected();
  await router.push('/');
};

// Fonction pour détecter la touche "Entrée"
const onEnterKeyPressed = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    login();
  }
};

// Fonction de réinitialisation du mot de passe
const resetPassword = async () => {
  if (!loginForm.email) {
    ElMessage({
      message: t('sign_in.reset_password_warning'),
      type: 'warning',
    });
    return;
  }
  // TODO: Appel au service de réinitialisation du mot de passe
};

// Fonction pour aller à la page d'inscription
const goToSignUp = () => {
  router.push({name: 'sign-up'});
};

interface RuleForm {
  email: string;
  password: string;
}

const rules = reactive<FormRules<RuleForm>>({
  email: [
    {required: true, message: t('form.email_required'), trigger: 'blur'},
    {type: 'email', message: t('form.email_invalid'), trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: t('form.password_required'), trigger: 'blur'},
  ],
});
</script>

<template>
  <div>
    <CredentialsCard v-loading="loading">
      <BaseTitle>{{ t('sign_in.title') }}</BaseTitle>
<!--      <el-text class="sign-in-title"><h2>{{ // t('sign_in.title') }}</h2></el-text>-->
      <el-form
          ref="formRef"
          style="margin-top: 10px;"
          :model="loginForm"
          class="login-form"
          :rules="rules"
          size="large"
          @keyup="onEnterKeyPressed"
      >
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" :placeholder="t('form.email')" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              :placeholder="t('form.password')"
              :prefix-icon="Lock"
              show-password
          />
        </el-form-item>
        <el-col :span="24">
          <el-form-item style="text-align: center;">
            <el-button w-full type="primary" @click="login" plain>{{ t('sign_in.submit_button') }}</el-button>
          </el-form-item>
        </el-col>
        <p class="mt-12">{{ t('sign_in.forgot_password') }}
          <el-link pl-1 pb-1 type="primary" @click="resetPassword">{{ t('sign_in.reset_password_link') }}</el-link>
        </p>
      </el-form>
    </CredentialsCard>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  width: 350px;
  margin: auto;
}

@media (max-width: 500px) {
  .login-form {
    width: 90%;
  }
}

.center-button {
  display: flex;
  justify-content: center;
}
</style>
