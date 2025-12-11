<template>
  <div class="chart-card span-8">
    <div class="chart-header">
      <h3 class="chart-title">Top Performing Creators</h3>
      <button class="chart-filter">View All</button>
    </div>
    <div class="list-container">
      <div
        v-for="(creator, index) in topCreators"
        :key="index"
        class="list-item"
      >
        <div class="list-item-left">
          <div class="list-item-avatar">
            {{ creator.name.split(' ').map((n: string) => n[0]).join('') }}
          </div>
          <div class="list-item-info">
            <h4>{{ creator.name }}</h4>
            <p>{{ creator.username }}</p>
          </div>
        </div>
        <div class="list-item-right">
          <div class="list-item-stat">
            <p class="list-item-stat-value">{{ creator.subscribers }}</p>
            <p class="list-item-stat-label">Subscribers</p>
          </div>
          <div class="list-item-stat">
            <p class="list-item-stat-value">{{ creator.views }}</p>
            <p class="list-item-stat-label">Total Views</p>
          </div>
          <div class="list-item-stat">
            <p class="list-item-stat-value revenue">{{ creator.revenue }}</p>
            <p class="list-item-stat-label">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Creator {
  name: string
  username: string
  subscribers: string
  views: string
  revenue: string
}

const topCreators: Creator[] = [
  { name: 'Sarah Johnson', username: '@sarahcreates', subscribers: '125K', views: '2.4M', revenue: '$8,240' },
  { name: 'Mike Chen', username: '@miketech', subscribers: '98K', views: '1.8M', revenue: '$6,890' },
  { name: 'Emma Davis', username: '@emmavlogs', subscribers: '156K', views: '3.1M', revenue: '$9,120' },
  { name: 'Alex Rivera', username: '@alexgaming', subscribers: '203K', views: '4.2M', revenue: '$12,450' }
]
</script>

<style scoped>

.list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(17, 24, 39, 0.3);
  border: 1px solid #1f2937;
  border-radius: 8px;
  transition: all 0.2s;
}

.list-item:hover {
  background: rgba(17, 24, 39, 0.5);
  border-color: rgba(220, 38, 38, 0.3);
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.list-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #dc2626, #9333ea);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.list-item-info h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.list-item-info p {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

.list-item-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.list-item-stat {
  text-align: center;
  min-width: 80px;
}

.list-item-stat-value {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.list-item-stat-value.revenue {
  color: #4ade80;
}

.list-item-stat-label {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
}
</style>
