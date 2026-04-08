<template>
  <div class="tab-bar">
    <router-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="tab-item"
      :class="{ active: currentRoute === route.path }"
    >
      <div class="tab-icon">{{ route.meta.icon }}</div>
      <div class="tab-label">{{ route.meta.title }}</div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'

const route = useRoute()
const currentRoute = computed(() => route.path)

const routes = router.getRoutes().filter(r => r.meta?.title)
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 60px;
  background: #fff;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 1000;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.tab-icon {
  font-size: 22px;
  transition: all 0.3s;
}

.tab-label {
  font-size: 11px;
  color: #999;
  transition: all 0.3s;
}

.tab-item.active .tab-icon {
  transform: scale(1.1);
}

.tab-item.active .tab-label {
  color: #667eea;
  font-weight: 500;
}

.tab-item:active {
  opacity: 0.7;
}

/* 安全区域适配 */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .tab-bar {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(60px + env(safe-area-inset-bottom));
  }
}
</style>
