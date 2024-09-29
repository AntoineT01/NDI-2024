<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {verifyEmailToken} from '~/services/auth'; // Import du service

// Utilisation de Vue Router pour accéder aux paramètres de l'URL
const route = useRoute();
const router = useRouter();

// État réactif pour stocker le message de succès ou d'erreur
const verificationStatus = ref<string | null>(null);

// Fonction de vérification d'email
const verifyEmail = async (token: string) => {
  // Appel au service de vérification de l'email
  const response = await verifyEmailToken(token);

  if (response.success && response.data) {
    verificationStatus.value = 'email-verification.success';
    ElMessage({
      message: verificationStatus.value,
      type: 'success',
    });

    // Redirection après succès (par exemple, vers la page de connexion)
    await router.push('/');
  } else {
    verificationStatus.value = 'email-verification.error';
    ElMessage({
      message: verificationStatus.value,
      type: 'error',
    });
  }
};

onMounted(() => {
  // Extraction du token depuis l'URL
  const token = route.params.token as string;

  if (token) {
    verifyEmail(token);
  } else {
    verificationStatus.value = 'No token found in the URL.';
    ElMessage({
      message: verificationStatus.value,
      type: 'error',
    });
  }
});
</script>

<template>
  <div class="email-verification">
    <h2>Email Verification</h2>
    <!-- Affichage du message de statut -->
    <p>{{ verificationStatus }}</p>
  </div>
</template>

<style scoped>
.email-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.email-verification h2 {
  margin-bottom: 20px;
}
</style>
