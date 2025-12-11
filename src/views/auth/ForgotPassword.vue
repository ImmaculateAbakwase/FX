<template>
  <div class="main-content expanded">
    <div class="auth-page-wrapper">
      <div class="auth-container">
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

            <h1 class="auth-title">Reset Password</h1>
            <p class="auth-subtitle">We'll send you a reset link</p>

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
                    v-model="email"
                    placeholder="you@example.com"
                    class="auth-input"
                    @keyup.enter="handleResetPassword"
                  />
                </div>
              </div>

              <button @click="handleResetPassword" class="auth-button primary-button">
                <span>Send Reset Link</span>
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <div class="auth-footer">
              <p class="footer-text">
                Remember your password?
                <button @click="goToLogin" class="link-button">
                  Sign In
                </button>
              </p>
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

const router = useRouter()
const route = useRoute()

const email = ref<string>('')

const handleResetPassword = (): void => {
  console.log('Reset password for:', email.value)
  // Add your password reset logic here
  // Example: await authService.resetPassword(email.value)
  // router.push('/auth/login') // Redirect to login after sending reset link
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>