<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Game Details</h1>
        <p class="page-subtitle">Game configuration and performance summary.</p>
      </div>
      <button class="btn ghost" type="button" @click="goBack">Back to Games</button>
    </header>

    <section class="card">
      <h2 class="primary">{{ game.title }}</h2>
      <p class="secondary">Studio: {{ game.studio }}</p>
      <p class="secondary">Genre: {{ game.genre }}</p>
      <p class="secondary">Status: {{ game.statusLabel }}</p>
      <p class="secondary">Players: {{ game.players }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = Number(route.params.id)

const game = computed(() => ({
  id,
  title: 'Sample Game',
  studio: 'Sample Studio',
  genre: 'Arcade',
  statusLabel: 'Active',
  players: '12.4k'
}))

const goBack = () => {
  router.push('/admin/gaming/list')
}
</script>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #f9fafb;
}

.page-subtitle {
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: #9ca3af;
}

.btn.ghost {
  border-radius: 999px;
  padding: 0.45rem 1.3rem;
  background: transparent;
  color: #e5e7eb;
  border: 1px solid rgba(148, 163, 184, 0.6);
  cursor: pointer;
}

.card {
  background: #020617;
  border-radius: 1.25rem;
  padding: 1.4rem 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.primary {
  color: #e5e7eb;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.secondary {
  color: #9ca3af;
  font-size: 0.85rem;
}
</style>
