<template>
  <div class="form-section">
    <h3 class="form-section-title">{{ title }}</h3>
    <div class="form-section-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>