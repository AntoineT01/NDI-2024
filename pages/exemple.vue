<!-- pages/example.vue -->
<template>
  <div>
    <h1>Ma page protégée</h1>

    <GameModal @verified="handleVerification" />

    <!-- Contenu qui apparaît une fois vérifié -->
    <div v-if="isVerified">
      Contenu secret débloqué !
    </div>
  </div>
</template>

<script setup>
const isVerified = ref(false)

const handleVerification = () => {
  isVerified.value = true
  // Vous pouvez aussi rediriger ou faire d'autres actions
  // navigateTo('/protected')
}
</script>