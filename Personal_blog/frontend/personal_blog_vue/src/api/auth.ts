import type { ApiResponse, User } from '../types'
import { delay } from './index'

const BASE_URL = 'http://localhost:8080/api/user'

interface LoginData {
  token: string
  user: User
}

export async function loginApi(username: string, password: string): Promise<ApiResponse<LoginData>> {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    return await res.json()
  } catch {
    await delay(500)
    if (username && password.length >= 6) {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: 'mock-token-' + Date.now(),
          user: { id: 1, username, email: `${username}@blog.com` }
        }
      }
    }
    return { code: 400, msg: '用户名或密码错误', data: null as unknown as LoginData }
  }
}

export async function registerApi(username: string, email: string, password: string): Promise<ApiResponse<null>> {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    return await res.json()
  } catch {
    await delay(500)
    return { code: 200, msg: '注册成功', data: null }
  }
}
