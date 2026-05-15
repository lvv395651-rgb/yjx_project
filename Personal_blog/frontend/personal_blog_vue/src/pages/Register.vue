<template>
  <div class="register-page">
    <div class="register-card">
      <div class="register-header">
        <h1>创建账号</h1>
        <p>加入 YJX 博客，开启你的阅读之旅</p>
      </div>

      <el-form
        ref="registerFormRef"
        :model="form"
        :rules="rules"
        class="register-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="邮箱"
            size="large"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码（至少6位）"
            show-password
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item prop="confirmPwd">
          <el-input
            v-model="form.confirmPwd"
            type="password"
            placeholder="确认密码"
            show-password
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="register-btn"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="to-login">
        已有账号？
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { registerApi } from '../api/auth'

const router = useRouter()
const registerFormRef = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPwd: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  confirmPwd: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_: unknown, value: string) => value === form.password,
      message: '两次密码输入不一致',
      trigger: 'blur'
    }
  ]
}

const handleRegister = async () => {
  const formEl = registerFormRef.value
  if (!formEl) return
  const valid = await formEl.validate()
  if (!valid) return

  loading.value = true
  try {
    const res = await registerApi(form.username, form.email, form.password)
    if (res.code === 200) {
      ElMessage.success('注册成功！请登录')
      router.push('/login')
    } else {
      ElMessage.error(res.msg || '注册失败')
    }
  } catch {
    ElMessage.error('网络异常，注册失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 64px - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(124, 58, 237, 0.05) 100%);
}

.register-card {
  width: 100%;
  max-width: 440px;
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

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h1 {
  font-size: 26px;
  color: var(--text-h);
  margin: 0 0 8px;
  font-weight: 700;
}

.register-header p {
  font-size: 14px;
  color: var(--text);
  margin: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.register-btn {
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  margin-top: 8px;
}

.to-login {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: var(--text);
}

.to-login a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.to-login a:hover {
  text-decoration: underline;
}
</style>
