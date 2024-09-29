<script setup lang="ts">
import {reactive, ref, onMounted} from "vue";
import {ElForm, ElMessage, type FormRules} from "element-plus";
import CredentialsCard from "~/components/authentication/CredentialsCard.vue";
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const router = useRouter();
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const isMounted = ref(false);

const userProfileStore = useUserProfileStore();

onBeforeMount(() => {
  if (!userProfileStore.isUserLoggedIn) {
    router.push('/');
  }
});

onMounted(() => {
  isMounted.value = true;
});

const registerForm = reactive({
  email: '',
  password: '',
  passwordConfirmed: ''
});

const register = async () => {
  if (formRef.value) {
    formRef.value.validate(async (valid: boolean) => {
      if (!valid) {
        ElMessage({
          message: t('register.form_error'),
          type: 'warning',
        });
        return;
      }

      loading.value = true;

      const response = await registerUser({
        email: registerForm.email,
        password: registerForm.password,
        locale: 'fr',
      });

      loading.value = false;

      if (!response.success) {
        ElMessage({
          message: t(response.message || 'register.failed_message'),
          type: 'error',
        });
        return;
      }

      ElMessage({
        message: t('register.success_message'),
        type: 'success',
      });

      await router.push({name: 'sign-in'});
    });
  }
};

interface RuleForm {
  email: string;
  password: string;
  passwordConfirmed: string;
}

const rules = reactive<FormRules<RuleForm>>({
  email: [
    {required: true, message: t('form.email_required'), trigger: 'blur'},
    {type: 'email', message: t('form.email_invalid'), trigger: ['blur', 'change']},
  ],
  password: [
    {required: true, message: t('form.password_required'), trigger: 'blur'},
    {min: 6, message: t('form.password_min_length'), trigger: 'blur'},
  ],
  passwordConfirmed: [
    {required: true, message: t('form.confirm_password_required'), trigger: 'blur'},
    {
      validator: (_, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error(t('form.password_mismatch')));
        } else {
          callback();
        }
      }, trigger: 'blur'
    },
  ],
});

const loading = ref(false);

import {User, Lock} from "@element-plus/icons-vue";
import {registerUser} from "~/services/auth";
import BaseTitle from "~/components/BaseTitle.vue";

const onEnterKeyPressed = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    register();
  }
};
</script>

<template>
  <div>
    <CredentialsCard v-loading="loading">
      <BaseTitle>{{ t('register.title') }}</BaseTitle>
      <el-form v-if="isMounted" ref="formRef" :rules="rules" :model="registerForm" class="login-form" size="large"
               @keyup="onEnterKeyPressed"
               style="margin-top: 10px"
      >
        <el-form-item prop="mail">
          <el-input v-model="registerForm.email" :placeholder="t('form.email')" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="registerForm.password"
              type="password"
              :placeholder="t('form.password')"
              :prefix-icon="Lock"
              show-password
          />
        </el-form-item>
        <el-form-item prop="passwordConfirmed">
          <el-input
              v-model="registerForm.passwordConfirmed"
              type="password"
              :placeholder="t('form.confirm_password')"
              :prefix-icon="Lock"
              show-password
          />
        </el-form-item>
        <el-col :span="24">
          <el-form-item style="text-align: center;">
            <el-button w-full type="primary" @click="register" plain>{{ t('register.submit_button') }}</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </CredentialsCard>
  </div>
</template>

<style scoped>
.login-form {
  width: 350px;
  margin: auto;
}

@media (max-width: 500px) {
  .login-form {
    width: 90%;
  }
}
</style>
