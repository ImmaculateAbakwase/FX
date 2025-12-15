<template>
  <div class="settings-shell">
    <div class="settings-header">
      <PageHeader
        title="System Settings"
        subtitle="Manage platform-wide configurations for streaming, music, gaming, payments, notifications, and security."
        icon="bi-gear"
      />
    </div>

    <div class="settings-grid">
      <aside class="settings-nav">
        <div class="settings-nav-card">
          <div class="settings-nav-title">
            <i class="bi-sliders"></i>
            <span>Settings</span>
          </div>

          <div class="settings-nav-groups custom-scrollbar">
            <div v-for="cat in categories" :key="cat.key" class="settings-nav-group">
              <button class="settings-nav-group-btn" type="button" @click="toggle(cat.key)">
                <span class="settings-nav-group-left">
                  <i :class="cat.icon"></i>
                  <span class="settings-nav-group-label">{{ cat.title }}</span>
                </span>
                <i class="bi-chevron-right" :class="{ 'chev-open': expanded[cat.key] }"></i>
              </button>

              <transition name="slide">
                <div v-if="expanded[cat.key]" class="settings-nav-links">
                  <RouterLink
                    v-for="p in cat.pages"
                    :key="p.key"
                    class="settings-nav-link"
                    :class="{ active: route.meta.settingsKey === p.key }"
                    :to="p.path"
                  >
                    <i :class="p.icon"></i>
                    <span>{{ p.title }}</span>
                  </RouterLink>
                </div>
              </transition>
            </div>
          </div>

          <RouterLink class="settings-overview" :class="{ active: route.path === '/admin/settings/overview' }" to="/admin/settings/overview">
            <i class="bi-lightning-charge"></i>
            <span>Quick Start</span>
          </RouterLink>
        </div>
      </aside>

      <section class="settings-content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/shared/PageHeader.vue'
import { settingsCategories } from './settingsSchema'

const route = useRoute()

const categories = settingsCategories

const expanded = reactive<Record<string, boolean>>({
  platform: true,
  streaming: true,
  music: false,
  gaming: false,
  payments: false,
  notifications: false,
  security: false
})

const toggle = (key: string) => {
  expanded[key] = !expanded[key]
}
</script>

<style scoped>
 :deep(.page-header) {
   display: flex;
   align-items: center;
   gap: 14px;
 }
 
 :deep(.page-header-icon) {
   width: 44px;
   height: 44px;
   border-radius: 14px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(59, 130, 246, 0.8));
   color: #ffffff;
 }
 
 :deep(.page-title) {
   margin: 0;
   font-size: 1.6rem;
   font-weight: 700;
   color: #f9fafb;
 }
 
 :deep(.page-subtitle) {
   margin: 0.25rem 0 0;
   font-size: 0.95rem;
   color: #9ca3af;
 }
 
 :root.light .settings-shell :deep(.page-title) {
   color: #111827;
 }
 
 :root.light .settings-shell :deep(.page-subtitle) {
   color: #4b5563;
 }
 
 .slide-enter-active,
 .slide-leave-active {
   transition: all 0.35s ease;
   overflow: hidden;
 }
 
 .slide-enter-from,
 .slide-leave-to {
   max-height: 0;
   opacity: 0;
 }
 
 .slide-enter-to,
 .slide-leave-from {
   max-height: 600px;
   opacity: 1;
 }
 
.settings-shell {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.settings-header {
  display: flex;
}

.settings-grid {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.settings-nav-card {
  background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.16), transparent 55%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.14), transparent 55%),
    rgba(2, 6, 23, 0.92);
  border-radius: 1.25rem;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
  position: sticky;
  top: 92px;
}

:root.light .settings-nav-card {
  background: #ffffff;
  border-color: rgba(209, 213, 219, 1);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.settings-nav-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f9fafb;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.78rem;
  padding: 0.25rem 0.35rem 0.75rem;
}

:root.light .settings-nav-title {
  color: #111827;
}

.settings-nav-groups {
  max-height: calc(100vh - 260px);
  overflow-y: auto;
  padding-right: 6px;
}

 .settings-nav-groups {
   scrollbar-width: thin;
   scrollbar-color: var(--kflix-red) transparent;
 }

 .settings-nav-groups::-webkit-scrollbar {
   width: 4px;
 }

 .settings-nav-groups::-webkit-scrollbar-track {
   background: transparent;
 }

 .settings-nav-groups::-webkit-scrollbar-thumb {
   background: rgba(255, 61, 61, 0.55);
   border-radius: 999px;
 }

 .settings-nav-groups::-webkit-scrollbar-thumb:hover {
   background: rgba(255, 61, 61, 0.8);
 }

.settings-nav-group + .settings-nav-group {
  margin-top: 6px;
}

.settings-nav-group-btn {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.55);
  color: #e5e7eb;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
}

:root.light .settings-nav-group-btn {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
  color: #111827;
}

.settings-nav-group-btn:hover {
  background: rgba(127, 29, 29, 0.25);
  border-color: rgba(248, 113, 113, 0.55);
}

:root.light .settings-nav-group-btn:hover {
  background: rgba(248, 113, 113, 0.12);
}

.settings-nav-group-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.settings-nav-group-label {
  font-weight: 600;
  font-size: 0.92rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chev-open {
  transform: rotate(90deg);
}

.settings-nav-links {
  margin: 8px 0 10px 10px;
  padding-left: 12px;
  border-left: 2px solid rgba(127, 29, 29, 0.6);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

:root.light .settings-nav-links {
  border-left-color: rgba(209, 213, 219, 1);
}

.settings-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.18s ease;
}

:root.light .settings-nav-link {
  color: #111827;
}

.settings-nav-link:hover {
  background: rgba(127, 29, 29, 0.25);
}

.settings-nav-link.active {
  background: linear-gradient(90deg, rgba(127, 29, 29, 0.8), rgba(185, 28, 28, 0.65));
  color: #ffffff;
}

.settings-overview {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.35);
  color: #e5e7eb;
  text-decoration: none;
}

:root.light .settings-overview {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
  color: #111827;
}

.settings-overview:hover {
  background: rgba(127, 29, 29, 0.25);
}

.settings-overview.active {
  background: linear-gradient(90deg, rgba(127, 29, 29, 0.8), rgba(185, 28, 28, 0.65));
  border-color: rgba(248, 113, 113, 0.6);
  color: #ffffff;
}

.settings-content {
  min-height: 60vh;
}

@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .settings-nav-card {
    position: relative;
    top: auto;
  }
}
</style>
