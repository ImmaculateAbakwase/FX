<template>
  <div class="chart-card span-8">
    <div class="chart-header">
      <h3 class="chart-title">Revenue & User Growth</h3>
      <select v-model="selectedPeriod" class="chart-filter">
        <option value="7months">Last 7 Months</option>
        <option value="30days">Last 30 Days</option>
        <option value="year">Last Year</option>
      </select>
    </div>
    <apexchart
      type="area"
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedPeriod = ref('7months')

const revenueData = [
  { name: 'Jan', revenue: 4200, users: 240 },
  { name: 'Feb', revenue: 5100, users: 298 },
  { name: 'Mar', revenue: 4800, users: 267 },
  { name: 'Apr', revenue: 6200, users: 389 },
  { name: 'May', revenue: 7800, users: 456 },
  { name: 'Jun', revenue: 8400, users: 502 },
  { name: 'Jul', revenue: 9200, users: 578 }
]

const series = computed(() => [
  {
    name: 'Revenue ($K)',
    data: revenueData.map(d => d.revenue)
  },
  {
    name: 'New Users',
    data: revenueData.map(d => d.users)
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent'
  },
  colors: ['#dc2626', '#9333ea'],
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.3,
      opacityTo: 0.1
    }
  },
  grid: {
    borderColor: '#1f2937',
    strokeDashArray: 3
  },
  xaxis: {
    categories: revenueData.map(d => d.name),
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
    theme: 'dark',
    style: {
      fontSize: '12px'
    }
  }
}))
</script>

<style scoped>
</style>
