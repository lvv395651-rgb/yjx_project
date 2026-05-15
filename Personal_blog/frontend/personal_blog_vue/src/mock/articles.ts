import type { Article } from '../types'

export const mockArticles: Article[] = [
  {
    id: 1,
    title: '用 Vue 3 构建现代博客',
    summary: '探索如何使用 Vue 3 的组合式 API、TypeScript 和 Vite 构建一个高性能、可维护的个人博客系统。',
    content: `## 前言

Vue 3 的发布为前端开发带来了许多令人兴奋的新特性。组合式 API（Composition API）让我们能够以更灵活的方式组织组件逻辑，而 TypeScript 的支持则让代码更加健壮。

## 为什么选择 Vue 3

### 1. 组合式 API

组合式 API 允许我们将相关逻辑组合在一起，而不是像选项式 API 那样分散在不同的选项中。

\`\`\`typescript
import { ref, onMounted } from 'vue'

export function useArticleList() {
  const articles = ref([])
  const loading = ref(false)

  async function fetchArticles() {
    loading.value = true
    try {
      const res = await fetch('/api/articles')
      articles.value = await res.json()
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchArticles)

  return { articles, loading }
}
\`\`\`

### 2. 更好的 TypeScript 支持

Vue 3 从头开始就用 TypeScript 编写，提供了卓越的类型推断和支持。

### 3. Vite 构建工具

Vite 提供了极快的热模块替换（HMR）和构建速度，大幅提升了开发体验。

## 博客系统架构

一个完整的博客系统通常包含以下功能：

- 文章列表与详情
- 分类与标签
- 用户认证
- 评论系统
- 搜索功能

## 总结

Vue 3 + TypeScript + Vite 是现代前端开发的黄金组合，特别适合构建个人博客这类内容驱动的应用。`,
    category: '前端开发',
    tags: ['Vue', 'TypeScript', 'Vite'],
    author: 'YJX',
    createdAt: '2026-05-14'
  },
  {
    id: 2,
    title: 'CSS 布局进阶：Grid 与 Flexbox 实战',
    summary: '深入比较 CSS Grid 和 Flexbox 的适用场景，并通过实际案例学习如何组合使用它们构建复杂布局。',
    content: `## 概述

CSS 布局经历了从表格布局到浮动布局，再到 Flexbox 和 Grid 的发展。现代 CSS 布局已经变得非常强大和灵活。

## Flexbox — 一维布局

Flexbox 最适合**一维**布局——要么是行，要么是列。

### 典型用例

\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}
\`\`\`

### 主轴与交叉轴

Flexbox 的核心概念是主轴（main axis）和交叉轴（cross axis）。\`flex-direction\` 决定了主轴的方向。

## CSS Grid — 二维布局

Grid 擅长**二维**布局，同时控制行和列。

### 典型用例

\`\`\`css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### 网格区域

Grid 的 \`grid-template-areas\` 让布局定义变得非常直观。

## 组合使用

在实际项目中，Flexbox 和 Grid 通常组合使用：

- 页面级布局 → Grid
- 组件内部排列 → Flexbox

## 总结

掌握 Flexbox 和 Grid 是现代 CSS 布局的关键。Grid 负责宏观布局，Flexbox 负责微观排列，两者配合使用效果最佳。`,
    category: 'CSS',
    tags: ['CSS', 'Flexbox', 'Grid'],
    author: 'YJX',
    createdAt: '2026-05-10'
  },
  {
    id: 3,
    title: 'TypeScript 高级类型技巧',
    summary: '介绍 TypeScript 中实用的高级类型：条件类型、映射类型、模板字面量类型等，让你的代码更安全。',
    content: `## 引言

TypeScript 的类型系统非常强大，掌握高级类型可以让你写出更安全、更优雅的代码。

## 条件类型

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<123>       // false
\`\`\`

## 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Optional<T> = {
  [K in keyof T]?: T[K]
}
\`\`\`

## 模板字面量类型

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`
\`\`\`

## 实用工具类型

TypeScript 内置了许多实用的工具类型：

- \`Partial<T>\` — 将所有属性设为可选
- \`Required<T>\` — 将所有属性设为必选
- \`Pick<T, K>\` — 从 T 中选取部分属性
- \`Omit<T, K>\` — 从 T 中排除部分属性

## 总结

高级类型让 TypeScript 真正强大起来。适度使用可以提高代码质量，过度使用则会降低可读性。`,
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统'],
    author: 'YJX',
    createdAt: '2026-05-05'
  },
  {
    id: 4,
    title: 'Node.js 后端开发实践',
    summary: '从 Express 到 NestJS，从 MongoDB 到 PostgreSQL，分享 Node.js 后端开发的最佳实践。',
    content: `## 技术选型

Node.js 后端开发有多种框架选择，每种都有其适用场景。

## Express — 轻量灵活

Express 是最流行的 Node.js 框架，简单灵活。

## NestJS — 企业级框架

NestJS 提供了模块化架构、依赖注入等企业级特性。

## 数据库选择

### MongoDB

适合文档型数据，灵活的模式定义。

### PostgreSQL

适合关系型数据，强大的查询能力。

## API 设计原则

- RESTful 规范
- 版本控制
- 错误处理
- 鉴权与授权

## 总结

选择合适的框架和数据库取决于项目需求。Express 适合小型项目，NestJS 适合大型企业级应用。`,
    category: '后端开发',
    tags: ['Node.js', 'Express', 'NestJS'],
    author: 'YJX',
    createdAt: '2026-04-28'
  },
  {
    id: 5,
    title: 'Git 工作流与团队协作',
    summary: '介绍 Git Flow、GitHub Flow 等主流 Git 工作流，以及如何在团队中高效协作。',
    content: `## Git 工作流的重要性

良好的 Git 工作流可以提高团队协作效率，减少冲突。

## 主流工作流

### Git Flow

- main：生产分支
- develop：开发分支
- feature/*：功能分支
- release/*：发布分支
- hotfix/*：紧急修复

### GitHub Flow

- main：始终可部署
- feature branches：从 main 创建

## 提交信息规范

使用 Conventional Commits 规范：

- feat: 新功能
- fix: 修复
- docs: 文档
- refactor: 重构

## 总结

选择适合团队的工作流比追求完美更重要。关键是团队达成一致并严格执行。`,
    category: '开发工具',
    tags: ['Git', '工作流', '协作'],
    author: 'YJX',
    createdAt: '2026-04-20'
  },
  {
    id: 6,
    title: '从设计到代码：实现完美 UI',
    summary: '探讨设计师与开发者之间的协作，以及如何将设计稿精准转化为前端代码。',
    content: `## 设计与开发的鸿沟

设计师和开发者常常因为工具和思维方式的不同而产生理解偏差。

## 设计系统

建立设计系统可以有效缩小设计到开发的差距。

### 原子设计方法论

- Atom（原子）：基础元素
- Molecule（分子）：组合元素
- Organism（有机体）：复杂组件
- Template（模板）：页面布局
- Page（页面）：最终页面

## 常见设计模式

- 卡片布局
- 列表详情
- 表单输入
- 导航菜单

## 总结

好的 UI 来自设计与开发的紧密协作。设计系统是提升效率的关键工具。`,
    category: 'UI/UX',
    tags: ['设计', 'UI', 'UX'],
    author: 'YJX',
    createdAt: '2026-04-15'
  }
]

export const categories = [
  { name: '前端开发', count: 1 },
  { name: 'CSS', count: 1 },
  { name: 'TypeScript', count: 1 },
  { name: '后端开发', count: 1 },
  { name: '开发工具', count: 1 },
  { name: 'UI/UX', count: 1 }
]
