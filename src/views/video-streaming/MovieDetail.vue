<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Movie Details</h1>
        <p class="page-subtitle">Metadata and performance overview.</p>
      </div>
      <button class="btn ghost" type="button" @click="goBack">Back to Movies</button>
    </header>

    <section class="card">
      <div class="header-row">
        <div class="thumb-lg"></div>
        <div>
          <h2 class="primary">{{ movie.title }}</h2>
          <p class="secondary">By {{ movie.creator }}</p>
          <p class="secondary">Category: {{ movie.category }} • Duration: {{ movie.duration }}</p>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-block">
          <h3>Publishing</h3>
          <p><span class="label">Status:</span> {{ movie.statusLabel }}</p>
          <p><span class="label">Published:</span> {{ movie.published }}</p>
        </div>
        <div class="meta-block">
          <h3>Performance</h3>
          <p><span class="label">Views:</span> 124,394</p>
          <p><span class="label">Likes:</span> 8,234</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = Number(route.params.id)

const movie = computed(() => ({
  id,
  title: 'Sample Movie',
  creator: 'Sample Creator',
  category: 'Drama',
  duration: '1h 45m',
  statusLabel: 'Published',
  published: '2024-03-12'
}))

const goBack = () => {
  router.push('/admin/video-streaming/list')
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

.header-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.25rem;
}

.thumb-lg {
  width: 4.5rem;
  height: 3rem;
  border-radius: 0.9rem;
  background: linear-gradient(135deg, #f97316, #ef4444);
}

.primary {
  color: #e5e7eb;
  font-size: 1.2rem;
  font-weight: 600;
}

.secondary {
  color: #9ca3af;
  font-size: 0.85rem;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.meta-block h3 {
  font-size: 0.95rem;
  color: #e5e7eb;
  margin-bottom: 0.45rem;
}

.meta-block p {
  font-size: 0.85rem;
  color: #d1d5db;
}

.label {
  color: #9ca3af;
  margin-right: 0.35rem;
}
</style>
