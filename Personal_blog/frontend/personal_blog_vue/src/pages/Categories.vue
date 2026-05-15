<template>
  <div class="categories-page">
    <div class="page-header">
      <h1>文章分类</h1>
      <p>浏览不同分类下的文章</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="state-box">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-box error">
      <p>{{ error }}</p>
    </div>

    <!-- Categories Grid -->
    <div v-else class="categories-grid">
      <div
        v-for="cat in categories"
        :key="cat.name"
        class="category-card"
        :style="{ '--accent': getCategoryColor(cat.name) }"
        @click="filterByCategory(cat.name)"
      >
        <div class="cat-icon">{{ getCategoryIcon(cat.name) }}</div>
        <h2 class="cat-name">{{ cat.name }}</h2>
        <p class="cat-count">{{ cat.count }} 篇文章</p>
      </div>
    </div>

    <!-- Filtered articles -->
    <div v-if="selectedCategory" class="filtered-section">
      <div class="filtered-header">
        <h2>分类：{{ selectedCategory }}</h2>
        <button class="btn-clear" @click="clearFilter">清除筛选</button>
      </div>

      <div v-if="loadingArticles" class="state-box">
        <div class="spinner"></div>
      </div>

      <div v-else-if="filteredArticles.length === 0" class="state-box">
        <p>该分类下暂无文章</p>
      </div>

      <div v-else class="article-list">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-row"
          @click="goArticle(article.id)"
        >
          <div class="row-main">
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
          </div>
          <span class="row-date">{{ article.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchArticles, fetchCategories } from '../api/article'
import type { Article } from '../types'

const router = useRouter()
const categories = ref<{ name: string; count: number }[]>([])
const loading = ref(true)
const error = ref('')
const selectedCategory = ref('')
const filteredArticles = ref<Article[]>([])
const loadingArticles = ref(false)

const categoryColors: Record<string, string> = {
  '前端开发': '#4f46e5',
  'CSS': '#06b6d4',
  'TypeScript': '#3178c6',
  '后端开发': '#059669',
  '开发工具': '#d97706',
  'UI/UX': '#db2777',
}

function getCategoryColor(name: string): string {
  return categoryColors[name] || '#4f46e5'
}

function getCategoryIcon(name: string): string {
  const icons: Record<string, string> = {
    '前端开发': '{ }',
    'CSS': '#',
    'TypeScript': 'TS',
    '后端开发': '</>',
    '开发工具': '⚙',
    'UI/UX': '◆',
  }
  return icons[name] || '•'
}

function filterByCategory(name: string) {
  selectedCategory.value = name
  loadFilteredArticles(name)
}

function clearFilter() {
  selectedCategory.value = ''
  filteredArticles.value = []
}

async function loadFilteredArticles(category: string) {
  loadingArticles.value = true
  try {
    const res = await fetchArticles(1, 50, category)
    if (res.code === 200) {
      filteredArticles.value = res.data.list
    }
  } catch {
    // ignore
  } finally {
    loadingArticles.value = false
  }
}

function goArticle(id: number) {
  router.push(`/article/${id}`)
}

onMounted(async () => {
  try {
    const res = await fetchCategories()
    if (res.code === 200) {
      categories.value = res.data
    }
  } catch {
    error.value = '加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.categories-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 8px;
}

.page-header p {
  font-size: 16px;
  color: var(--text);
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.category-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.cat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  margin: 0 auto 16px;
  font-family: ui-monospace, monospace;
}

.cat-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 8px;
}

.cat-count {
  font-size: 14px;
  color: var(--text);
  margin: 0;
}

.filtered-section {
  margin-top: 24px;
}

.filtered-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filtered-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0;
}

.btn-clear {
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear:hover {
  color: #4f46e5;
  border-color: #4f46e5;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 20px;
}

.article-row:hover {
  border-color: #4f46e5;
  background: rgba(79, 70, 229, 0.02);
}

.row-main {
  flex: 1;
  min-width: 0;
}

.row-main h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 6px;
}

.row-main p {
  font-size: 14px;
  color: var(--text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.row-date {
  font-size: 13px;
  color: var(--text);
  white-space: nowrap;
}

.state-box {
  text-align: center;
  padding: 60px 20px;
  color: var(--text);
}

.state-box p {
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

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 28px;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .article-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
