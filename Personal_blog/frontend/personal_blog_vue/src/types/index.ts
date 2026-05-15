export interface Article {
  id: number
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
  author: string
  createdAt: string
  cover?: string
}

export interface User {
  id: number
  username: string
  email: string
  avatar?: string
}

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
