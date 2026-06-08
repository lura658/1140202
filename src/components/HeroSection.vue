<script setup>
import { ref } from 'vue'
import logoImg from '../logo.png'

const goals = [
  { key: '意識陷阱', text: '了解無意識如何影響你的判斷與偏好。' },
  { key: '選擇操控', text: '學習外在設計如何引導選擇行為。' },
  { key: '大腦決策', text: '分辨直覺反應與理性思考的差別。' },
  { key: '自我覺察', text: '練習察覺並調整自己的決策習慣。' },
]

const activeGoal = ref(null)
const isLogoHovered = ref(false)
const hoverTip = ref('')

const tips = [
  '直覺思考（System 1）比你想像中更快，但也更容易被偏誤影響。',
  '人腦每天會處理大量資訊，多數時候會優先選最省力的答案。',
  '情緒與決策常常是先後順序，而不是理性先行。',
  '當你覺得「這很合理」，大腦可能已經在用過去經驗填空。',
  '社會氛圍對選擇影響很大，這就是為什麼你會跟著群體做出相似決定。',
]

function toggleGoal(g) {
  activeGoal.value = activeGoal.value === g ? null : g
}

function showRandomTip() {
  hoverTip.value = tips[Math.floor(Math.random() * tips.length)]
}

function handleLogoEnter() {
  isLogoHovered.value = true
  showRandomTip()
}

function handleLogoLeave() {
  isLogoHovered.value = false
  hoverTip.value = ''
}
</script>

<template>
  <header class="hero-wrap">
    <div
      class="logo-flip"
      @mouseenter="handleLogoEnter"
      @mouseleave="handleLogoLeave"
      aria-hidden="true"
    >
      <div class="logo-card" :class="{ flipped: isLogoHovered }">
        <div class="logo-face logo-front">
          <img :src="logoImg" alt="心理學 Logo" />
        </div>
        <div class="logo-face logo-back">
          <p>{{ hoverTip || '滑鼠移到這裡，看見心理學小知識。' }}</p>
        </div>
      </div>
    </div>

    <div class="hero-copy">
      <p class="eyebrow">沉浸式心理學互動體驗館</p>
      <h1>你的每個決定<br>真的是你自己做出的嗎？</h1>
      <p class="hero-subtitle" style="margin-top: 1rem; line-height: 1.8;">從早餐吃什麼，到喜歡上誰...<br>或許大腦早就替你選好了。</p>
      <div class="learning-goals">
        <button
          v-for="g in goals"
          :key="g.key"
          type="button"
          class="goal-chip"
          :aria-pressed="activeGoal===g"
          @click="toggleGoal(g)"
        >
          {{ g.key }}
        </button>
      </div>

      <div v-if="activeGoal" class="goal-info">
        <p><strong>{{ activeGoal.key }}</strong> — {{ activeGoal.text }}</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.logo-flip {
  width: min(540px, 100%);
  height: min(480px, 100%);
  perspective: 1200px;
  margin-bottom: 2rem;
}

.logo-card {
  width: 100%;
  height: 100%;
  min-height: 260px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.65s ease;
}

.logo-card.flipped {
  transform: rotateY(180deg);
}

.logo-face {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  overflow: hidden;
  backface-visibility: hidden;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.logo-front {
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 35%), #0b1221;
}

.logo-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-back {
  background: linear-gradient(180deg, #12303d 0%, #0f172a 100%);
  transform: rotateY(180deg);
  color: #f8fafc;
  text-align: center;
}

.logo-back p {
  font-size: 1rem;
  line-height: 1.7;
  max-width: 18rem;
  margin: 0;
}

@media (max-width: 900px) {
  .logo-flip {
    margin: 0 auto 2rem;
  }
}
</style>
