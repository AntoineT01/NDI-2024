<template>
  <div class="game-container">
    <!-- Bouton d'ouverture -->
    <button @click="showModal = true" class="open-button">
      <div class="button-content">
        <span class="button-text">Puissance 4</span>
        <span class="button-icon">🤖</span>
      </div>
    </button>

    <!-- Modal du jeu -->
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <!-- En-tête -->
        <div class="modal-header">
          <h2 class="game-title">
            <span class="title-icon">🎮</span>
            Puissance 4
            <span class="title-icon">🤖</span>
          </h2>
          <button @click="showModal = false" class="close-button">×</button>
        </div>

        <!-- Information des joueurs -->
        <div class="player-info">
          <div class="player-card" :class="{ active: currentPlayer === 1 }">
            <div class="player-avatar">👤</div>
            <div class="player-piece player1"></div>
            <span>Joueur</span>
          </div>
          <div class="vs-badge">VS</div>
          <div class="player-card" :class="{ active: currentPlayer === 2 }">
            <div class="player-avatar">🤖</div>
            <div class="player-piece player2"></div>
            <span>IA</span>
            <span v-if="thinking" class="thinking">🔄</span>
          </div>
        </div>

        <!-- Plateau de jeu -->
        <div class="board-container">
          <div class="board">
            <!-- Pièces en animation -->
            <div
                v-for="piece in fallingPieces"
                :key="piece.id"
                class="falling-piece"
                :class="{ 'player1': piece.player === 1, 'player2': piece.player === 2 }"
                :style="{
                left: `${piece.col * (100/7)}%`,
                top: `${piece.targetRow * (100/6)}%`,
                transition: 'top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }"
            >
              <div class="piece">
                <div class="piece-inner"></div>
              </div>
            </div>

            <!-- Grille de jeu -->
            <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
              <div
                  v-for="(cell, colIndex) in row"
                  :key="colIndex"
                  class="cell"
                  @click="makeMove(colIndex)"
                  :class="{
                  'player1': cell === 1,
                  'player2': cell === 2,
                  'hover': !cell && currentPlayer === 1 && !winner && !thinking
                }"
              >
                <div class="cell-content">
                  <div class="piece">
                    <div class="piece-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contrôles et statut -->
        <div class="game-controls">
          <div v-if="winner" class="winner-banner" :class="{ 'ai-wins': winner === 2 }">
            <div class="winner-content">
              <div class="trophy">{{ winner === 1 ? '🏆' : '🤖' }}</div>
              <p class="winner-text">
                {{ winner === 1 ? 'Victoire ! 🎉' : "L'IA l'emporte ! 🤖" }}
              </p>
            </div>
          </div>
          <p v-else-if="isDraw" class="draw-text">Match nul ! 🤝</p>

          <!-- Sélecteur de difficulté -->
          <div class="difficulty-selector">
            <label>Niveau :</label>
            <div class="difficulty-buttons">
              <button
                  v-for="level in ['easy', 'medium', 'hard']"
                  :key="level"
                  @click="setDifficulty(level)"
                  :class="{ active: difficulty === level }"
                  class="difficulty-button"
              >
                {{ getDifficultyLabel(level) }}
              </button>
            </div>
          </div>

          <!-- Bouton reset -->
          <button @click="resetGame" class="reset-button">
            <span class="reset-icon">🔄</span>
            <span>Nouvelle partie</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Puissance4',
  data() {
    return {
      board: Array(6).fill().map(() => Array(7).fill(null)),
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      showModal: false,
      thinking: false,
      difficulty: 'medium',
      fallingPieces: []
    }
  },

  methods: {
    getDifficultyLabel(level) {
      return {
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile'
      }[level]
    },

    setDifficulty(level) {
      this.difficulty = level;
      this.resetGame();
    },

    async makeMove(col) {
      if (this.winner || this.isDraw || this.thinking || this.currentPlayer !== 1) return;

      if (this.isValidMove(col)) {
        await this.dropPiece(col);

        if (!this.winner && !this.isDraw) {
          this.thinking = true;
          await this.delay(500);
          const aiMove = this.getAIMove();
          await this.dropPiece(aiMove);
          this.thinking = false;
        }
      }
    },

    isValidMove(col) {
      return this.board[0][col] === null;
    },

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async dropPiece(col) {
      if (!this.isValidMove(col)) return;

      let row = this.getRowForCol(col);
      if (row === -1) return;

      // Animation de chute
      const piece = {
        id: Date.now(),
        col,
        player: this.currentPlayer,
        startRow: -1,
        targetRow: row
      };

      this.fallingPieces.push(piece);
      await this.delay(500);

      this.board[row][col] = this.currentPlayer;
      this.fallingPieces = this.fallingPieces.filter(p => p.id !== piece.id);

      if (this.checkWin(row, col)) {
        this.winner = this.currentPlayer;
      } else if (this.checkDraw()) {
        this.isDraw = true;
      } else {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      }
    },

    getAIMove() {
      switch (this.difficulty) {
        case 'easy':
          return this.getRandomMove();
        case 'medium':
          return Math.random() < 0.6 ? this.getSmartMove() : this.getRandomMove();
        case 'hard':
          return Math.random() < 0.9 ? this.getSmartMove() : this.getRandomMove();
      }
    },

    getRandomMove() {
      const validMoves = [];
      for (let col = 0; col < 7; col++) {
        if (this.isValidMove(col)) validMoves.push(col);
      }
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    },

    getSmartMove() {
      // Vérifier la victoire possible
      for (let col = 0; col < 7; col++) {
        if (this.isValidMove(col)) {
          let row = this.getRowForCol(col);
          this.board[row][col] = 2;
          if (this.checkWin(row, col)) {
            this.board[row][col] = null;
            return col;
          }
          this.board[row][col] = null;
        }
      }

      // Bloquer la victoire du joueur
      for (let col = 0; col < 7; col++) {
        if (this.isValidMove(col)) {
          let row = this.getRowForCol(col);
          this.board[row][col] = 1;
          if (this.checkWin(row, col)) {
            this.board[row][col] = null;
            return col;
          }
          this.board[row][col] = null;
        }
      }

      // Jouer au centre de préférence
      if (this.isValidMove(3)) return 3;

      return this.getRandomMove();
    },

    getRowForCol(col) {
      for (let row = 5; row >= 0; row--) {
        if (!this.board[row][col]) return row;
      }
      return -1;
    },

    checkWin(row, col) {
      const directions = [
        [[0, 1], [0, -1]], // Horizontal
        [[1, 0], [-1, 0]], // Vertical
        [[1, 1], [-1, -1]], // Diagonal /
        [[1, -1], [-1, 1]] // Diagonal \
      ];

      const player = this.board[row][col];

      for (const [dir1, dir2] of directions) {
        let count = 1;

        // Vérifier dans les deux directions
        for (const [dx, dy] of [dir1, dir2]) {
          let r = row + dx;
          let c = col + dy;
          while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === player) {
            count++;
            r += dx;
            c += dy;
          }
        }

        if (count >= 4) return true;
      }

      return false;
    },

    checkDraw() {
      return this.board[0].every(cell => cell !== null);
    },

    resetGame() {
      this.board = Array(6).fill().map(() => Array(7).fill(null));
      this.currentPlayer = 1;
      this.winner = null;
      this.isDraw = false;
      this.thinking = false;
      this.fallingPieces = [];
    }
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle at center, #1a1a2e 0%, #16213e 100%);
  font-family: Arial, sans-serif;
}

