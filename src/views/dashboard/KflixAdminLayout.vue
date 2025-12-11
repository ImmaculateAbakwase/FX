<template>
  <div class="kflix-dashboard">
    <!-- Navbar -->
    <nav class="kflix-navbar">
      <div class="kflix-navbar-inner">
        <div class="kflix-navbar-left">
          <button class="icon-button" @click="toggleSidebar">
            <i :class="sidebarOpen ? 'bi-chevron-left' : 'bi-list'" class="icon"></i>
          </button>
          <div class="kflix-logo-block">
            <img src="@/assets/images/logo.png" alt="KFLIX Logo" class="kflix-navbar-logo" />
            <span class="kflix-logo-admin-text">ADMIN</span>
          </div>
        </div>
        <div class="kflix-navbar-search">
          <div class="search-wrapper">
            <i class="bi-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Search users, videos, creators..." />
          </div>
        </div>
        <div class="kflix-navbar-right">
          <button class="icon-button notification-button">
            <i class="bi-bell icon"></i>
            <span class="notification-dot"></span>
          </button>
          <div class="kflix-user-block">
            <div class="kflix-user-text">
              <p class="user-name">Lucius King</p>
              <p class="user-role">Super Admin</p>
            </div>
            <div class="kflix-user-avatar">LK</div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="kflix-sidebar" :class="{ 'kflix-sidebar-open': sidebarOpen, 'kflix-sidebar-closed': !sidebarOpen }">
      <div class="kflix-sidebar-scroll custom-scrollbar">
        <nav class="kflix-menu">
          <div v-for="item in menuItems" :key="item.id" class="kflix-menu-item-block">
            <button
              class="kflix-menu-item"
              :class="{ 'kflix-menu-item-active': activeItem === item.id }"
              @click="onMenuClick(item)"
            >
              <div class="kflix-menu-main">
                <i :class="item.icon" class="menu-icon"></i>
                <span class="menu-label">{{ item.label }}</span>
              </div>
              <i
                v-if="item.submenu?.length"
                class="bi-chevron-right submenu-chevron"
                :class="{ 'submenu-open': expandedMenus[item.id] }"
              ></i>
            </button>

            <!-- Submenu with smooth slide animation -->
            <transition name="slide">
              <div v-if="item.submenu?.length && expandedMenus[item.id]" class="kflix-submenu">
                <button
                  v-for="sub in item.submenu"
                  :key="sub.id"
                  class="kflix-submenu-item"
                  :class="{ 'kflix-submenu-item-active': activeItem === sub.id }"
                  @click="navigateTo(sub.path, sub.id)"
                >
                  <i :class="sub.icon" class="submenu-icon"></i>
                  <span class="submenu-label">{{ sub.label }}</span>
                </button>
              </div>
            </transition>
          </div>
        </nav>

        <!-- System Status Card -->
        <div class="kflix-sidebar-footer">
          <div class="system-status-card">
            <div class="system-status-header">
              <i class="bi-hdd-network system-status-icon"></i>
              <span class="system-status-title">System Status</span>
            </div>
            <div class="system-status-row">
              <span class="status-label">Active Users</span>
              <span class="status-value status-value-green">1,284</span>
            </div>
            <div class="system-status-row">
              <span class="status-label">Live Streams</span>
              <span class="status-value status-value-blue">23</span>
            </div>
            <div class="system-status-row">
              <span class="status-label">Server Load</span>
              <span class="status-value status-value-amber">67%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="kflix-main" :class="{ 'kflix-main-with-sidebar': sidebarOpen }">
      <div class="kflix-main-inner">
        <!-- Only show dashboard content on /dashboard -->
        <template v-if="$route.path === '/dashboard'">
          <div class="kflix-main-header">
            <h2 class="welcome-title">Welcome back, Lucius!</h2>
            <p class="welcome-subtitle">Here's what's happening with KFLIX today.</p>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
              <div class="stat-card-header">
                <div :class="['stat-icon-wrapper', stat.bgClass]">
                  <i :class="stat.icon" class="stat-icon"></i>
                </div>
                <span class="stat-change">{{ stat.change }}</span>
              </div>
              <h3 class="stat-value">{{ stat.value }}</h3>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Charts -->
          <div class="charts-grid">
            <RevenueChart />
            <ContentDistributionChart />
            <VideoViewsChart />
            <CategoryPerformanceChart />
            <TopCreatorsTable />
            <RecentActivityList />
            <PlatformMetricsChart />
          </div>
        </template>

        <!-- All other pages (Add Video, Add Game, etc.) render here -->
        <router-view v-else />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Import your chart components
