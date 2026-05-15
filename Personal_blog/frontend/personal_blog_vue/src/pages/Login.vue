<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h1>欢迎回来</h1>
        <p>登录你的账号，继续你的博客之旅</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            show-password
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <div class="login-option">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <router-link to="/register" class="register-link">没有账号？去注册</router-link>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../api/auth'
import { useUserStore } from '../store'

const router = useRouter()
const { setAuth } = useUserStore()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  const formEl = loginFormRef.value
  if (!formEl) return
  const valid = await formEl.validate()
  if (!valid) return

  loading.value = true
  try {
    const res = await loginApi(loginForm.username, loginForm.password)
    if (res.code === 200) {
      ElMessage.success('登录成功！')
      setAuth(res.data.user, res.data.token)
      if (loginForm.remember) {
        localStorage.setItem('username', loginForm.username)
      }
      setTimeout(() => router.push('/'), 300)
    } else {
      ElMessage.error(res.msg || '用户名或密码错误')
    }
  } catch {
    ElMessage.error('网络异常，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 64px - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(124, 58, 237, 0.05) 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 26px;
  color: var(--text-h);
  margin: 0 0 8px;
  font-weight: 700;
}

.login-header p {
  font-size: 14px;
  color: var(--text);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.login-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.register-link {
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
}

.register-link:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 8px;
}
</style>
