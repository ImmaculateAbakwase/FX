<template>
  <div class="chart-card span-6">
    <div class="chart-header">
      <h3 class="chart-title">Category Performance</h3>
    </div>
    <apexchart
      type="bar"
      height="280"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const categoryPerformance = [
  { category: 'Entertainment', views: 12500, revenue: 4200 },
  { category: 'Education', views: 8900, revenue: 3100 },
  { category: 'Gaming', views: 15600, revenue: 5800 },
  { category: 'Music', views: 10200, revenue: 3900 }
]

const series = computed(() => [
  {
    name: 'Views',
    data: categoryPerformance.map(d => d.views)
  },
  {
    name: 'Revenue ($)',
    data: categoryPerformance.map(d => d.revenue)
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 280,
    toolbar: { show: false },
    background: 'transparent'
  },
  colors: ['#9333ea', '#16a34a'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: true
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: '#1f2937',
    strokeDashArray: 3
  },
  xaxis: {
    categories: categoryPerformance.map(d => d.category),
    labels: {
      style: { colors: '#9ca3af', fontSize: '12px' }
    },
    axisBorder: { color: '#1f2937' }
  },
  yaxis: {
    labels: {
      style: { colors: '#9ca3af', fontSize: '12px' }
    }
  },
  legend: {
    labels: {
      colors: '#ffffff'
    }
  },
  tooltip: {
    theme: 'dark'
  }
}))
</script>

<style scoped>
</style>