import RevenueChart from '@/components/charts/RevenueChart.vue'
import ContentDistributionChart from '@/components/charts/ContentDistributionChart.vue'
import VideoViewsChart from '@/components/charts/VideoViewsChart.vue'
import CategoryPerformanceChart from '@/components/charts/CategoryPerformanceChart.vue'
import TopCreatorsTable from '@/components/charts/TopCreatorsTable.vue'
import RecentActivityList from '@/components/charts/RecentActivityList.vue'
import PlatformMetricsChart from '@/components/charts/PlatformMetricsChart.vue'

const router = useRouter()
const route = useRoute()

// Sidebar state
const sidebarOpen = ref(true)
const activeItem = ref('dashboard')
const expandedMenus = reactive<Record<string, boolean>>({
  streaming: true,
  gaming: false
})

// Types
interface MenuSubItem {
  id: string
  label: string
  icon: string
  path: string
}

interface MenuItem {
  id: string
  label: string
  icon: string
  path?: string
  submenu?: MenuSubItem[]
}

// Full menu with working navigation paths
const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'bi-speedometer2',
    path: '/dashboard'
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'bi-people',
    submenu: [
      { id: 'users-list', label: 'Users List', icon: 'bi-people', path: '/users' },
      { id: 'users-profile', label: 'View Profile', icon: 'bi-person', path: '/users/profile' },
      { id: 'users-devices', label: 'Devices & Sessions', icon: 'bi-phone', path: '/users/devices' },
      { id: 'users-roles', label: 'Roles & Permissions', icon: 'bi-shield-lock', path: '/users/roles' },
      { id: 'users-kyc', label: 'KYC Verification', icon: 'bi-file-earmark-text', path: '/users/kyc' }
    ]
  },
  {
    id: 'creators',
    label: 'Creator Management',
    icon: 'bi-camera-video',
    submenu: [
      { id: 'creators-list', label: 'Creator List', icon: 'bi-people', path: '/creators' },
      { id: 'creators-kyc', label: 'KYC Submissions', icon: 'bi-file-earmark-text', path: '/creators/kyc' },
      { id: 'creators-tiers', label: 'Creator Tiers', icon: 'bi-star', path: '/creators/tiers' },
      { id: 'creators-channels', label: 'Channel Management', icon: 'bi-layers', path: '/creators/channels' },
      { id: 'creators-strikes', label: 'Strike Policy', icon: 'bi-flag', path: '/creators/strikes' },
      { id: 'creators-revenue', label: 'Revenue & Payouts', icon: 'bi-wallet2', path: '/creators/revenue' }
    ]
  },
  {
    id: 'streaming',
    label: 'Video Streaming',
    icon: 'bi-play-btn',
    submenu: [
      { id: 'streaming-assets', label: 'Video Assets', icon: 'bi-collection-play', path: '/video-streaming/list' },
      { id: 'add-video', label: 'Add New Video', icon: 'bi-upload', path: '/video-streaming/add-video' },
      { id: 'add-episode', label: 'Add Episode', icon: 'bi-plus-circle', path: '/video-streaming/add-episode' },
      { id: 'live-event', label: 'Create Live Event', icon: 'bi-broadcast', path: '/video-streaming/create-live-event' },
      { id: 'live-events-list', label: 'Live Events List', icon: 'bi-calendar-event', path: '/video-streaming/live-events' },
      { id: 'streaming-mux', label: 'Mux Asset Control', icon: 'bi-cloud', path: '/video-streaming/mux' }
    ]
  },
  {
    id: 'music',
    label: 'KFLIX Music',
    icon: 'bi-music-note-beamed',
    submenu: [
      { id: 'music-spotify', label: 'Spotify Integration', icon: 'bi-lightning-charge', path: '/music/spotify' },
      { id: 'music-tracks', label: 'Track Browser', icon: 'bi-music-note-list', path: '/music/tracks' },
      { id: 'music-playlists', label: 'Playlist Management', icon: 'bi-collection', path: '/music/playlists' },
      { id: 'music-rooms', label: 'Listening Rooms', icon: 'bi-headphones', path: '/music/rooms' },
      { id: 'music-artists', label: 'Artist Profiles', icon: 'bi-star', path: '/music/artists' }
    ]
  },
  {
    id: 'gaming',
    label: 'KFLIX Play',
    icon: 'bi-controller',
    submenu: [
      { id: 'game-add', label: 'Add New Game', icon: 'bi-plus-circle', path: '/gaming/add-game' },
      { id: 'game-list', label: 'Mini-Games List', icon: 'bi-controller', path: '/gaming/list' },
      { id: 'game-approve', label: 'Approve Games', icon: 'bi-check-circle', path: '/gaming/approve-game' },
      { id: 'gaming-leaderboards', label: 'Leaderboards', icon: 'bi-trophy', path: '/gaming/leaderboards' },
      { id: 'gaming-rewards', label: 'Rewards & XP', icon: 'bi-star', path: '/gaming/rewards' },
      { id: 'gaming-rooms', label: 'Multiplayer Rooms', icon: 'bi-people', path: '/gaming/rooms' },
      { id: 'gaming-tournaments', label: 'Tournaments', icon: 'bi-trophy', path: '/gaming/tournaments' }
    ]
  },
  {
    id: 'moderation',
    label: 'Community Moderation',
    icon: 'bi-shield-check',
    submenu: [
      { id: 'mod-videos', label: 'Reported Videos', icon: 'bi-camera-video-off', path: '/moderation/videos' },
      { id: 'mod-comments', label: 'Reported Comments', icon: 'bi-chat-left-text', path: '/moderation/comments' },
      { id: 'mod-chats', label: 'Reported Chats', icon: 'bi-chat-dots', path: '/moderation/chats' },
      { id: 'mod-profiles', label: 'Reported Profiles', icon: 'bi-person-x', path: '/moderation/profiles' },
      { id: 'mod-actions', label: 'Moderation Actions', icon: 'bi-shield-lock', path: '/moderation/actions' }
    ]
  },
  {
    id: 'homepage',
    label: 'Homepage & Curation',
    icon: 'bi-graph-up-arrow',
    submenu: [
      { id: 'home-banners', label: 'Featured Banners', icon: 'bi-stars', path: '/homepage/banners' },
      { id: 'home-trending', label: 'Trending Rows', icon: 'bi-graph-up', path: '/homepage/trending' },
      { id: 'home-editor', label: 'Row Editor', icon: 'bi-layers', path: '/homepage/editor' },
      { id: 'home-schedule', label: 'Schedule Changes', icon: 'bi-box', path: '/homepage/schedule' }
    ]
  },
  {
    id: 'store',
    label: 'Store & Commerce',
    icon: 'bi-bag-check',
    submenu: [
      { id: 'store-plans', label: 'Plans & Pricing', icon: 'bi-credit-card', path: '/store/plans' },
      { id: 'store-payments', label: 'Payment Gateway', icon: 'bi-credit-card-2-front', path: '/store/payments' },
      { id: 'store-transactions', label: 'Transaction Logs', icon: 'bi-receipt', path: '/store/transactions' },
      { id: 'store-ppv', label: 'PPV & Bundles', icon: 'bi-ticket-perforated', path: '/store/ppv' },
      { id: 'store-merch', label: 'Merchandise', icon: 'bi-bag', path: '/store/merch' },
      { id: 'store-wallet', label: 'Wallet Management', icon: 'bi-wallet2', path: '/store/wallet' }
    ]
  },
  {
    id: 'support',
    label: 'Support & Ticketing',
    icon: 'bi-life-preserver',
    submenu: [
      { id: 'support-inbox', label: 'Ticket Inbox', icon: 'bi-inbox', path: '/support/inbox' },
      { id: 'support-assign', label: 'Assign Tickets', icon: 'bi-person-check', path: '/support/assign' },
      { id: 'support-sla', label: 'SLA Monitoring', icon: 'bi-bar-chart', path: '/support/sla' }
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bi-bell',
    submenu: [
      { id: 'notif-push', label: 'Push Notifications', icon: 'bi-bell', path: '/notifications/push' },
      { id: 'notif-email', label: 'Email Templates', icon: 'bi-envelope', path: '/notifications/email' },
      { id: 'notif-sms', label: 'SMS Templates', icon: 'bi-chat-text', path: '/notifications/sms' },
      { id: 'notif-system', label: 'System Messages', icon: 'bi-info-circle', path: '/notifications/system' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'bi-bar-chart-line',
    path: '/analytics'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'bi-lightning-charge',
    path: '/integrations'
  },
  {
    id: 'settings',
    label: 'Platform Settings',
    icon: 'bi-gear',
    path: '/settings'
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    icon: 'bi-shield-lock',
    path: '/security'
  }
]

const stats = [
  { label: 'Total Users', value: '24,563', change: '+12.5%', icon: 'bi-people', bgClass: 'bg-blue' },
  { label: 'Active Creators', value: '1,847', change: '+8.2%', icon: 'bi-camera-video', bgClass: 'bg-purple' },
  { label: 'Revenue Today', value: '$12,394', change: '+23.1%', icon: 'bi-graph-up-arrow', bgClass: 'bg-green' },
  { label: 'Live Events', value: '23', change: '+5', icon: 'bi-broadcast', bgClass: 'bg-red' }
]

// Sidebar controls
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const onMenuClick = (item: MenuItem) => {
  if (item.submenu?.length) {
    expandedMenus[item.id] = !expandedMenus[item.id]
  } else if (item.path) {
    router.push(item.path)
    activeItem.value = item.id
  }
}

const navigateTo = (path: string, id: string) => {
  router.push(path)
  activeItem.value = id
}
</script>

<style scoped src="@/assets/styles/DashboardStyles.css"></style>

<style scoped>
/* Smooth submenu animation */
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
</style>