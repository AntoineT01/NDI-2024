<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css';

const router = useRouter();

function navigateTo(route: string) {
  router.push(route);
  overflowMenuOpen.value = false;
}

const overflowMenuOpen = ref(false);
const isOverflow = ref(false);
const linksContainer = ref<HTMLElement | null>(null);

function handleOverflowCommand(command: string) {
  if (command === 'contact') {
    navigateTo('/contact');
  }
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown') && !target.closest('.overflow-button')) {
    overflowMenuOpen.value = false;
  }
}

function adjustMenu() {
  nextTick(() => {
    const container = linksContainer.value;
    if (!container) return;

    const links = container.querySelector('.links') as HTMLElement;
    const overflowBtn = container.querySelector('.overflow-button') as HTMLElement;

    if (!links || !overflowBtn) return;

    const availableWidth = container.clientWidth;
    const linksWidth = links.scrollWidth;
    const totalWidth = linksWidth + overflowBtn.offsetWidth;

    isOverflow.value = totalWidth > availableWidth;
  });
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  adjustMenu();
  window.addEventListener('resize', adjustMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', adjustMenu);
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/">
        <img src="/logo_tanguy_v1.png" alt="Logo du site" />
      </NuxtLink>
    </div>
    <div class="navbar-links" ref="linksContainer">
      <ul class="links">
        <li>
            <NuxtLink to="/contact" @click="navigateTo('/contact')">
              <el-button size="large" round type="primary">
                <i class="mr-2 fa-solid fa-contact-card"></i>
                Contact
              </el-button>

            </NuxtLink>
        </li>
      </ul>
      <el-dropdown trigger="click" @command="handleOverflowCommand">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="contact" @click="navigateTo('/contact')">
              Contact
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <button class="overflow-button">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </el-dropdown>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5vw; /* Utilisation de vw pour un padding responsive */
  position: relative;
}

@media (min-width: 1200px) {
  .navbar {
    padding: 30px 200px; /* Plus de padding pour les grands écrans */
  }
}

.navbar-logo img {
  width: 150px;
}

.navbar-links {
  display: flex;
  align-items: center;
  position: relative;
}

.links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.links li {
  margin-left: 20px;
}

.links a {
  text-decoration: none;
  color: #333333;
  font-size: 16px;
  transition: color 0.3s;
}

.links a:hover {
  color: #007bff;
}

.dropbtn i {
  margin-right: 5px;
}

.overflow-button {
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  margin-left: 20px;
  font-size: 18px;
  color: #333333;
}

.overflow-button:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .links {
    display: none;
  }
  .overflow-button {
    display: block;
  }
}

</style>
