<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4 text-secondary">Nuit de l'Info 2024</h1>
    <p class="text-xl mb-6">On va parler de l'océan et des humains !</p>
    <div class="bg-accent-1 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Mes Projets Récents</h2>

    </div>
    <div>
      <gameTcha  :onSuccess="handleSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  // Rediriger vers la page suivante ou débloquer le contenu
  navigateTo('/page-protegee')
}</script>