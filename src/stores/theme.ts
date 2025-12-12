// src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('admin-theme', () => {
  const isDark = ref(true)

  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const isLight = root.classList.contains('light')
    isDark.value = !isLight
  }

  const applyTheme = () => {
    if (typeof window === 'undefined') return
    const root = document.documentElement

    if (isDark.value) {
      root.classList.remove('light')
      localStorage.setItem('kflix-admin-theme', 'dark')
    } else {
      root.classList.add('light')
      localStorage.setItem('kflix-admin-theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(
    isDark,
    () => {
      applyTheme()
    },
    { immediate: true }
  )

  return {
    isDark,
    toggleTheme
  }
})
