<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, ElForm, ElMessageBox } from 'element-plus';
import type { FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import {type ContactFormData, sendContactForm} from "~/services/contact";

const { t } = useI18n();

const contactForm: ContactFormData = reactive({
  email: '',
  name: '',
  message: '',
});

const email_required = ref('form.email_required');
const email_invalid = ref('form.email_invalid');
const form_message_required = ref('form.message_required');

const contactRules: FormRules = {
  email: [
    { required: true, message: t(email_required.value), trigger: 'blur' },
    { type: 'email', message: t(email_invalid.value), trigger: ['blur', 'change'] },
  ],
  message: [
    { required: true, message: t(form_message_required.value), trigger: 'blur' },
  ],
};

const profileFormRef = ref<InstanceType<typeof ElForm> | null>(null);
const loading = ref(false);

async function submitForm() {
  // Désactiver le bouton pendant le chargement
  if (loading.value) return;

  profileFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }

    // Si le formulaire est valide, afficher le popup de confirmation
    ElMessageBox.confirm(
        t('contact.confirmation_popup'),
        'Confirmation',
        {
          confirmButtonText: t('form.submit'),
          cancelButtonText: t('form.cancel'),
          type: 'warning',
        }
    )
        .then(async () => {
          // Si l'utilisateur confirme, alors envoyer le formulaire
          loading.value = true;
          try {
            const response = await sendContactForm(contactForm);
            if (!response.success) {
              ElMessage({
                message: response.message ? t(response.message) : t('sign_in.error_message'),
                type: 'error',
              });
              return;
            }

            ElMessage.success(t('contact.success_message'));

            // Vider le formulaire après succès
            contactForm.email = '';
            contactForm.name = '';
            contactForm.message = '';
          } catch (error) {
            ElMessage.error(t('contact.error_message'));
          } finally {
            loading.value = false;
          }
        })
        .catch(() => {
          ElMessage.info(t('contact.cancel_message'));
        });
  });
}

const form_mail = ref('form.email');
const form_name = ref('form.name');
const form_message = ref('form.message');

const placeholder_email = ref('contact.placeholder.email');
const placeholder_name = ref('contact.placeholder.name');
const placeholder_message = ref('contact.placeholder.message');
</script>

<template>
  <div>
    <h1 class="title">{{ $t('contact.title') }}</h1>
    <client-only>
      <el-form class="contact-form" ref="profileFormRef" :model="contactForm" :rules="contactRules" size="large" label-width="auto">
        <el-form-item :label=$t(form_mail) label-position="top" prop="email">
          <el-input v-model="contactForm.email" :placeholder=$t(placeholder_email)></el-input>
        </el-form-item>
        <el-form-item :label=$t(form_name) label-position="top" prop="name">
          <el-input v-model="contactForm.name" :placeholder=$t(placeholder_name)></el-input>
        </el-form-item>
        <el-form-item :label=$t(form_message) label-position="top" prop="message">
          <el-input v-model="contactForm.message" :placeholder=$t(placeholder_message) type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button w-full type="primary" @click="submitForm" :loading="loading">{{ $t('form.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </client-only>
  </div>
</template>

<style scoped>
.title {
  font-size: 2.5em;
  text-align: center;
  margin: 2em auto;
  width: 500px;
}

@media screen and (max-width: 560px) {
  .title {
    font-size: 1.5em;
    width: 300px;
  }
}

.contact-form {
  max-width: 500px;
  margin: 60px auto 0;
}

@media screen and (max-width: 560px) {
  .title {
    width: 90%;
  }
  .contact-form {
    max-width: 90%;
  }
}
</style>