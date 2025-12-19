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
          <button class="admin-theme-toggle" @click="themeStore.toggleTheme" :aria-pressed="!themeStore.isDark" title="Toggle theme">
            <span class="admin-theme-toggle-track">
              <span
                class="admin-theme-toggle-thumb"
                :class="{ 'admin-theme-toggle-thumb--light': !themeStore.isDark }"
              ></span>
            </span>
          </button>
          <button class="icon-button notification-button">
            <i class="bi-bell icon"></i>
            <span class="notification-dot"></span>
          </button>
          <div class="kflix-user-block">
            <div class="kflix-user-text">
              <p class="user-name">Lucius King</p>
              <p class="user-role">Super Admin</p>
            </div>
            <div class="kflix-user-avatar" @click="toggleProfileMenu">
              LK
            </div>

            <transition name="fade">
              <div v-if="showProfileMenu" class="profile-menu">
                <button class="profile-menu-item" @click="handleCreateUser">
                  <i class="bi-person-plus"></i>
                  <span>Create User</span>
                </button>
                <button class="profile-menu-item" @click="handleResetPassword">
                  <i class="bi-key"></i>
                  <span>Reset Password</span>
                </button>
                <button class="profile-menu-item" @click="handleLogout">
                  <i class="bi-box-arrow-right"></i>
                  <span>Log out</span>
                </button>
              </div>
            </transition>
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
        <!-- Only show dashboard content on /admin/dashboard -->
        <template v-if="$route.path === '/admin/dashboard'">
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
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

// Import your chart components
import RevenueChart from '@/components/charts/RevenueChart.vue'
import ContentDistributionChart from '@/components/charts/ContentDistributionChart.vue'
import VideoViewsChart from '@/components/charts/VideoViewsChart.vue'
import CategoryPerformanceChart from '@/components/charts/CategoryPerformanceChart.vue'
import TopCreatorsTable from '@/components/charts/TopCreatorsTable.vue'
import RecentActivityList from '@/components/charts/RecentActivityList.vue'
import PlatformMetricsChart from '@/components/charts/PlatformMetricsChart.vue'

const router = useRouter()
const themeStore = useThemeStore()

