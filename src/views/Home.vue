<template>
  <div class="page">
    <div class="header">
      <h1>智慧家居</h1>
    </div>
    <div class="content">
      <!-- 轮播图 -->
      <div class="banner">
        <div 
          class="banner-slide" 
          v-for="(slide, index) in banners" 
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="showToast(`查看详情: ${slide.title}`)"
        >
          <div class="banner-img" :style="{ background: slide.bg }">
            {{ slide.title }}
          </div>
        </div>
        <div class="banner-dots">
          <span 
            v-for="(_, index) in banners" 
            :key="index"
            class="dot"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
      
      <!-- 快捷入口 -->
      <div class="quick-entry">
        <div 
          class="entry-item" 
          v-for="item in quickEntries" 
          :key="item.name"
          @click="showToast(`即将开放: ${item.name}`)"
        >
          <div class="entry-icon" :style="{ background: item.bg }">{{ item.icon }}</div>
          <span>{{ item.name }}</span>
        </div>
      </div>
      
      <!-- 推荐产品 -->
      <div class="section">
        <div class="section-title">热门推荐</div>
        <div class="product-grid">
          <div 
            class="product-card" 
            v-for="product in products" 
            :key="product.name"
            @click="showToast(`查看详情: ${product.name}`)"
          >
            <div class="product-img">{{ product.icon }}</div>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">{{ product.price }}</div>
          </div>
        </div>
      </div>
      
      <!-- 智能场景 -->
      <div class="section">
        <div class="section-title">智能场景</div>
        <div class="scene-list">
          <div 
            class="scene-item" 
            v-for="scene in scenes" 
            :key="scene.name"
          >
            <div class="scene-icon" :style="{ background: scene.bg }">{{ scene.icon }}</div>
            <div class="scene-info">
              <div class="scene-name">{{ scene.name }}</div>
              <div class="scene-desc">{{ scene.desc }}</div>
            </div>
            <div 
              class="scene-switch" 
              :class="{ active: scene.active }"
              @click="toggleScene(scene)"
            >
              <div class="switch" :class="{ active: scene.active }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 轮播图数据
const banners = ref([
  { title: '智能门锁 Pro', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: '全屋灯光控制', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: '智能插座套装', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
])

const currentSlide = ref(0)
let slideInterval = null

// 快捷入口
const quickEntries = ref([
  { name: '智能场景', icon: '🏠', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '安防监控', icon: '🔒', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: '灯光控制', icon: '💡', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: '能耗管理', icon: '⚡', bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
])

// 产品数据
const products = ref([
  { name: '智能门锁 X5', price: '¥1,299', icon: '🔒' },
  { name: '智能灯泡套装', price: '¥299', icon: '💡' },
  { name: '智能插座 S3', price: '¥99', icon: '🔌' },
  { name: '智能摄像头', price: '¥399', icon: '📷' }
])

// 场景数据
const scenes = ref([
  { name: '起床模式', desc: '窗帘自动打开，灯光渐亮', icon: '🌅', bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', active: true },
  { name: '睡眠模式', desc: '关闭所有灯光，启动安防', icon: '🌙', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', active: false },
  { name: '回家模式', desc: '自动开灯，空调开启', icon: '🏠', bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', active: false }
])

// 切换场景
const toggleScene = (scene) => {
  scene.active = !scene.active
}

// 轮播图逻辑
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length
}

const goToSlide = (index) => {
  clearInterval(slideInterval)
  currentSlide.value = index
  startSlideShow()
}

const startSlideShow = () => {
  slideInterval = setInterval(nextSlide, 3000)
}

// Toast 提示
const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.innerHTML = message
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    text-align: center;
  `
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 0.3s'
    setTimeout(() => toast.remove(), 300)
  }, 2000)
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  clearInterval(slideInterval)
})
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header h1 {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.content {
  padding: 15px;
}

/* 轮播图 */
.banner {
  position: relative;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
}

.banner-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.banner-slide.active {
  opacity: 1;
}

.banner-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.banner-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transition: all 0.3s;
  cursor: pointer;
}

.dot.active {
  background: #fff;
  width: 20px;
  border-radius: 4px;
}

/* 快捷入口 */
.quick-entry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #fff;
  padding: 20px 15px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.entry-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.entry-item span {
  font-size: 12px;
  color: #333;
}

.entry-item:active {
  transform: scale(0.98);
}

/* 区块 */
.section {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 3px solid #667eea;
}

/* 产品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.product-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
}

.product-card:active {
  transform: scale(0.98);
}

.product-img {
  font-size: 40px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 13px;
  color: #333;
  margin-bottom: 6px;
}

.product-price {
  font-size: 15px;
  color: #ff6b6b;
  font-weight: 600;
}

/* 场景 */
.scene-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scene-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.scene-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-right: 15px;
}

.scene-info {
  flex: 1;
}

.scene-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.scene-desc {
  font-size: 12px;
  color: #999;
}

.scene-switch {
  width: 50px;
  height: 28px;
  background: #ddd;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.scene-switch.active {
  background: #667eea;
}

.switch {
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.switch.active {
  transform: translateX(22px);
}
</style>
