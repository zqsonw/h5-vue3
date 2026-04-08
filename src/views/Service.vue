<template>
  <div class="page">
    <div class="header">
      <h1>服务支持</h1>
    </div>
    <div class="content">
      <!-- 服务入口 -->
      <div class="service-grid">
        <div 
          class="service-item" 
          v-for="service in services" 
          :key="service.name"
          @click="showToast(`即将开放: ${service.name}`)"
        >
          <div class="service-icon">{{ service.icon }}</div>
          <div class="service-name">{{ service.name }}</div>
        </div>
      </div>
      
      <!-- 常见问题 -->
      <div class="section">
        <div class="section-title">常见问题</div>
        <div class="faq-list">
          <div 
            class="faq-item" 
            v-for="(faq, index) in faqs" 
            :key="index"
            :class="{ active: faq.open }"
          >
            <div class="faq-question" @click="faq.open = !faq.open">
              <span>{{ faq.question }}</span>
              <span class="faq-arrow">▼</span>
            </div>
            <div class="faq-answer">{{ faq.answer }}</div>
          </div>
        </div>
      </div>
      
      <!-- 联系方式 -->
      <div class="section">
        <div class="section-title">联系我们</div>
        <div class="contact-list">
          <div class="contact-item" v-for="contact in contacts" :key="contact.label">
            <div class="contact-icon">{{ contact.icon }}</div>
            <div class="contact-info">
              <div class="contact-label">{{ contact.label }}</div>
              <div class="contact-value">{{ contact.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  { name: '在线客服', icon: '📞' },
  { name: '预约安装', icon: '🔧' },
  { name: '售后申请', icon: '📝' },
  { name: '服务进度', icon: '📋' }
])

const faqs = ref([
  {
    question: '如何连接智能设备到手机？',
    answer: '下载智慧家居APP，注册账号后，点击"添加设备"，按照提示操作即可。',
    open: false
  },
  {
    question: '支持哪些语音助手？',
    answer: '目前支持小爱同学、天猫精灵、百度小度、华为小艺等主流语音助手。',
    open: false
  },
  {
    question: '设备离线怎么办？',
    answer: '请检查WiFi网络是否正常，尝试重启设备，或长按复位键重新配网。',
    open: false
  },
  {
    question: '质保期是多久？',
    answer: '所有产品享受2年质保，门锁类产品提供3年质保服务。',
    open: false
  }
])

const contacts = ref([
  { icon: '📞', label: '客服热线', value: '400-888-8888' },
  { icon: '💬', label: '在线客服', value: '9:00-21:00 在线' },
  { icon: '📧', label: '邮箱', value: 'support@smarthome.com' }
])

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

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #fff;
  padding: 20px 15px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.service-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.service-name {
  font-size: 12px;
  color: #333;
}

.service-item:active {
  transform: scale(0.98);
}

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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
}

.faq-question {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.faq-arrow {
  font-size: 12px;
  color: #999;
  transition: transform 0.3s;
}

.faq-item.active .faq-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 15px;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.faq-item.active .faq-answer {
  padding: 0 15px 15px;
  max-height: 200px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.contact-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
</style>
