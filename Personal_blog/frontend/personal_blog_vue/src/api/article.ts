import type { Article, ApiResponse, PaginatedData } from '../types'
import { mockArticles } from '../mock/articles'
import { delay } from './index'

const BASE_URL = 'http://localhost:8080/api'

export async function fetchArticles(page = 1, pageSize = 10, category?: string): Promise<ApiResponse<PaginatedData<Article>>> {
  try {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
    if (category) params.set('category', category)
    const res = await fetch(`${BASE_URL}/articles?${params}`)
    return await res.json()
  } catch {
    await delay(300)
    let list = [...mockArticles]
    if (category) list = list.filter(a => a.category === category)
    const total = list.length
    const start = (page - 1) * pageSize
    list = list.slice(start, start + pageSize)
    return { code: 200, msg: 'success', data: { list, total, page, pageSize } }
  }
}

export async function fetchArticleById(id: number): Promise<ApiResponse<Article | null>> {
  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`)
    return await res.json()
  } catch {
    await delay(200)
    const article = mockArticles.find(a => a.id === id) || null
    return { code: article ? 200 : 404, msg: article ? 'success' : 'not found', data: article }
  }
}

export async function fetchCategories(): Promise<ApiResponse<{ name: string; count: number }[]>> {
  try {
    const res = await fetch(`${BASE_URL}/categories`)
    return await res.json()
  } catch {
    await delay(200)
    const cats = [...new Set(mockArticles.map(a => a.category))].map(name => ({
      name,
      count: mockArticles.filter(a => a.category === name).length
    }))
    return { code: 200, msg: 'success', data: cats }
  }
}
