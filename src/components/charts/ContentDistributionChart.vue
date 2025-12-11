<template>
  <div class="chart-card span-4">
    <div class="chart-header">
      <h3 class="chart-title">Content Distribution</h3>
    </div>
    <apexchart
      type="donut"
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const contentDistribution = [
  { name: 'Videos', value: 45 },
  { name: 'Music', value: 30 },
  { name: 'Games', value: 15 },
  { name: 'Live', value: 10 }
]

const series = computed(() => contentDistribution.map(d => d.value))

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 300,
    background: 'transparent'
  },
  colors: ['#dc2626', '#9333ea', '#2563eb', '#16a34a'],
  labels: contentDistribution.map(d => d.name),
  legend: {
    position: 'bottom',
    labels: {
      colors: '#ffffff'
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val}%`,
    style: {
      colors: ['#ffffff'],
      fontSize: '14px',
      fontWeight: 600
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 600,
            formatter: () => '100%'
          }
        }
      }
    }
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val: number) => `${val}%`
    }
  }
}))
</script>

<style scoped>
</style>
