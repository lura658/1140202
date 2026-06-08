<script setup>
import { ref } from 'vue'

const goals = [
  { key: '意識陷阱', text: '了解無意識如何影響你的判斷與偏好。' },
  { key: '選擇操控', text: '學習外在設計如何引導選擇行為。' },
  { key: '大腦決策', text: '分辨直覺反應與理性思考的差別。' },
  { key: '自我覺察', text: '練習察覺並調整自己的決策習慣。' },
]

const activeGoal = ref(null)

function toggleGoal(g) {
  activeGoal.value = activeGoal.value === g ? null : g
}
</script>

<template>
  <header class="hero-wrap">
    <div class="brain-visual" aria-hidden="true">
      <span class="node node-a"></span>
      <span class="node node-b"></span>
      <span class="node node-c"></span>
      <span class="node node-d"></span>
      <div class="brain-core">
        <span>System 1</span>
        <strong>?</strong>
        <span>System 2</span>
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
