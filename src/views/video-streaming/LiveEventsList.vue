<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Live Events</h1>
        <p class="page-subtitle">Scheduled and past live streams on KFLIX.</p>
      </div>
    </header>

    <section class="card">
      <div class="card-header">
        <div class="search-group">
          <input v-model="search" type="text" placeholder="Search by title or host" />
        </div>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Host</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Viewers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="event in paginatedEvents"
              :key="event.id"
              class="row-clickable"
              @click="goToDetail(event.id)"
            >
              <td class="primary">{{ event.title }}</td>
              <td>{{ event.host }}</td>
              <td>{{ event.startTime }}</td>
              <td><span :class="['status-pill', event.status]">{{ event.statusLabel }}</span></td>
              <td>{{ event.viewers }}</td>
              <td>
                <div class="actions" @click.stop>
                  <button class="btn-sm ghost" @click="goToDetail(event.id)">View</button>
                  <button class="btn-sm outline">End</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="pagination-bar">
        <span class="pagination-info">
          Showing {{ startItem }} - {{ endItem }} of {{ filteredEvents.length }}
        </span>
        <div class="pagination-controls">
          <button class="btn-page" :disabled="page === 1" @click="page--">Prev</button>
          <span class="page-indicator">Page {{ page }} / {{ totalPages }}</span>
          <button class="btn-page" :disabled="page === totalPages" @click="page++">Next</button>
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface LiveEventRow {
  id: number
  title: string
  host: string
  startTime: string
  status: 'scheduled' | 'live' | 'ended'
  statusLabel: string
  viewers: string
}

const rawEvents = reactive<LiveEventRow[]>([
  {
    id: 1,
    title: 'KFLIX Originals Premiere Night',
    host: 'Lucius King',
    startTime: '2025-01-12 20:00',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    viewers: '—'
  },
  {
    id: 2,
    title: 'Gaming Championship Finals',
    host: 'KFLIX Play',
    startTime: '2024-11-07 18:00',
    status: 'ended',
    statusLabel: 'Ended',
    viewers: '14.2k'
  }
])

const search = ref('')
const page = ref(1)
const pageSize = 8

const filteredEvents = computed(() => {
  if (!search.value) return rawEvents
  const term = search.value.toLowerCase()
  return rawEvents.filter((e) => {
    return e.title.toLowerCase().includes(term) || e.host.toLowerCase().includes(term)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredEvents.value.length / pageSize)))

const paginatedEvents = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
  const start = (page.value - 1) * pageSize
  return filteredEvents.value.slice(start, start + pageSize)
})

const startItem = computed(() => ((page.value - 1) * pageSize) + 1)
const endItem = computed(() => Math.min(page.value * pageSize, filteredEvents.value.length))

const goToDetail = (id: number) => {
  router.push(`/admin/video-streaming/live-events/${id}`)
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
  align-items: flex-end;
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

.card {
  background: #020617;
  border-radius: 1.25rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.search-group input {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  padding: 0.5rem 0.9rem;
  color: #e5e7eb;
  font-size: 0.85rem;
  min-width: 260px;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem 0.5rem;
  font-size: 0.85rem;
  color: #e5e7eb;
}

.data-table thead th {
  text-align: left;
  font-weight: 500;
  color: #9ca3af;
  border-bottom: 1px solid rgba(31, 41, 55, 1);
}

.data-table tbody tr:nth-child(even) {
  background: rgba(15, 23, 42, 0.66);
}

.row-clickable {
  cursor: pointer;
}

.row-clickable:hover {
  background: rgba(30, 64, 175, 0.4);
}

.primary {
  color: #f9fafb;
}

.status-pill {
  display: inline-flex;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.status-pill.scheduled {
  background: rgba(59, 130, 246, 0.18);
  color: #93c5fd;
}

.status-pill.live {
  background: rgba(248, 113, 113, 0.2);
  color: #fb7185;
}

.status-pill.ended {
  background: rgba(148, 163, 184, 0.18);
  color: #e5e7eb;
}

.actions {
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
}

.btn-sm {
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.75rem;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-sm.ghost {
  background: transparent;
  color: #e5e7eb;
  border-color: rgba(148, 163, 184, 0.7);
}

.btn-sm.outline {
  background: rgba(15, 23, 42, 0.9);
  color: #f97316;
  border-color: rgba(249, 115, 22, 0.6);
}

.pagination-bar {
  margin-top: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #9ca3af;
}

.pagination-controls {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.btn-page {
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: transparent;
  color: #e5e7eb;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: default;
}

.page-indicator {
  color: #e5e7eb;
}
</style>
