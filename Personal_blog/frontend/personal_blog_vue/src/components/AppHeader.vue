<template>
  <header class="app-header" :class="{ 'header-scrolled': scrolled }">
    <div class="header-container">
      <router-link to="/" class="header-logo">
        <span class="logo-icon">Y</span>
        <span class="logo-text">YJX 博客</span>
      </router-link>

      <nav class="header-nav">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          首页
        </router-link>
        <router-link to="/categories" class="nav-link" :class="{ active: $route.path === '/categories' }">
          分类
        </router-link>
        <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">
          关于
        </router-link>
      </nav>

      <div class="header-actions">
        <template v-if="isLoggedIn">
          <span class="user-name">{{ user?.username }}</span>
          <button class="btn-logout" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">登录</router-link>
          <router-link to="/register" class="btn-register">注册</router-link>
        </template>
      </div>

      <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
        <span></span><span></span><span></span>
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <router-link to="/" class="mobile-link" @click="mobileMenuOpen = false">首页</router-link>
        <router-link to="/categories" class="mobile-link" @click="mobileMenuOpen = false">分类</router-link>
        <router-link to="/about" class="mobile-link" @click="mobileMenuOpen = false">关于</router-link>
        <template v-if="isLoggedIn">
          <span class="mobile-link user-label">{{ user?.username }}</span>
          <button class="mobile-link logout-btn" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="mobile-link" @click="mobileMenuOpen = false">登录</router-link>
          <router-link to="/register" class="mobile-link" @click="mobileMenuOpen = false">注册</router-link>
        </template>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'

const router = useRouter()
const { user, isLoggedIn, logout } = useUserStore()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function handleLogout() {
  logout()
  mobileMenuOpen.value = false
  router.push('/')
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.header-scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
}

.header-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-h);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--text-h);
  background: var(--code-bg);
}

.nav-link.active {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: var(--text-h);
  font-weight: 500;
}

.btn-login {
  padding: 8px 20px;
  border-radius: 8px;
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-login:hover {
  background: rgba(79, 70, 229, 0.08);
}

.btn-register {
  padding: 8px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-register:hover {
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
  transform: translateY(-1px);
}

.btn-logout {
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  color: #ef4444;
  border-color: #ef4444;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-h);
  border-radius: 2px;
  transition: 0.3s;
}

.mobile-menu {
  display: none;
  padding: 12px 24px 20px;
  border-top: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
}

.mobile-link {
  display: block;
  padding: 10px 0;
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.mobile-link:hover {
  color: #4f46e5;
}

.user-label {
  color: var(--text-h);
  font-weight: 600;
}

.logout-btn {
  color: #ef4444;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .header-actions {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}

@media (prefers-color-scheme: dark) {
  .app-header {
    background: rgba(22, 23, 29, 0.85);
  }
  .mobile-menu {
    background: rgba(22, 23, 29, 0.95);
  }
}
</style>
