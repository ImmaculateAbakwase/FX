<template>
  <div class="app-container">
    <Sidebar />
    <router-view />
  </div>
</template>


<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: var(--dark-bg);
  color: var(--text-primary);
}
</style>