<template>
  <div class="chart-card span-4">
    <div class="chart-header">
      <h3 class="chart-title">Recent Activity</h3>
    </div>
    <div class="activity-list">
      <div
        v-for="(activity, index) in recentActivity"
        :key="index"
        class="activity-item"
      >
        <div :class="['activity-icon', activity.color]">
          <i :class="activity.icon" class="icon"></i>
        </div>
        <div class="activity-content">
          <h4 class="activity-title">{{ activity.title }}</h4>
          <p class="activity-description">{{ activity.description }}</p>
        </div>
        <div class="activity-time">{{ activity.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  title: string
  description: string
  time: string
  icon: string
  color: string
}

const recentActivity: Activity[] = [
  { title: 'New Creator Approved', description: 'Alex Rivera completed KYC verification', time: '5 min ago', icon: 'bi-person-check', color: 'green' },
  { title: 'Payment Processed', description: '$12,450 paid to 23 creators', time: '23 min ago', icon: 'bi-wallet2', color: 'blue' },
  { title: 'Content Flagged', description: 'Video reported for review', time: '1 hour ago', icon: 'bi-flag', color: 'red' },
  { title: 'Live Stream Started', description: 'Gaming tournament went live', time: '2 hours ago', icon: 'bi-broadcast', color: 'purple' }
]
</script>

<style scoped>

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #1f2937;
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.blue {
  background: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
}

.activity-icon.green {
  background: rgba(22, 163, 74, 0.2);
  color: #4ade80;
}

.activity-icon.purple {
  background: rgba(147, 51, 234, 0.2);
  color: #a78bfa;
}

.activity-icon.red {
  background: rgba(220, 38, 38, 0.2);
  color: #f87171;
}

.activity-icon .icon {
  font-size: 18px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.activity-description {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

.activity-time {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
}
</style>
