<template>
  <div class="create-user-page">
    <header class="page-header">
      <div>
        <h1 class="page-title">Create New User</h1>
        <p class="page-subtitle">Add a new admin or platform user to the KFLIX ecosystem.</p>
      </div>
    </header>

    <section class="form-shell">
      <div class="form-grid">
        <div class="form-main">
          <div class="field-row two-col">
            <div class="field">
              <label for="fullName">Full Name</label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                placeholder="Enter full name"
              />
            </div>
            <div class="field">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                placeholder="Unique username"
              />
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="email">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="user@example.com"
              />
            </div>
          </div>

          <div class="field-row two-col">
            <div class="field">
              <label for="phone">Phone Number</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="e.g. +256 700 000000"
              />
            </div>
            <div class="field">
              <label for="role">Role</label>
              <select id="role" v-model="form.role">
                <option disabled value="">Select role</option>
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support Agent</option>
              </select>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="notes">Notes (optional)</label>
              <textarea
                id="notes"
                v-model="form.notes"
                rows="3"
                placeholder="Internal notes about this user (visibility: admins only)."
              ></textarea>
            </div>
          </div>
        </div>

        <aside class="form-side">
          <div class="side-card">
            <h2>Access Overview</h2>
            <p class="side-text">
              Choose the appropriate role to control what this user can manage inside KFLIX Admin.
            </p>
            <ul class="side-list">
              <li>
                <span class="dot super"></span>
                <div>
                  <p class="side-label">Super Admin</p>
                  <p class="side-desc">Full access to all modules and settings.</p>
                </div>
              </li>
              <li>
                <span class="dot admin"></span>
                <div>
                  <p class="side-label">Admin</p>
                  <p class="side-desc">Manages content, users, and day-to-day operations.</p>
                </div>
              </li>
              <li>
                <span class="dot mod"></span>
                <div>
                  <p class="side-label">Moderator</p>
                  <p class="side-desc">Handles community reports and content flags.</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <footer class="form-footer">
        <button class="btn ghost" type="button" @click="goBack">Cancel</button>
        <button class="btn primary" type="button" @click="handleSubmit">Create User</button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface CreateUserForm {
  fullName: string
  username: string
  email: string
  phone: string
  role: string
  notes: string
}

const form = reactive<CreateUserForm>({
  fullName: '',
  username: '',
  email: '',
  phone: '',
  role: '',
  notes: ''
})

const goBack = () => {
  router.push('/admin/dashboard')
}

const handleSubmit = () => {
  console.log('Create user payload', { ...form })
  // TODO: integrate with backend API
}
</script>

<style scoped>
.create-user-page {
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

.form-shell {
  background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.18), transparent 55%),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 55%),
    #020617;
  border-radius: 1.25rem;
  padding: 1.5rem 1.75rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
}

.form-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 1.75rem;
}

.form-main {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row.two-col {
  flex-direction: row;
  gap: 1.1rem;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

.field input,
.field select,
.field textarea {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.55);
  padding: 0.65rem 0.85rem;
  color: #e5e7eb;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #6b7280;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.35);
  background: rgba(15, 23, 42, 1);
}

.form-side {
  align-self: stretch;
}

.side-card {
  height: 100%;
  background: radial-gradient(circle at top, rgba(248, 113, 113, 0.25), transparent 55%),
    rgba(15, 23, 42, 0.98);
  border-radius: 1rem;
  padding: 1.2rem 1.1rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.side-card h2 {
  font-size: 1rem;
  font-weight: 600;
  color: #f9fafb;
}

.side-text {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: #9ca3af;
}

.side-list {
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
}

.side-list li {
  display: flex;
  gap: 0.55rem;
}

.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
}

.dot.super {
  background: #fb7185;
}

.dot.admin {
  background: #38bdf8;
}

.dot.mod {
  background: #a855f7;
}

.side-label {
  font-size: 0.85rem;
  color: #e5e7eb;
}

.side-desc {
  font-size: 0.8rem;
  color: #9ca3af;
}

.form-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  border-radius: 999px;
  padding: 0.55rem 1.45rem;
  font-size: 0.9rem;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.1s ease, box-shadow 0.18s ease;
}

.btn.ghost {
  background: transparent;
  color: #e5e7eb;
  border-color: rgba(148, 163, 184, 0.6);
}

.btn.ghost:hover {
  background: rgba(15, 23, 42, 0.9);
}

.btn.primary {
  background: linear-gradient(90deg, #f97316, #ef4444);
  color: #f9fafb;
  box-shadow: 0 14px 30px rgba(248, 113, 113, 0.35);
}

.btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(248, 113, 113, 0.45);
}

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .form-side {
    order: -1;
  }

  .form-shell {
    padding: 1.25rem 1.1rem;
  }

  .field-row.two-col {
    flex-direction: column;
  }
}
</style>
