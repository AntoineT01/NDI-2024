<script setup lang="ts">
import {reactive, ref} from 'vue';
import {ElMessage, ElForm, ElMessageBox} from 'element-plus';
import type {FormRules} from 'element-plus';
import {type ContactFormData, sendContactForm} from "~/services/contact";
import BaseCards from "~/components/BaseCards.vue";

const contactForm: ContactFormData = reactive({
  email: '',
  name: '',
  message: '',
});

const contactRules: FormRules = {
  email: [
    {required: true, message: "Email required", trigger: 'blur'},
    {type: 'email', message: "Email pas bon", trigger: ['blur', 'change']},
  ],
  message: [
    {required: true, message: "Message requis", trigger: 'blur'},
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
        "Confirmation",
        'Confirmation',
        {
          confirmButtonText: "Confirmer",
          cancelButtonText: "Annuler",
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
                message: response.message ? "Oui" : "OUi",
                type: 'error',
              });
              return;
            }

            ElMessage.success("Succes");

            // Vider le formulaire après succès
            contactForm.email = '';
            contactForm.name = '';
            contactForm.message = '';
          } catch (error) {
            ElMessage.error("Erreur");
          } finally {
            loading.value = false;
          }
        })
        .catch(() => {
          ElMessage.info("cancel");
        });
  });
}

const form_mail ='form.email';
const form_name = 'form.name';
const form_message = 'form.message';

const placeholder_email = 'contact.placeholder.email';
const placeholder_name = 'contact.placeholder.name';
const placeholder_message = 'contact.placeholder.message';
</script>

<template>
  <BaseCards class="contact-form">
    <h1 class="title">Contact</h1>
    <client-only>
      <el-form ref="profileFormRef" :model="contactForm" :rules="contactRules" size="large" label-width="auto">
        <el-form-item :label=form_mail label-position="top" prop="email">
          <el-input class="custom-input" v-model="contactForm.email" placeholder="Placeholder"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item :label=form_message label-position="top" prop="name">
          <el-input v-model="contactForm.name" placeholder="Placeholder"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item :label=form_message label-position="top" prop="message">
          <el-input class="custom-input" autosize v-model="contactForm.message" placeholder="Placeholder"
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round w-full type="primary" @click="submitForm" :loading="loading">
              Submit
          </el-button>
        </el-form-item>
      </el-form>
    </client-only>
  </BaseCards>
</template>

<style lang="scss" scoped>
.title {
  font-size: 2em;
  text-align: center;
  margin: 1rem auto;
  width: 450px;
}

@media screen and (max-width: 560px) {
  .title {
    font-size: 1.5em;
    width: 300px;
  }
}

.contact-form {
  max-width: 500px;
  margin: 10rem auto 10rem;
}

@media screen and (max-width: 560px) {
  .title {
    width: 90%;
  }

  .contact-form {
    max-width: 90%;
  }
}

::v-deep(.el-input__wrapper) {
  border-radius: var(--el-border-radius-round); /* Coins arrondis */
}

::v-deep(.el-input__inner) {
  border-radius: var(--el-border-radius-round); /* Coins arrondis */
  padding: 5px;
}

::v-deep(.el-textarea__inner) {
  border-radius: var(--el-border-radius-round); /* Coins arrondis */
  padding: 15px 20px;
}
</style>