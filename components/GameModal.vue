<!-- components/GameModal.vue -->
<template>
  <div>
    <button @click="showModal = true" class="open-btn">
      Vérifier que vous êtes humain
    </button>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <GameTcha ref="gameComponent" @success="handleSuccess" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameModal',
  emits: ['verified'],
  data() {
    return {
      showModal: false
    }
  },
  watch: {
    showModal(newValue) {
      if (newValue) {
        // Attendre que le composant soit monté avant de démarrer le jeu
        this.$nextTick(() => {
          this.$refs.gameComponent.startGame();
        });
      }
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    handleSuccess() {
      this.showModal = false
      this.$emit('verified')
    }
  }
}
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
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
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