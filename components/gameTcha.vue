<!-- components/GameTcha.vue -->
<script setup>
import { ref, onUnmounted } from 'vue';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;

const gridSize = ref(GRID_SIZE);
const cellSize = ref(CELL_SIZE);
const snake = ref([{ x: 10, y: 10 }]);
const food = ref({ x: 15, y: 15 });
const direction = ref('RIGHT');
const nextDirection = ref('RIGHT');
const isRunning = ref(false);
const gameOver = ref(false);
const score = ref(0);
const gameLoop = ref(null);
const gameBoard = ref(null);

const emit = defineEmits(['success']);

const generateFood = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  };
};

const checkCollision = (head) => {
  if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
  ) {
    return true;
  }
  return snake.value.some((segment, index) => {
    if (index === 0) return false;
    return segment.x === head.x && segment.y === head.y;
  });
};

const moveSnake = () => {
  const head = { ...snake.value[0] };
  direction.value = nextDirection.value;

  switch (direction.value) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  if (checkCollision(head)) {
    gameOver.value = true;
    if (gameLoop.value) {
      clearInterval(gameLoop.value);
    }
    return;
  }

  const newSnake = [head, ...snake.value];

  if (head.x === food.value.x && head.y === food.value.y) {
    food.value = generateFood();
    score.value++;
    if (score.value >= 5) {
      clearInterval(gameLoop.value);
      emit('success');
    }
  } else {
    newSnake.pop();
  }

  snake.value = newSnake;
};

const startGame = () => {
  if (gameBoard.value) {
    gameBoard.value.focus();
  }
  isRunning.value = true;
  gameLoop.value = setInterval(moveSnake, INITIAL_SPEED);
};

const resetGame = () => {
  snake.value = [{ x: 10, y: 10 }];
  food.value = generateFood();
  direction.value = 'RIGHT';
  nextDirection.value = 'RIGHT';
  isRunning.value = false;
  gameOver.value = false;
  score.value = 0;
  if (gameLoop.value) {
    clearInterval(gameLoop.value);
  }
  startGame();
};

const handleKeypress = (event) => {
  const key = event.key;

  switch (key) {
    case 'ArrowUp':
      if (direction.value !== 'DOWN') nextDirection.value = 'UP';
      break;
    case 'ArrowDown':
      if (direction.value !== 'UP') nextDirection.value = 'DOWN';
      break;
    case 'ArrowLeft':
      if (direction.value !== 'RIGHT') nextDirection.value = 'LEFT';
      break;
    case 'ArrowRight':
      if (direction.value !== 'LEFT') nextDirection.value = 'RIGHT';
      break;
  }
};

onUnmounted(() => {
  if (gameLoop.value) {
    clearInterval(gameLoop.value);
  }
});

defineExpose({
  startGame
});
</script>

<template>
  <div class="snake-game">
    <div class="game-header">
      <h2>Snake CAPTCHA</h2>
      <div class="score">Score: {{ score }}/5</div>
      <div v-if="!isRunning && !gameOver" class="instructions">
        Utilisez les flèches du clavier pour collecter 5 items
      </div>
    </div>

    <div
        class="game-board"
        :style="{ width: `${gridSize * cellSize}px`, height: `${gridSize * cellSize}px` }"
        @keydown="handleKeypress"
        tabindex="0"
        ref="gameBoard"
    >
      <div
          v-for="(segment, index) in snake"
          :key="index"
          class="snake-segment"
          :style="{
          left: `${segment.x * cellSize}px`,
          top: `${segment.y * cellSize}px`,
          width: `${cellSize}px`,
          height: `${cellSize}px`
        }"
      ></div>

      <div
          class="food"
          :style="{
          left: `${food.x * cellSize}px`,
          top: `${food.y * cellSize}px`,
          width: `${cellSize}px`,
          height: `${cellSize}px`
        }"
      ></div>
    </div>

    <div class="controls">
      <button
          v-if="gameOver"
          @click="resetGame"
          class="reset-btn"
      >
        Réessayer
      </button>
    </div>

    <div v-if="gameOver" class="game-over">
      Game Over! Score: {{ score }}
    </div>
  </div>
</template>

<style scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.game-header {
  text-align: center;
}

.game-board {
  position: relative;
  background-color: #f0f0f0;
  border: 2px solid #333;
  outline: none;
}

.snake-segment {
  position: absolute;
  background-color: #4CAF50;
  border-radius: 2px;
}

.food {
  position: absolute;
  background-color: #FF5722;
  border-radius: 50%;
}

.controls {
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

.reset-btn {
  background-color: #f44336;
}

.reset-btn:hover {
  background-color: #da190b;
}

.game-over {
  color: #f44336;
  font-size: 1.5rem;
  font-weight: bold;
}

.instructions {
  color: #666;
  margin: 0.5rem 0;
}
</style>