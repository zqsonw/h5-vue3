<template>
  <div class="page">
    <div class="header">
      <h1>个人中心</h1>
    </div>
    <div class="content">
      <!-- 用户信息 -->
      <div class="user-card" @click="showToast('请先登录')">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <div class="user-name">点击登录</div>
          <div class="user-level">普通会员</div>
        </div>
        <div class="user-arrow">›</div>
      </div>
      
      <!-- 订单状态 -->
      <div class="order-status">
        <div 
          class="status-item" 
          v-for="status in orderStatus" 
          :key="status.name"
          @click="showToast(`查看${status.name}`)"
        >
          <div class="status-icon">{{ status.icon }}</div>
          <div class="status-name">{{ status.name }}</div>
        </div>
      </div>
      
      <!-- 功能列表 -->
      <div class="menu-list" v-for="(group, index) in menuGroups" :key="index">
        <div 
          class="menu-item" 
          v-for="item in group" 
          :key="item.name"
          @click="handleMenuClick(item)"
        >
          <div class="menu-icon">{{ item.icon }}</div>
          <div class="menu-name">{{ item.name }}</div>
          <div class="menu-arrow">›</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const orderStatus = [
  { name: '待付款', icon: '💰' },
  { name: '待发货', icon: '📦' },
  { name: '待收货', icon: '🚚' },
  { name: '待评价', icon: '💬' },
  { name: '售后', icon: '🔧' }
]

const menuGroups = [
  [
    { name: '我的订单', icon: '📋' },
    { name: '我的收藏', icon: '❤️' },
    { name: '我的设备', icon: '🏠' },
    { name: '优惠券', icon: '🎫' },
    { name: '地址管理', icon: '📍' }
  ],
  [
    { name: '设置', icon: '⚙️' },
    { name: '帮助与反馈', icon: '❓' },
    { name: '关于我们', icon: '⭐' }
  ]
]

const handleMenuClick = (item) => {
  if (item.name === '关于我们') {
    showToast('智慧家居 v1.0\n让科技温暖生活')
  } else {
    showToast(`即将开放: ${item.name}`)
  }
}

const showToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.innerHTML = message.replace(/\n/g, '<br>')
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

.user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  color: #fff;
  cursor: pointer;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.user-level {
  font-size: 12px;
  opacity: 0.8;
}

.user-arrow {
  font-size: 24px;
  opacity: 0.6;
}

.order-status {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: #fff;
  padding: 20px 10px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.status-icon {
  font-size: 24px;
}

.status-name {
  font-size: 11px;
  color: #666;
}

.status-item:active {
  opacity: 0.7;
}

.menu-list {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 24px;
  margin-right: 12px;
  font-size: 18px;
}

.menu-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.menu-arrow {
  font-size: 18px;
  color: #ccc;
}

.menu-item:active {
  background: #f8f9fa;
}
</style>
