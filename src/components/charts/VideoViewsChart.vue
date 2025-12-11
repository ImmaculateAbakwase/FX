<template>
  <div class="chart-card span-6">
    <div class="chart-header">
      <h3 class="chart-title">Weekly Video Views</h3>
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

const videoViewsData = [
  { name: 'Mon', views: 3200 },
  { name: 'Tue', views: 4100 },
  { name: 'Wed', views: 3800 },
  { name: 'Thu', views: 5200 },
  { name: 'Fri', views: 6800 },
  { name: 'Sat', views: 7400 },
  { name: 'Sun', views: 6200 }
]

const series = computed(() => [
  {
    name: 'Views',
    data: videoViewsData.map(d => d.views)
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 280,
    toolbar: { show: false },
    background: 'transparent'
  },
  colors: ['#2563eb'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%'
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
    categories: videoViewsData.map(d => d.name),
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
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val: number) => `${val.toLocaleString()} views`
    }
  }
}))
</script>

<style scoped>
</style>
