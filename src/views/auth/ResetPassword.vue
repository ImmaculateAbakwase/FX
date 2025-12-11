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
            <p class="auth-subtitle">Enter your new password to continue</p>

            <div class="auth-form">
              <div class="input-group">
                <label for="new-password" class="input-label">New Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 11V7a5 5 0 10-10 0v4"
                    />
                  </svg>
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    id="new-password"
                    v-model="newPassword"
                    placeholder="Enter new password"
                    class="auth-input"
                  />
                  <button type="button" class="password-toggle" @click="showNewPassword = !showNewPassword">
                    <i :class="showNewPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="input-group">
                <label for="confirm-password" class="input-label">Confirm Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 11V7a5 5 0 10-10 0v4"
                    />
                  </svg>
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirm-password"
                    v-model="confirmPassword"
                    placeholder="Confirm new password"
                    class="auth-input"
                    @keyup.enter="handleSubmit"
                  />
                  <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                    <i :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
              </div>

              <button @click="handleSubmit" class="auth-button primary-button">
                <span>Reset Password</span>
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
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
import { useRouter } from 'vue-router'

const router = useRouter()

const newPassword = ref<string>('')
const confirmPassword = ref<string>('')
const showNewPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)

const handleSubmit = (): void => {
  if (!newPassword.value || !confirmPassword.value) {
    alert('Please fill in both password fields.')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  console.log('Password reset to:', newPassword.value)
  // TODO: Call your API to update the password here.
  // On success, redirect to login
  router.push('/auth/login')
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>

<style scoped>
.password-toggle {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.35rem;
}

.password-toggle i {
  font-size: 1rem;
}
</style>