/* Modal et conteneur principal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  padding: 30px;
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  color: white;
  position: relative;
}

/* Bouton d'ouverture */
.open-button {
  padding: 20px 40px;
  font-size: 24px;
  background: linear-gradient(45deg, #4f46e5, #6366f1);
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
}

.open-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(79, 70, 229, 0.4);
}

/* En-tête du jeu */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-title {
  font-size: 32px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  transition: color 0.3s;
}

/* Plateau de jeu */
.board-container {
  position: relative;
  width: 100%;
  padding-bottom: 85.7%;
  margin: 20px 0;
}
.board {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  gap: 8px;
  height: calc(100% / 6); /* Définir une hauteur fixe pour chaque rangée */
}

/* Modifiez ces styles dans la partie CSS */
.cell {
  flex: 1;
  position: relative;
  /* Changez le padding-bottom pour avoir des cercles au lieu d'ovales */
  padding-bottom: calc(100% / 7); /* Cela maintient un ratio carré */
  max-width: calc(100% / 7);
}


.cell-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8%;
}

/* Ajustez le style des pièces pour assurer un cercle parfait */
.piece {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  transition: background-color 0.3s;
  aspect-ratio: 1/1; /* Force un ratio 1:1 */
}

/* Pièces en mouvement */
.falling-piece {
  position: absolute;
  width: calc(100% / 7);
  height: calc(100% / 6);
  padding: 8px;
  z-index: 2;
  animation: dropIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.player1 .piece {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.player2 .piece {
  background: linear-gradient(135deg, #facc15, #eab308);
}

/* Informations des joueurs */
.player-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.player-card {
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.7;
  transition: all 0.3s;
}

.player-card.active {
  opacity: 1;
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

/* Contrôles du jeu */
.difficulty-selector {
  text-align: center;
  margin: 20px 0;
}

.difficulty-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.difficulty-button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.difficulty-button.active {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

/* Messages de fin de partie */
.winner-banner {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
  animation: slideIn 0.5s ease-out;
}

.ai-wins {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

/* Animations */
@keyframes dropIn {
  from {
    transform: translateY(-500%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Animation de réflexion de l'IA */
.thinking {
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-left: 8px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
  }

  .game-title {
    font-size: 24px;
  }

  .difficulty-buttons {
    flex-direction: column;
  }

  .player-info {
    gap: 15px;
  }

  .player-card {
    padding: 10px;
  }
}
</style>