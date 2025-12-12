import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/AuthStyles.css'

function initializeAdminTheme() {
  if (typeof window === 'undefined') return

  const storedTheme = localStorage.getItem('kflix-admin-theme') as 'light' | 'dark' | null

  let theme: 'light' | 'dark'

  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme = storedTheme
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    theme = prefersLight ? 'light' : 'dark'
  }

  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
  } else {
    root.classList.remove('light')
  }
}

initializeAdminTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('apexchart', VueApexCharts)

app.mount('#app')