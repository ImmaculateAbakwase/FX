<template>
  <div class="page-header">
    <div class="page-header-icon">
      <i :class="icon"></i>
    </div>
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  icon: string
}>()
</script>