import { reactive, computed } from 'vue'
import type { User } from '../types'

interface StoreState {
  user: User | null
  token: string | null
}

const state = reactive<StoreState>({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token')
})

export function useUserStore() {
  const isLoggedIn = computed(() => !!state.user && !!state.token)

  function setAuth(user: User, token: string) {
    state.user = user
    state.token = token
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  function logout() {
    state.user = null
    state.token = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  return { user: state.user, token: state.token, isLoggedIn, setAuth, logout }
}
