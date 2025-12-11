<template>
  <div class="page-shell">
    <header class="page-header">
      <div>
        <h1 class="page-title">User Details</h1>
        <p class="page-subtitle">Full profile and activity snapshot.</p>
      </div>
      <button class="btn ghost" type="button" @click="goBack">Back to Users</button>
    </header>

    <section class="card">
      <div class="user-header">
        <div class="avatar-lg">{{ user.initials }}</div>
        <div>
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-meta">@{{ user.username }} • {{ user.role }}</p>
          <p class="user-meta">Joined {{ user.joined }}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-block">
          <h3>Contact</h3>
          <p><span class="label">Email:</span> {{ user.email }}</p>
          <p><span class="label">Phone:</span> {{ user.phone }}</p>
        </div>

        <div class="info-block">
          <h3>Status</h3>
          <p>
            <span class="label">Account:</span>
            <span :class="['status-pill', user.status]">{{ user.statusLabel }}</span>
          </p>
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

const user = computed(() => ({
  id,
  name: 'Sample User',
  username: 'sample',
  email: 'sample@example.com',
  phone: '+256 700 000000',
  role: 'Admin',
  status: 'active',
  statusLabel: 'Active',
  joined: '2024-04-05',
  initials: 'SU'
}))

const goBack = () => {
  router.push('/admin/users')
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

.user-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.25rem;
}

.avatar-lg {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #f97316, #ef4444);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9fafb;
  font-weight: 600;
}

.user-name {
  color: #e5e7eb;
  font-size: 1.25rem;
}

.user-meta {
  color: #9ca3af;
  font-size: 0.85rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.info-block h3 {
  font-size: 0.95rem;
  color: #e5e7eb;
  margin-bottom: 0.45rem;
}

.info-block p {
  font-size: 0.85rem;
  color: #d1d5db;
}

.label {
  color: #9ca3af;
  margin-right: 0.35rem;
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
</style>
