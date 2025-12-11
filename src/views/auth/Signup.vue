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
            </div>

            <h1 class="auth-title">Create Account</h1>
            <p class="auth-subtitle">Start your entertainment journey</p>

            <div class="auth-form">
              <div class="input-group">
                <label for="fullName" class="input-label">Full Name</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    id="fullName"
                    v-model="formData.fullName"
                    placeholder="John Doe"
                    class="auth-input"
                  />
                </div>
              </div>

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
                    type="password"
                    id="password"
                    v-model="formData.password"
                    placeholder="••••••••"
                    class="auth-input"
                  />
                </div>
              </div>

              <div class="input-group">
                <label for="confirmPassword" class="input-label">Confirm Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    placeholder="••••••••"
                    class="auth-input"
                    @keyup.enter="handleSignUp"
                  />
                </div>
              </div>

              <button @click="handleSignUp" class="auth-button primary-button">
                <span>Create Account</span>
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div class="auth-footer">
              <p class="footer-text">
                Already have an account?
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
import { useRouter } from 'vue-router'

interface SignUpFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

const router = useRouter()

const formData = ref<SignUpFormData>({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignUp = (): void => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  
  console.log('Sign up attempt:', formData.value)
  // Add your registration logic here
  // Example: await authService.register(formData.value)
  // router.push('/auth/login') // Redirect to login after successful signup
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>