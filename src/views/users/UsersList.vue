<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">Users</h1>
        <p class="page-subtitle">Overview of all users registered on KFLIX.</p>
      </div>
    </header>

    <section class="card">
      <div class="card-header">
        <div class="search-group">
          <i class="bi-search search-icon"></i>
          <input v-model="search" type="text" placeholder="Search by name or email..." />
        </div>
        <button class="filter-button" type="button">
          <i class="bi-sliders"></i>
          <span>Filter</span>
        </button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th class="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="row-clickable"
              @click="goToDetail(user.id)"
            >
              <td>
                <div class="cell-user">
                  <div class="avatar">{{ user.initials }}</div>
                  <div>
                    <div class="primary">{{ user.name }}</div>
                    <div class="secondary">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="role-pill">{{ user.role }}</span>
              </td>
              <td>
                <span :class="['status-text', user.status]">
                  <i
                    v-if="user.status === 'active'"
                    class="bi-person-check status-icon"
                  ></i>
                  <i
                    v-else-if="user.status === 'blocked'"
                    class="bi-shield-exclamation status-icon"
                  ></i>
                  <i
                    v-else
                    class="bi-hourglass-split status-icon"
                  ></i>
                  {{ user.statusLabel }}
                </span>
              </td>
              <td>{{ user.joined }}</td>
              <td class="actions-cell" @click.stop>
                <button class="icon-dots" type="button" @click="toggleMenu(user.id)">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <transition name="fade-menu">
                  <div v-if="openMenuId === user.id" class="actions-menu">
                    <p class="actions-title">Actions</p>
                    <button type="button" @click="goToDetail(user.id)">View Profile</button>
                    <button type="button">Block User</button>
                    <button type="button" class="danger">Suspend User</button>
                  </div>
                </transition>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="pagination-bar">
        <span class="pagination-info">
          Showing
          {{ startItem }}
          -
          {{ endItem }}
          of
          {{ filteredUsers.length }}
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
const openMenuId = ref<number | null>(null)

interface UserRow {
  id: number
  name: string
  username: string
  email: string
  role: string
  status: 'active' | 'blocked' | 'pending'
  statusLabel: string
  joined: string
  initials: string
}

const rawUsers = reactive<UserRow[]>([
  {
    id: 1,
    name: 'Lucius King',
    username: 'lking',
    email: 'lucius@example.com',
    role: 'Super Admin',
    status: 'active',
    statusLabel: 'Active',
    joined: '2024-02-01',
    initials: 'LK'
  },
  {
    id: 2,
    name: 'Sarah Connor',
    username: 'sconnor',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'active',
    statusLabel: 'Active',
    joined: '2024-03-15',
    initials: 'SC'
  },
  {
    id: 3,
    name: 'John Doe',
    username: 'jdoe',
    email: 'john@example.com',
    role: 'Moderator',
    status: 'blocked',
    statusLabel: 'Blocked',
    joined: '2024-04-20',
    initials: 'JD'
  }
])

const search = ref('')
const page = ref(1)
const pageSize = 8

const filteredUsers = computed(() => {
  if (!search.value) return rawUsers
  const term = search.value.toLowerCase()
  return rawUsers.filter((u) => {
    return (
      u.name.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize)))

const paginatedUsers = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
  const start = (page.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

const startItem = computed(() => ((page.value - 1) * pageSize) + 1)
const endItem = computed(() => Math.min(page.value * pageSize, filteredUsers.value.length))

const goToDetail = (id: number) => {
  router.push(`/admin/users/${id}`)
}

const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
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
  padding: 0.5rem 0.9rem 0.5rem 2.1rem;
  color: #e5e7eb;
  font-size: 0.85rem;
  min-width: 260px;
}

.search-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex: 1;
  position: relative;
}

.search-icon {
  color: #6b7280;
  position: absolute;
  left: 0.9rem;
  pointer-events: none;
}

.filter-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: transparent;
  color: #e5e7eb;
  font-size: 0.8rem;
  cursor: pointer;
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

.cell-user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #f97316, #ef4444);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #f9fafb;
  font-weight: 600;
}

.primary {
  color: #e5e7eb;
}

.secondary {
  color: #9ca3af;
  font-size: 0.8rem;
}

.role-pill {
  display: inline-flex;
  padding: 0.18rem 0.9rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background: rgba(129, 140, 248, 0.16);
  color: #e0e7ff;
}

.status-text {
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.status-text.active {
  color: #4ade80;
}

.status-text.blocked {
  color: #fb7185;
}

.status-text.pending {
  color: #facc15;
}

.status-icon {
  font-size: 0.95rem;
}

.th-actions {
  text-align: right;
}

.actions-cell {
  text-align: right;
  position: relative;
}

.icon-dots {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid rgba(88, 28, 135, 0.7);
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.12rem;
  cursor: pointer;
}

.icon-dots span {
  width: 0.18rem;
  height: 0.18rem;
  border-radius: 999px;
  background: #e5e7eb;
}

.actions-menu {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  min-width: 180px;
  background: #020617;
  border-radius: 0.9rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.85);
  padding: 0.35rem 0.25rem 0.45rem;
  z-index: 30;
  max-height: none;
  overflow: visible;
}

.actions-menu button {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
  color: #e5e7eb;
  border-radius: 0.6rem;
  cursor: pointer;
}

.actions-menu button:hover {
  background: rgba(30, 64, 175, 0.45);
}

.actions-menu button.danger {
  color: #fb7185;
}

.actions-title {
  font-size: 0.75rem;
  color: #9ca3af;
  padding: 0.3rem 0.8rem 0.1rem;
}

.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-menu-enter-to,
.fade-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
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
