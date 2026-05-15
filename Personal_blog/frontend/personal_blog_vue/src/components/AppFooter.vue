<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">Y</span>
            <span class="logo-text">YJX 博客</span>
          </div>
          <p class="footer-desc">记录技术成长，分享知识点滴。专注于前端开发、全栈技术和个人成长。</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>导航</h4>
            <router-link to="/">首页</router-link>
            <router-link to="/categories">分类</router-link>
            <router-link to="/about">关于</router-link>
          </div>
          <div class="link-group">
            <h4>分类</h4>
            <router-link to="/categories">前端开发</router-link>
            <router-link to="/categories">后端开发</router-link>
            <router-link to="/categories">开发工具</router-link>
          </div>
          <div class="link-group">
            <h4>联系</h4>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="mailto:yjx@blog.com">Email</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 YJX 博客. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--code-bg);
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.footer-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

.footer-top {
  display: flex;
  gap: 60px;
  padding-bottom: 32px;
  flex-wrap: wrap;
}

.footer-brand {
  flex: 1;
  min-width: 240px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-logo .logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.footer-logo .logo-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-h);
}

.footer-desc {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-group h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-h);
}

.link-group a {
  font-size: 14px;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
}

.link-group a:hover {
  color: #4f46e5;
}

.footer-bottom {
  padding: 20px 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-bottom p {
  font-size: 13px;
  color: var(--text);
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    gap: 32px;
  }

  .footer-links {
    gap: 32px;
  }
}
</style>
