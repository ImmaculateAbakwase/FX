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
  background: #0a0a0a;
  color: #fff;
}
</style>