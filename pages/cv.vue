<template>
  <div class="bg-primary text-white py-8">
    <div class="container mx-auto px-4">
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-secondary mb-2">{{ cv.name }}</h1>
        <p class="text-xl text-gray-300">{{ cv.profession }}</p>
      </header>

      <main>
        <CV :cv="cv" class="mb-12" />

        <section class="bg-accent-2 shadow-md rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-6 text-secondary">Mes Projets</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :title="project.title"
                :description="project.description"
            />
          </div>
        </section>
    </main>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/stores/projects'
import CV from '~/components/CV.vue'

useHead({
  title: 'CV'
})

// Charger le contenu du CV depuis le fichier JSON
const { data: cv } = await useAsyncData('cv', () => queryContent('cv').findOne())

// Utiliser le store Pinia pour gérer les projets
const projectsStore = useProjectsStore()
await projectsStore.fetchProjects()
const projects = computed(() => projectsStore.projects)
</script>
