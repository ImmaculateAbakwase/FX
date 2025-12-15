import type { RouteRecordRaw } from 'vue-router'
import { settingsCategories } from './settingsSchema'

export const buildSettingsRoutes = (): RouteRecordRaw[] => {
  const children: RouteRecordRaw[] = [
    {
      path: 'overview',
      name: 'SettingsOverview',
      component: () => import('./SettingsHome.vue'),
      meta: { title: 'System Settings - KFLIX', requiresAuth: true }
    },
    {
      path: '',
      redirect: '/admin/settings/overview'
    }
  ]

  for (const cat of settingsCategories) {
    for (const page of cat.pages) {
      children.push({
        path: page.path.replace('/admin/settings/', ''),
        name: `Settings_${page.key}`,
        component: () => import('./SettingsPage.vue'),
        meta: {
          title: `${page.title} - KFLIX`,
          requiresAuth: true,
          settingsKey: page.key
        }
      })
    }
  }

  return [
    {
      path: 'settings',
      component: () => import('./SettingsLayout.vue'),
      meta: { requiresAuth: true },
      children
    }
  ]
}