// Sidebar state
const sidebarOpen = ref(true)
const activeItem = ref('dashboard')
const showProfileMenu = ref(false)

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
    path: '/admin/dashboard'
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'bi-people',
    submenu: [
      { id: 'users-list', label: 'Users List', icon: 'bi-people', path: '/admin/users' },
      { id: 'users-profile', label: 'View Profile', icon: 'bi-person', path: '/admin/users/profile' },
      { id: 'users-devices', label: 'Devices & Sessions', icon: 'bi-phone', path: '/admin/users/devices' },
      { id: 'users-roles', label: 'Roles & Permissions', icon: 'bi-shield-lock', path: '/admin/users/roles' },
      { id: 'users-kyc', label: 'KYC Verification', icon: 'bi-file-earmark-text', path: '/admin/users/kyc' }
    ]
  },
  {
    id: 'creators',
    label: 'K-Tube',
    icon: 'bi-camera-video',
    submenu: [
      { id: 'creators-list', label: 'Creator List', icon: 'bi-people', path: '/admin/creators' },
      { id: 'creators-kyc', label: 'KYC Submissions', icon: 'bi-file-earmark-text', path: '/admin/creators/kyc' },
      { id: 'creators-tiers', label: 'Creator Tiers', icon: 'bi-star', path: '/admin/creators/tiers' },
      { id: 'creators-channels', label: 'Channel Management', icon: 'bi-layers', path: '/admin/creators/channels' },
      { id: 'creators-strikes', label: 'Strike Policy', icon: 'bi-flag', path: '/admin/creators/strikes' },
      { id: 'creators-revenue', label: 'Revenue & Payouts', icon: 'bi-wallet2', path: '/admin/creators/revenue' }
    ]
  },
  {
    id: 'streaming',
    label: 'Video Streaming',
    icon: 'bi-play-btn',
    submenu: [
      { id: 'streaming-assets', label: 'Video Assets', icon: 'bi-collection-play', path: '/admin/video-streaming/list' },
      { id: 'add-video', label: 'Add New Video', icon: 'bi-upload', path: '/admin/video-streaming/add-video' },
      { id: 'live-event', label: 'Create Live Event', icon: 'bi-broadcast', path: '/admin/video-streaming/create-live-event' },
      { id: 'live-events-list', label: 'Live Events List', icon: 'bi-calendar-event', path: '/admin/video-streaming/live-events' },
      { id: 'streaming-mux', label: 'Mux Asset Control', icon: 'bi-cloud', path: '/admin/video-streaming/mux' }
    ]
  },
  {
    id: 'music',
    label: 'KFLIX Music',
    icon: 'bi-music-note-beamed',
    submenu: [
      { id: 'music-spotify', label: 'Spotify Integration', icon: 'bi-lightning-charge', path: '/admin/music/spotify' },
      { id: 'music-tracks', label: 'Track Browser', icon: 'bi-music-note-list', path: '/admin/music/tracks' },
      { id: 'music-playlists', label: 'Playlist Management', icon: 'bi-collection', path: '/admin/music/playlists' },
      { id: 'music-rooms', label: 'Listening Rooms', icon: 'bi-headphones', path: '/admin/music/rooms' },
      { id: 'music-artists', label: 'Artist Profiles', icon: 'bi-star', path: '/admin/music/artists' }
    ]
  },
  {
    id: 'gaming',
    label: 'KFLIX Play',
    icon: 'bi-controller',
    submenu: [
      { id: 'game-add', label: 'Add New Game', icon: 'bi-plus-circle', path: '/admin/gaming/add-game' },
      { id: 'game-list', label: 'Mini-Games List', icon: 'bi-controller', path: '/admin/gaming/list' },
      { id: 'game-approve', label: 'Approve Games', icon: 'bi-check-circle', path: '/admin/gaming/approve-game' },
      { id: 'gaming-leaderboards', label: 'Leaderboards', icon: 'bi-trophy', path: '/admin/gaming/leaderboards' },
      { id: 'gaming-rewards', label: 'Rewards & XP', icon: 'bi-star', path: '/admin/gaming/rewards' },
      { id: 'gaming-rooms', label: 'Multiplayer Rooms', icon: 'bi-people', path: '/admin/gaming/rooms' },
      { id: 'gaming-tournaments', label: 'Tournaments', icon: 'bi-trophy', path: '/admin/gaming/tournaments' }
    ]
  },
  {
    id: 'moderation',
    label: 'Community Moderation',
    icon: 'bi-shield-check',
    submenu: [
      { id: 'mod-videos', label: 'Reported Videos', icon: 'bi-camera-video-off', path: '/admin/moderation/videos' },
      { id: 'mod-comments', label: 'Reported Comments', icon: 'bi-chat-left-text', path: '/admin/moderation/comments' },
      { id: 'mod-chats', label: 'Reported Chats', icon: 'bi-chat-dots', path: '/admin/moderation/chats' },
      { id: 'mod-profiles', label: 'Reported Profiles', icon: 'bi-person-x', path: '/admin/moderation/profiles' },
      { id: 'mod-actions', label: 'Moderation Actions', icon: 'bi-shield-lock', path: '/admin/moderation/actions' }
    ]
  },
  {
    id: 'homepage',
    label: 'Homepage & Curation',
    icon: 'bi-graph-up-arrow',
    submenu: [
      { id: 'home-banners', label: 'Featured Banners', icon: 'bi-stars', path: '/admin/homepage/banners' },
      { id: 'home-trending', label: 'Trending Rows', icon: 'bi-graph-up', path: '/admin/homepage/trending' },
      { id: 'home-editor', label: 'Row Editor', icon: 'bi-layers', path: '/admin/homepage/editor' },
      { id: 'home-schedule', label: 'Schedule Changes', icon: 'bi-box', path: '/admin/homepage/schedule' }
    ]
  },
  {
    id: 'store',
    label: 'Store & Commerce',
    icon: 'bi-bag-check',
    submenu: [
      { id: 'store-plans', label: 'Plans & Pricing', icon: 'bi-credit-card', path: '/admin/store/plans' },
      { id: 'store-payments', label: 'Payment Gateway', icon: 'bi-credit-card-2-front', path: '/admin/store/payments' },
      { id: 'store-transactions', label: 'Transaction Logs', icon: 'bi-receipt', path: '/admin/store/transactions' },
      { id: 'store-ppv', label: 'PPV & Bundles', icon: 'bi-ticket-perforated', path: '/admin/store/ppv' },
      { id: 'store-merch', label: 'Merchandise', icon: 'bi-bag', path: '/admin/store/merch' },
      { id: 'store-wallet', label: 'Wallet Management', icon: 'bi-wallet2', path: '/admin/store/wallet' }
    ]
  },
  {
    id: 'support',
    label: 'Support & Ticketing',
    icon: 'bi-life-preserver',
    submenu: [
      { id: 'support-inbox', label: 'Ticket Inbox', icon: 'bi-inbox', path: '/admin/support/inbox' },
      { id: 'support-assign', label: 'Assign Tickets', icon: 'bi-person-check', path: '/admin/support/assign' },
      { id: 'support-sla', label: 'SLA Monitoring', icon: 'bi-bar-chart', path: '/admin/support/sla' }
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bi-bell',
    submenu: [
      { id: 'notif-push', label: 'Push Notifications', icon: 'bi-bell', path: '/admin/notifications/push' },
      { id: 'notif-email', label: 'Email Templates', icon: 'bi-envelope', path: '/admin/notifications/email' },
      { id: 'notif-sms', label: 'SMS Templates', icon: 'bi-chat-text', path: '/admin/notifications/sms' },
      { id: 'notif-system', label: 'System Messages', icon: 'bi-info-circle', path: '/admin/notifications/system' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: 'bi-bar-chart-line',
    path: '/admin/analytics'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'bi-lightning-charge',
    path: '/admin/integrations'
  },
  {
    id: 'settings',
    label: 'Platform Settings',
    icon: 'bi-gear',
    path: '/admin/settings'
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    icon: 'bi-shield-lock',
    path: '/admin/security'
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

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const handleLogout = () => {
  showProfileMenu.value = false
  router.push('/auth/login')
}

const handleCreateUser = () => {
  showProfileMenu.value = false
  router.push('/admin/users/create')
}

const handleResetPassword = () => {
  showProfileMenu.value = false
  router.push('/auth/reset-password')
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

.profile-menu {
  position: absolute;
  right: 0;
  top: 120%;
  min-width: 190px;
  background: #111827;
  border-radius: 0.75rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);
  padding: 0.35rem 0.35rem 0.4rem;
  z-index: 40;
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.profile-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.6rem;
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, transform 0.12s ease;
}

.profile-menu-item i {
  font-size: 1rem;
}

.profile-menu-item:hover {
  background: linear-gradient(90deg, rgba(248, 113, 113, 0.1), rgba(59, 130, 246, 0.18));
  color: #f9fafb;
  transform: translateY(-1px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>