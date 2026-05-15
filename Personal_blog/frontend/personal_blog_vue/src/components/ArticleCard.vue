<template>
  <article class="article-card" @click="goDetail">
    <div class="card-category">{{ article.category }}</div>
    <h2 class="card-title">{{ article.title }}</h2>
    <p class="card-summary">{{ article.summary }}</p>
    <div class="card-footer">
      <div class="card-meta">
        <span class="meta-date">{{ article.createdAt }}</span>
        <span class="meta-tags">
          <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="tag">
            {{ tag }}
          </span>
        </span>
      </div>
      <span class="card-more">阅读全文 →</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Article } from '../types'

const router = useRouter()

const props = defineProps<{
  article: Article
}>()

const goDetail = () => {
  router.push(`/article/${props.article.id}`)
}
</script>

<style scoped>
.article-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  border-color: transparent;
}

.card-category {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 14px;
  align-self: flex-start;
}

.card-title {
  font-size: 19px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-summary {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
  margin: 0 0 auto;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-date {
  font-size: 13px;
  color: var(--text);
}

.meta-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  color: var(--text);
  background: var(--code-bg);
  padding: 2px 8px;
  border-radius: 4px;
}

.card-more {
  font-size: 14px;
  color: #4f46e5;
  font-weight: 500;
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  .article-card:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
}
</style>
