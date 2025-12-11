<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Live Event Details</h1>
        <p class="page-subtitle">Schedule, host, and performance metrics.</p>
      </div>
      <button class="btn ghost" type="button" @click="goBack">Back to Live Events</button>
    </header>

    <section class="card">
      <h2 class="primary">{{ event.title }}</h2>
      <p class="secondary">Host: {{ event.host }}</p>
      <p class="secondary">Start Time: {{ event.startTime }}</p>
      <p class="secondary">Status: {{ event.statusLabel }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = Number(route.params.id)

const event = computed(() => ({
  id,
  title: 'Sample Live Event',
  host: 'Sample Host',
  startTime: '2025-01-12 20:00',
  statusLabel: 'Scheduled'
}))

const goBack = () => {
  router.push('/admin/video-streaming/live-events')
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
