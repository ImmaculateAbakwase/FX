<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Games</h1>
        <p class="page-subtitle">Mini-games and interactive experiences on KFLIX Play.</p>
      </div>
    </header>

    <section class="card">
      <div class="card-header">
        <div class="search-group">
          <input v-model="search" type="text" placeholder="Search by game title or studio" />
        </div>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Studio</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Players</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="game in paginatedGames"
              :key="game.id"
              class="row-clickable"
              @click="goToDetail(game.id)"
            >
              <td class="primary">{{ game.title }}</td>
              <td>{{ game.studio }}</td>
              <td>{{ game.genre }}</td>
              <td><span :class="['status-pill', game.status]">{{ game.statusLabel }}</span></td>
              <td>{{ game.players }}</td>
              <td>
                <div class="actions" @click.stop>
                  <button class="btn-sm ghost" @click="goToDetail(game.id)">View</button>
                  <button class="btn-sm outline">Disable</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="pagination-bar">
        <span class="pagination-info">
          Showing {{ startItem }} - {{ endItem }} of {{ filteredGames.length }}
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

interface GameRow {
  id: number
  title: string
  studio: string
  genre: string
  status: 'active' | 'disabled'
  statusLabel: string
  players: string
}

const rawGames = reactive<GameRow[]>([
  {
    id: 1,
    title: 'Galaxy Dash',
    studio: 'KFLIX Labs',
    genre: 'Arcade',
    status: 'active',
    statusLabel: 'Active',
    players: '12.4k'
  },
  {
    id: 2,
    title: 'Mystic Arena',
    studio: 'Indie Forge',
    genre: 'Strategy',
    status: 'disabled',
    statusLabel: 'Disabled',
    players: '1.2k'
  }
])

const search = ref('')
const page = ref(1)
const pageSize = 8

const filteredGames = computed(() => {
  if (!search.value) return rawGames
  const term = search.value.toLowerCase()
  return rawGames.filter((g) => {
    return g.title.toLowerCase().includes(term) || g.studio.toLowerCase().includes(term)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredGames.value.length / pageSize)))

const paginatedGames = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
  const start = (page.value - 1) * pageSize
  return filteredGames.value.slice(start, start + pageSize)
})

const startItem = computed(() => ((page.value - 1) * pageSize) + 1)
const endItem = computed(() => Math.min(page.value * pageSize, filteredGames.value.length))

const goToDetail = (id: number) => {
  router.push(`/admin/gaming/list/${id}`)
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

.data-table td {
  color: #f9fafb;
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

.status-pill.active {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
}

.status-pill.disabled {
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
