<template>
  <div class="chart-card span-12">
    <div class="chart-header">
      <h3 class="chart-title">Platform Resource Usage</h3>
    </div>
    <div class="metrics-grid">
      <div
        v-for="(metric, index) in platformMetrics"
        :key="index"
        class="metric-item"
      >
        <div class="progress-label">
          <span class="label-text">{{ metric.label }}</span>
          <span class="label-value">{{ metric.value }} / {{ metric.total }} {{ metric.unit }}</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(metric.value / metric.total) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Metric {
  label: string
  value: number
  total: number
  unit: string
}

const platformMetrics: Metric[] = [
  { label: 'Storage Used', value: 67, total: 100, unit: 'TB' },
  { label: 'Bandwidth', value: 82, total: 100, unit: 'TB/mo' },
  { label: 'API Calls', value: 45, total: 100, unit: 'M/day' }
]
</script>

<style scoped>

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.metric-item {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 8px;
}

.label-text {
  color: #d1d5db;
  font-weight: 500;
}

.label-value {
  color: #9ca3af;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #dc2626, #9333ea);
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>
