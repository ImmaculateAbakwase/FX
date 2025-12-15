<template>
  <div class="settings-home">
    <div class="settings-home-card">
      <div class="settings-home-hero">
        <div class="hero-left">
          <h2 class="hero-title">Settings Overview</h2>
          <p class="hero-subtitle">Jump into any category to configure KFLIX platform behavior.</p>
        </div>
        <div class="hero-right">
          <div class="hero-chip"><i class="bi-shield-lock"></i><span>Security</span></div>
          <div class="hero-chip"><i class="bi-play-btn"></i><span>Streaming</span></div>
          <div class="hero-chip"><i class="bi-credit-card"></i><span>Payments</span></div>
        </div>
      </div>

      <div class="settings-home-grid">
        <RouterLink v-for="cat in categories" :key="cat.key" class="settings-tile" :to="cat.pages[0]?.path || '/admin/settings/overview'">
          <div class="settings-tile-icon">
            <i :class="cat.icon"></i>
          </div>
          <div class="settings-tile-body">
            <h3 class="settings-tile-title">{{ cat.title }}</h3>
            <p class="settings-tile-sub">{{ cat.pages.length }} pages</p>
          </div>
          <i class="bi-chevron-right settings-tile-chev"></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { settingsCategories } from './settingsSchema'

const categories = settingsCategories
</script>

<style scoped>
.settings-home {
  display: flex;
}

.settings-home-card {
  width: 100%;
  background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.16), transparent 55%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.14), transparent 55%),
    rgba(2, 6, 23, 0.92);
  border-radius: 1.25rem;
  padding: 1.25rem 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
}

:root.light .settings-home-card {
  background: #ffffff;
  border-color: rgba(209, 213, 219, 1);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.settings-home-hero {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

:root.light .settings-home-hero {
  border-bottom-color: rgba(209, 213, 219, 1);
}

.hero-title {
  margin: 0;
  font-size: 1.35rem;
  color: #f9fafb;
  font-weight: 700;
}

:root.light .hero-title {
  color: #111827;
}

.hero-subtitle {
  margin: 0.2rem 0 0;
  color: #9ca3af;
}

:root.light .hero-subtitle {
  color: #4b5563;
}

.hero-right {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #e5e7eb;
  font-weight: 600;
  font-size: 0.85rem;
}

:root.light .hero-chip {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
  color: #111827;
}

.settings-home-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.settings-tile {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 16px;
  padding: 14px 14px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}

:root.light .settings-tile {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
}

.settings-tile:hover {
  transform: translateY(-1px);
  border-color: rgba(248, 113, 113, 0.55);
  background: rgba(127, 29, 29, 0.18);
}

:root.light .settings-tile:hover {
  background: rgba(248, 113, 113, 0.12);
}

.settings-tile-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(59, 130, 246, 0.8));
  color: #ffffff;
}

.settings-tile-title {
  margin: 0;
  color: #f9fafb;
  font-weight: 700;
  font-size: 1rem;
}

:root.light .settings-tile-title {
  color: #111827;
}

.settings-tile-sub {
  margin: 4px 0 0;
  color: #9ca3af;
  font-size: 0.85rem;
}

:root.light .settings-tile-sub {
  color: #4b5563;
}

.settings-tile-chev {
  color: #9ca3af;
}
</style>
