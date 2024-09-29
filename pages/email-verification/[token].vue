<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const verificationStatus = ref<string | null>(null);

const verifyEmail = async (token: string) => {
  try {
    const response = await $fetch('/api/account-requests', {
      method: 'POST',
      body: { token },
    });

    if (!response) {
      throw new Error('Verification failed.');
    }

    verificationStatus.value = 'Email verified successfully!';
    ElMessage({
      message: verificationStatus.value,
      type: 'success',
    });

    // Redirection après succès (par exemple, vers la page de connexion)
    await router.push('/sign-in');

  } catch (error) {
    verificationStatus.value = 'Email verification failed. Please try again.';
    console.error('Error during email verification:', error);
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
