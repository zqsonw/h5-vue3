<template>
  <div class="page">
    <div class="header">
      <h1>产品中心</h1>
    </div>
    <div class="content">
      <!-- 分类标签 -->
      <div class="category-tabs">
        <div 
          class="cat-tab" 
          v-for="cat in categories" 
          :key="cat"
          :class="{ active: currentCat === cat }"
          @click="currentCat = cat"
        >
          {{ cat }}
        </div>
      </div>
      
      <!-- 产品列表 -->
      <div class="product-list">
        <div 
          class="product-large" 
          v-for="product in filteredProducts" 
          :key="product.title"
        >
          <div class="product-img-large">{{ product.icon }}</div>
          <div class="product-info">
            <div class="product-title">{{ product.title }}</div>
            <div class="product-tags">
              <span class="tag" v-for="tag in product.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="product-price-large">
              {{ product.price }} 
              <span class="original">{{ product.originalPrice }}</span>
            </div>
            <button class="btn-buy" @click="addToCart(product)">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ref(['全部', '门锁', '灯光', '插座', '传感器'])
const currentCat = ref('全部')

const products = ref([
  {
    title: '智能门锁 Pro X5',
    icon: '🔒',
    tags: ['指纹解锁', '人脸识别', '远程开锁'],
    price: '¥1,299',
    originalPrice: '¥1,599',
    category: '门锁'
  },
  {
    title: '智能灯光控制套装',
    icon: '💡',
    tags: ['1600万色', '语音控制', '定时开关'],
    price: '¥599',
    originalPrice: '¥799',
    category: '灯光'
  },
  {
    title: '智能插座 PowerSafe S3',
    icon: '🔌',
    tags: ['远程控制', '电量统计', '过载保护'],
    price: '¥99',
    originalPrice: '¥129',
    category: '插座'
  },
  {
    title: '智能安防摄像头',
    icon: '📷',
    tags: ['2K画质', '夜视功能', '移动侦测'],
    price: '¥399',
    originalPrice: '¥499',
    category: '传感器'
  }
])

const filteredProducts = computed(() => {
  if (currentCat.value === '全部') return products.value
  return products.value.filter(p => p.category === currentCat.value)
})

const addToCart = (product) => {
  showToast(`已加入购物车: ${product.title}`)
}

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

.category-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 15px;
  -webkit-overflow-scrolling: touch;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.cat-tab {
  padding: 8px 18px;
  background: #fff;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
}

.cat-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-large {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  gap: 15px;
}

.product-img-large {
  width: 100px;
  height: 100px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  padding: 3px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 11px;
  color: #666;
}

.product-price-large {
  font-size: 18px;
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 10px;
}

.product-price-large .original {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
  font-weight: normal;
}

.btn-buy {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  align-self: flex-start;
}

.btn-buy:active {
  opacity: 0.8;
}
</style>
