<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Movies</h1>
        <p class="page-subtitle">All on-demand video assets uploaded to KFLIX.</p>
      </div>
    </header>

    <section class="card">
      <div class="card-header">
        <div class="search-group">
          <input v-model="search" type="text" placeholder="Search by title or creator" />
        </div>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="movie in paginatedMovies"
              :key="movie.id"
              class="row-clickable"
              @click="goToDetail(movie.id)"
            >
              <td>
                <div class="cell-main">
                  <div class="thumb"></div>
                  <div>
                    <div class="primary">{{ movie.title }}</div>
                    <div class="secondary">By {{ movie.creator }}</div>
                  </div>
                </div>
              </td>
              <td>{{ movie.category }}</td>
              <td>{{ movie.duration }}</td>
              <td><span :class="['status-pill', movie.status]">{{ movie.statusLabel }}</span></td>
              <td>{{ movie.published }}</td>
              <td>
                <div class="actions" @click.stop>
                  <button class="btn-sm ghost" @click="goToDetail(movie.id)">View</button>
                  <button class="btn-sm outline">Unpublish</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="pagination-bar">
        <span class="pagination-info">
          Showing {{ startItem }} - {{ endItem }} of {{ filteredMovies.length }}
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

interface MovieRow {
  id: number
  title: string
  creator: string
  category: string
  duration: string
  status: 'published' | 'draft'
  statusLabel: string
  published: string
}

const rawMovies = reactive<MovieRow[]>([
  {
    id: 1,
    title: 'Midnight City Lights',
    creator: 'Lucius King',
    category: 'Drama',
    duration: '1h 45m',
    status: 'published',
    statusLabel: 'Published',
    published: '2024-03-12'
  },
  {
    id: 2,
    title: 'Neon Drift',
    creator: 'Sarah Connor',
    category: 'Action',
    duration: '2h 10m',
    status: 'draft',
    statusLabel: 'Draft',
    published: '-'
  }
])

const search = ref('')
const page = ref(1)
const pageSize = 8

const filteredMovies = computed(() => {
  let movies = rawMovies.slice() // Create a copy
  if (!search.value) {
    // Sort by ID descending (latest first)
    return movies.sort((a, b) => b.id - a.id)
  }
  const term = search.value.toLowerCase()
  movies = movies.filter((m) => {
    return m.title.toLowerCase().includes(term) || m.creator.toLowerCase().includes(term)
  })
  // Sort by ID descending even when searching
  return movies.sort((a, b) => b.id - a.id)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredMovies.value.length / pageSize)))

const paginatedMovies = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
  const start = (page.value - 1) * pageSize
  return filteredMovies.value.slice(start, start + pageSize)
})

const startItem = computed(() => ((page.value - 1) * pageSize) + 1)
const endItem = computed(() => Math.min(page.value * pageSize, filteredMovies.value.length))

const goToDetail = (id: number) => {
  router.push(`/admin/video-streaming/movies/${id}`)
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

.cell-main {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.thumb {
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #f97316, #ef4444);
}

.primary {
  color: #f9fafb;
}

.secondary {
  color: #e5e7eb;
  font-size: 0.8rem;
}

.status-pill {
  display: inline-flex;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.status-pill.published {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
}

.status-pill.draft {
  background: rgba(251, 191, 36, 0.18);
  color: #facc15;
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
