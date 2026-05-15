<template>
  <div class="about-page">
    <div class="page-header">
      <h1>关于我</h1>
      <p>一名热爱技术的前端开发者</p>
    </div>

    <div class="about-content">
      <div class="about-card">
        <div class="avatar-section">
          <div class="avatar">Y</div>
        </div>
        <div class="info-section">
          <h2>YJX</h2>
          <p class="role">全栈开发者 / 技术博主</p>
          <p class="bio">
            专注于前端开发技术，热爱探索新工具和框架。通过这个博客记录学习过程中的
            思考与收获，希望能够帮助到同样在技术路上前行的你。
          </p>
        </div>
      </div>

      <div class="skills-section">
        <h2>技能栈</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="skill-fill" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-section">
        <h2>联系我</h2>
        <div class="contact-links">
          <a href="https://github.com" target="_blank" class="contact-item">
            <span class="contact-icon">GH</span>
            <span>GitHub</span>
          </a>
          <a href="mailto:yjx@blog.com" class="contact-item">
            <span class="contact-icon">@</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  { name: 'Vue / React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'CSS / UI Design', level: 80 },
  { name: 'Python', level: 60 },
  { name: 'Git / DevOps', level: 70 },
]
</script>

<style scoped>
.about-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 8px;
}

.page-header p {
  font-size: 16px;
  color: var(--text);
  margin: 0;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-card {
  display: flex;
  gap: 32px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px;
  align-items: center;
}

.avatar-section {
  flex-shrink: 0;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
}

.info-section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 4px;
}

.role {
  font-size: 15px;
  color: #4f46e5;
  font-weight: 500;
  margin: 0 0 12px;
}

.bio {
  font-size: 15px;
  color: var(--text);
  line-height: 1.7;
  margin: 0;
}

.skills-section h2,
.contact-section h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #4f46e5;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.skill-name {
  width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
  flex-shrink: 0;
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: var(--code-bg);
  border-radius: 4px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  transition: width 1s ease;
}

.contact-links {
  display: flex;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text);
  font-size: 15px;
  transition: all 0.2s;
}

.contact-item:hover {
  border-color: #4f46e5;
  color: #4f46e5;
  transform: translateY(-2px);
}

.contact-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--code-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    text-align: center;
    padding: 28px 20px;
  }

  .skill-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .skill-name {
    width: auto;
  }
}
</style>
