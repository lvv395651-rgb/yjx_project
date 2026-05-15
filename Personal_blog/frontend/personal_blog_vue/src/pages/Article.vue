<template>
  <div class="article-page">
    <!-- Loading -->
    <div v-if="loading" class="state-box">
      <div class="spinner"></div>
      <p>加载文章中...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-box error">
      <p>{{ error }}</p>
      <button class="btn-back" @click="goHome">返回首页</button>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="article-container">
      <button class="btn-back-top" @click="goHome">
        ← 返回首页
      </button>

      <header class="article-header">
        <div class="article-category">{{ article.category }}</div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-author">
            <span class="author-avatar">{{ article.author[0] }}</span>
            {{ article.author }}
          </span>
          <span class="meta-sep">·</span>
          <span>{{ article.createdAt }}</span>
          <span class="meta-sep">·</span>
          <span>{{ article.tags.length }} 个标签</span>
        </div>
      </header>

      <div class="article-body markdown-body" v-html="renderedContent"></div>

      <footer class="article-footer">
        <div class="footer-tags">
          <span class="tag-label">标签：</span>
          <span v-for="tag in article.tags" :key="tag" class="tag-item">{{ tag }}</span>
        </div>
      </footer>
    </article>

    <!-- Not Found -->
    <div v-else class="state-box">
      <p>文章不存在</p>
      <button class="btn-back" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Article } from '../types'
import { fetchArticleById } from '../api/article'

const route = useRoute()
const router = useRouter()
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref('')

function goHome() {
  router.push('/')
}

const renderedContent = computed(() => {
  if (!article.value) return ''
  return renderMarkdown(article.value.content)
})

function renderMarkdown(text: string): string {
  // Code blocks
  let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const langClass = lang ? ` class="lang-${lang}"` : ''
    return `<pre><code${langClass}>${escapeHtml(code.trim())}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // Paragraphs (catch remaining text lines)
  html = html.replace(/^(?!<[hul]|<pre|<code)(.+)$/gm, '<p>$1</p>')

  // Clean empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) {
    error.value = '无效的文章ID'
    loading.value = false
    return
  }

  try {
    const res = await fetchArticleById(id)
    if (res.code === 200 && res.data) {
      article.value = res.data
    } else {
      error.value = res.msg || '文章不存在'
    }
  } catch {
    error.value = '网络异常，请稍后重试'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.btn-back-top {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 32px;
}

.btn-back-top:hover {
  color: #4f46e5;
  border-color: #4f46e5;
}

/* Header */
.article-header {
  margin-bottom: 40px;
}

.article-category {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-h);
  line-height: 1.3;
  margin: 0 0 20px;
  letter-spacing: -0.5px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
  flex-wrap: wrap;
}

.meta-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.meta-sep {
  color: var(--border);
}

/* Content */
.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-h);
}

.article-body :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.article-body :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 32px 0 12px;
}

.article-body :deep(p) {
  margin: 0 0 16px;
  color: var(--text);
}

.article-body :deep(strong) {
  color: var(--text-h);
  font-weight: 600;
}

.article-body :deep(code) {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 14px;
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-h);
}

.article-body :deep(pre) {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 20px 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  font-size: 14px;
  line-height: 1.6;
}

.article-body :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.article-body :deep(ul) {
  margin: 16px 0;
  padding-left: 24px;
  color: var(--text);
}

.article-body :deep(li) {
  margin-bottom: 8px;
}

/* Footer */
.article-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.footer-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-label {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.tag-item {
  font-size: 13px;
  color: var(--text);
  background: var(--code-bg);
  padding: 4px 12px;
  border-radius: 6px;
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

.btn-back {
  padding: 8px 24px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  color: #4f46e5;
  border-color: #4f46e5;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 26px;
  }

  .article-body {
    font-size: 15px;
  }
}
</style>
