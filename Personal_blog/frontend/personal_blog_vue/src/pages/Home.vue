<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">YJX 的技术博客</h1>
        <p class="hero-subtitle">记录技术成长，分享知识果实</p>
        <div class="hero-stats">
          <span class="stat-item">
            <strong>{{ articles.length }}</strong> 篇文章
          </span>
          <span class="stat-divider"></span>
          <span class="stat-item">
            <strong>{{ categories.length }}</strong> 个分类
          </span>
        </div>
      </div>
    </section>

    <div class="home-layout">
      <!-- Main Content -->
      <div class="home-main">
        <!-- Loading -->
        <div v-if="loading" class="state-box">
          <div class="spinner"></div>
          <p>正在加载文章...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="state-box error">
          <p>{{ error }}</p>
          <button class="btn-retry" @click="loadArticles">重新加载</button>
        </div>

        <!-- Empty -->
        <div v-else-if="articles.length === 0" class="state-box">
          <p>暂无文章</p>
        </div>

        <!-- Article Grid -->
        <div v-else class="article-grid">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage <= 1"
            @click="goPage(currentPage - 1)"
          >
            上一页
          </button>
          <button
            v-for="p in visiblePages"
            :key="p"
            class="page-btn"
            :class="{ active: p === currentPage }"
            @click="goPage(p)"
          >
            {{ p }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage >= totalPages"
            @click="goPage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="home-sidebar">
        <div class="sidebar-card">
          <h3>分类</h3>
          <div class="category-list" v-if="!loadingCats">
            <router-link
              v-for="cat in categories"
              :key="cat.name"
              :to="`/categories`"
              class="category-item"
            >
              <span>{{ cat.name }}</span>
              <span class="cat-count">{{ cat.count }}</span>
            </router-link>
          </div>
        </div>

        <div class="sidebar-card">
          <h3>关于</h3>
          <p class="about-text">
            专注于前端开发与全栈技术。热爱开源，乐于分享。
          </p>
          <router-link to="/about" class="about-link">了解更多 →</router-link>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Article } from '../types'
import { fetchArticles, fetchCategories } from '../api/article'
import ArticleCard from '../components/ArticleCard.vue'

const articles = ref<Article[]>([])
const categories = ref<{ name: string; count: number }[]>([])
const loading = ref(true)
const loadingCats = ref(true)
const error = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 6

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: number[] = []
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  if (end - start < 4) {
    if (start === 1) end = Math.min(total, start + 4)
    else start = Math.max(1, end - 4)
  }
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

async function loadArticles() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetchArticles(currentPage.value, pageSize)
    if (res.code === 200) {
      articles.value = res.data.list
      totalPages.value = Math.ceil(res.data.total / pageSize)
    } else {
      error.value = res.msg || '加载失败'
    }
  } catch {
    error.value = '网络异常，请稍后重试'
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  try {
    const res = await fetchCategories()
    if (res.code === 200) categories.value = res.data
  } catch {
    // ignore
  } finally {
    loadingCats.value = false
  }
}

function goPage(page: number) {
  currentPage.value = page
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadArticles()
  loadCategories()
})
</script>

<style scoped>
.home-page {
  min-height: 60vh;
}

/* Hero */
.hero-section {
  position: relative;
  padding: 100px 24px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.08) 100%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 12px;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text);
  margin: 0 0 24px;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.stat-item {
  font-size: 14px;
  color: var(--text);
}

.stat-item strong {
  color: #4f46e5;
  font-size: 20px;
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--border);
}

/* Layout */
.home-layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
  display: flex;
  gap: 40px;
}

.home-main {
  flex: 1;
  min-width: 0;
}

.home-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* State boxes */
.state-box {
  text-align: center;
  padding: 80px 20px;
  color: var(--text);
}

.state-box p {
  font-size: 16px;
  margin-bottom: 16px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-retry {
  padding: 8px 24px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-retry:hover {
  color: #4f46e5;
  border-color: #4f46e5;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled):not(.active) {
  color: #4f46e5;
  border-color: #4f46e5;
}

.page-btn.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Sidebar */
.sidebar-card {
  background: var(--code-bg);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.sidebar-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #4f46e5;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.category-item:hover {
  background: rgba(79, 70, 229, 0.08);
  color: #4f46e5;
}

.cat-count {
  background: var(--bg);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--text);
}

.about-text {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
  margin: 0 0 12px;
}

.about-link {
  font-size: 14px;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.about-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 860px) {
  .home-layout {
    flex-direction: column;
  }

  .home-sidebar {
    width: 100%;
  }

  .hero-title {
    font-size: 32px;
  }

  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
