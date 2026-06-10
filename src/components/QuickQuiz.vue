<!--
  * 對應章節：結尾分析 / 快問快答 (Quick Quiz)
  * 檔案功能：隨機抽取偏誤理論與情境題目，提供使用者快速進行綜合性測驗，檢驗學習成果。
-->

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  biases: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['close'])

const visible = ref(true)
const questions = ref(generateQuestions())
const index = ref(0)
const selected = ref(null)
const submitted = ref(false)
const score = ref(0)

function makeTheory(pool) {
  const target = pool[Math.floor(Math.random() * pool.length)]
  const names = pool.map((b) => b.name)
  const options = [target.name]
  while (options.length < 3) {
    const cand = names[Math.floor(Math.random() * names.length)]
    if (!options.includes(cand)) options.push(cand)
  }
  options.sort(() => Math.random() - 0.5)
  return {
    type: 'theory',
    question: `哪一個偏誤最貼近下列描述：${target.summary}`,
    answer: target.name,
    options,
  }
}

function makeScenario(pool) {
  const target = pool[Math.floor(Math.random() * pool.length)]
  const names = pool.map((b) => b.name)
  const options = [target.name]
  while (options.length < 3) {
    const cand = names[Math.floor(Math.random() * names.length)]
    if (!options.includes(cand)) options.push(cand)
  }
  options.sort(() => Math.random() - 0.5)
  return {
    type: 'scenario',
    question: `情境：${target.example}\n這個情境最可能是哪一個偏誤？`,
    answer: target.name,
    options,
  }
}

function generateQuestions() {
  const pool = props.biases
  // 保證兩題理論 + 一題情境
  const q = [makeTheory(pool), makeTheory(pool), makeScenario(pool)]
  // 亂序以增加變化（若要固定順序可移除）
  return q.sort(() => Math.random() - 0.5)
}

function selectOption(opt) {
  if (submitted.value) return
  selected.value = opt
}

function submit() {
  if (selected.value == null) return
  submitted.value = true
  if (selected.value === questions.value[index.value].answer) score.value += 1
}

function next() {
  selected.value = null
  submitted.value = false
  if (index.value < questions.value.length - 1) {
    index.value += 1
  } else {
    // 跳到總結頁
    index.value = questions.value.length
  }
}

function close() {
  emit('close')
}

function resetQuiz() {
  questions.value = generateQuestions()
  index.value = 0
  score.value = 0
  selected.value = null
  submitted.value = false
}
</script>

<template>
  <div class="quiz-backdrop" @click.self="close">
    <div class="quiz-modal">
      <header class="quiz-header">
        <h3>快問快答</h3>
        <button class="text-action" type="button" @click="close">關閉</button>
      </header>

      <div v-if="index < questions.length" class="quiz-body">
        <p class="eyebrow">題目 {{ index + 1 }} / {{ questions.length }}</p>
        <h4 class="quiz-question">{{ questions[index].question }}</h4>

        <div class="choice-grid">
          <button
            v-for="option in questions[index].options"
            :key="option"
            type="button"
            :class="{ selected: selected === option }"
            :disabled="submitted"
            @click="selectOption(option)"
          >
            {{ option }}
          </button>
        </div>

        <div class="quiz-actions">
          <button class="primary-action" type="button" @click="submit" :disabled="submitted || selected==null">送出</button>
          <button v-if="submitted" class="text-action" type="button" @click="next">下一題</button>
        </div>

        <p v-if="submitted" class="feedback">
          {{ selected === questions[index].answer ? '答對！' : `答案是：${questions[index].answer}` }}
        </p>
      </div>

      <div v-else class="quiz-summary">
        <h4>完成！</h4>
        <p class="eyebrow">你的得分：{{ score }} / {{ questions.length }}</p>
        <ul>
          <li v-for="(q, i) in questions" :key="i">
            {{ i + 1 }}. {{ q.type === 'scenario' ? '情境題' : '理論題' }} — 正確答案：{{ q.answer }}
          </li>
        </ul>
        <div style="margin-top:12px; display:flex; gap:8px">
          <button class="primary-action" @click="resetQuiz">再玩一次</button>
          <button class="text-action" @click="close">離開</button>
        </div>
      </div>
    </div>
  </div>
</template>
