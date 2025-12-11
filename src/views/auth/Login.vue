<template>
  <div class="main-content expanded">

    <div class="auth-page-wrapper">
      <div class="auth-container auth-container--scrollable">
        <div class="auth-background">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
          <div class="gradient-orb orb-3"></div>
        </div>

        <div class="auth-card">
          <div class="auth-content animate-in">
            <div class="logo-container">
              <img src="@/assets/images/logo.png" alt="KFLIX Logo" class="logo-image" />
              <span class="logo-admin-text">ADMIN</span>
            </div>

            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Your Dashboard. Your Control.</p>

            <div class="auth-form">
              <div class="input-group">
                <label for="email" class="input-label">Email Address</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    placeholder="you@example.com"
                    class="auth-input"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>

              <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="formData.password"
                    placeholder="••••••••"
                    class="auth-input"
                    @keyup.enter="handleLogin"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="togglePasswordVisibility"
                    tabindex="-1"
                  >
                    <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'" class="eye-icon"></i>
                  </button>
                </div>
              </div>

              <button @click="goToForgotPassword" class="forgot-link">
                Forgot Password?
              </button>

              <button @click="handleLogin" class="auth-button primary-button">
                <span>Sign In</span>
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface LoginFormData {
  email: string
  password: string
}

const router = useRouter()
const route = useRoute()

const formData = ref<LoginFormData>({
  email: '',
  password: ''
})

const showPassword = ref(false)

const togglePasswordVisibility = (): void => {
  showPassword.value = !showPassword.value
}

const handleLogin = (): void => {
  console.log('Login attempt:', formData.value)
  // Add your authentication logic here
  // Example: await authService.login(formData.value)
  router.push('/dashboard') // Redirect to dashboard after successful login
}

const goToForgotPassword = (): void => {
  router.push('/auth/forgot-password')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>