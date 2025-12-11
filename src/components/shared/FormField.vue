<template>
  <div class="form-field">
    <label class="form-label">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
}>()
</script>