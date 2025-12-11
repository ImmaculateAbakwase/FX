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

            <h1 class="auth-title">OTP Verification</h1>

            <div class="otp-email-text" v-if="email">
              <span>Code sent to </span>
              <strong>{{ email }}</strong>
            </div>

            <p class="otp-instruction">Enter the 6-digit code below to continue.</p>

            <div class="otp-input-row">
              <input
                v-for="(digit, index) in otpDigits"
                :key="index"
                ref="setOtpInputRefs"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="auth-input otp-input"
                v-model="otpDigits[index]"
                @input="onDigitInput($event, index)"
                @keydown.backspace.prevent="onBackspace(index)"
              />
            </div>

            <div class="otp-resend-wrapper">
              <button
                class="forgot-link resend-link"
                type="button"
                :disabled="isResendDisabled"
                @click="handleResend"
              >
                Resend OTP
              </button>
              <span v-if="isResendDisabled" class="resend-timer">in {{ remainingTime }}s</span>
            </div>

            <button @click="handleVerify" class="auth-button primary-button">
              <span>Verify OTP</span>
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>

            <button type="button" class="forgot-link back-to-login" @click="goBackToLogin">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const email = ref<string | null>((route.query.email as string) || null)

const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpInputRefs = ref<HTMLInputElement[]>([])
const setOtpInputRefs = (el: HTMLInputElement | null) => {
  if (el && !otpInputRefs.value.includes(el)) {
    otpInputRefs.value.push(el)
  }
}

const isResendDisabled = ref(true)
const remainingTime = ref(30)
let timerId: number | null = null

const startTimer = () => {
  isResendDisabled.value = true
  remainingTime.value = 30
  if (timerId !== null) {
    clearInterval(timerId)
  }
  timerId = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1
    } else {
      isResendDisabled.value = false
      if (timerId !== null) {
        clearInterval(timerId)
        timerId = null
      }
    }
  }, 1000)
}

const onDigitInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')
  otpDigits.value[index] = value.slice(-1)

  if (otpDigits.value[index] && index < otpDigits.value.length - 1) {
    otpInputRefs.value[index + 1]?.focus()
  }
}

const onBackspace = (index: number) => {
  if (otpDigits.value[index]) {
    otpDigits.value[index] = ''
  } else if (index > 0) {
    otpInputRefs.value[index - 1]?.focus()
    otpDigits.value[index - 1] = ''
  }
}

const handleResend = () => {
  if (isResendDisabled.value) return
  console.log('Resend OTP for', email.value)
  // TODO: call API to resend OTP
  startTimer()
}

const handleVerify = () => {
  const otp = otpDigits.value.join('')
  console.log('Verify OTP:', otp, 'for', email.value)
  // TODO: call API to verify OTP
  router.push('/dashboard')
}

const goBackToLogin = () => {
  router.push({ path: '/auth/login', query: { email: email.value || '' } })
}

onMounted(() => {
  startTimer()
  if (otpInputRefs.value[0]) {
    otpInputRefs.value[0].focus()
  }
})

onBeforeUnmount(() => {
  if (timerId !== null) {
    clearInterval(timerId)
  }
})
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>

<style scoped>
.otp-input-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.5rem 0 1rem;
}

.otp-input {
  width: 42px;
  height: 42px;
  text-align: center;
  font-size: 1.1rem;
  padding: 0;
}

.otp-resend-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}

.resend-link[disabled] {
  opacity: 0.6;
  cursor: default;
}

.resend-timer {
  font-size: 0.85rem;
}
</style>
