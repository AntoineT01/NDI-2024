<script setup lang="ts">
import { ref } from 'vue';
import Organ from './Organ.vue';

const organs = ref([
  {
    name: 'heart',
    src: '/assets/human_body/sketch_coeur.png',
    alt: 'Image d\'un coeur',
    position: { top: '39%', left: '60%' },
    size: '10%',
    visible: true,
    zIndex: 999,
    next: 'lungs',
  },
  {
    name: 'lungs',
    src: '/assets/human_body/sketch_poumons.png',
    alt: 'Image d\'un poumon',
    position: { top: '37%', left: '57%' },
    size: '30%',
    visible: false,
    zIndex: 1,
    next: 'skin',
  },
  {
    name: 'skin',
    src: '/assets/human_body/sketch_peau.png',
    alt: 'Image d\'une peau',
    position: { top: '42%', left: '25%' },
    size: '13%',
    visible: false,
    zIndex: 1,
  },
]);

const toggleOrgan = (currentOrgan: string) => {
  const organ = organs.value.find((o) => o.name === currentOrgan);
  if (organ && organ.next) {
    const nextOrgan = organs.value.find((o) => o.name === organ.next);
    if (nextOrgan) {
      nextOrgan.visible = true;
    }
  }
};
</script>

<template>
  <div class="human_container">
    <img src="/assets/human_body/sketch_personnage.png" alt="Image d'un humain" class="human_body" />
    <Organ
        v-for="organ in organs"
        :key="organ.name"
        :name="organ.name"
        :src="organ.src"
        :alt="organ.alt"
        :position="organ.position"
        :size="organ.size"
        :visible="organ.visible"
        :zIndex="organ.zIndex"
        :onClick="() => toggleOrgan(organ.name)"
    />
  </div>
</template>

<style scoped>
.human_container {
  position: relative;
  width: 800px;
  height: auto;
  margin: auto;
}

.human_body {
  width: 100%;
  height: 100%;
}
</style>
