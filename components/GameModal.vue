<!-- components/GameModal.vue -->
<template>
  <div>
    <button @click="showModal = true" class="open-btn">
      Vérifier que vous êtes humain
    </button>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <GameTcha ref="gameComponent" @success="handleSuccess" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import GameTcha from './GameTcha.vue'

const showModal = ref(false)
const gameComponent = ref(null)
const emit = defineEmits(['verified'])

const closeModal = () => {
  showModal.value = false
}

const handleSuccess = () => {
  showModal.value = false
  emit('verified')
}

watch(showModal, (newValue) => {
  if (newValue) {
    nextTick(() => {
      gameComponent.value?.startGame()
    })
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  width:  50em;   /* Largeur fixe */
  height: 50em;   /* Hauteur fixe */
  display: flex;   /* Pour centrer le contenu */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.open-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.open-btn:hover {
  background-color: #45a049;
}
</style>