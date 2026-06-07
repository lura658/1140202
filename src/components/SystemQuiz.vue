<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['answered'])
const selected = ref('')

const questions = [
  {
    id: 'bat',
    text: '球棒和球總共 110 元。球棒比球貴 100 元，球多少錢？',
    fast: '10 元',
    slow: '5 元',
    insight: '直覺常會抓住「110 減 100」這條捷徑，但慢下來列式才會發現答案是 5 元。',
  },
  {
    id: 'risk',
    text: '限時倒數只剩 30 秒，你會先下單還是先比較？',
    fast: '先買再說',
    slow: '先檢查需求',
    insight: '時間壓力會讓系統一接手，系統二需要刻意爭取一點時間。',
  },
]

const activeQuestion = ref(questions[0])
const result = computed(() => {
  if (!selected.value) return ''
  return selected.value === 'fast' ? '你剛剛比較像使用系統一。' : '你剛剛比較像啟動系統二。'
})

function answer(type) {
  selected.value = type
  emit('answered', type === 'fast' ? { intuitive: 1 } : { rational: 1 })
}
</script>

<template>
  <div class="interactive-block">
    <div class="mini-toolbar">
      <button
        v-for="question in questions"
        :key="question.id"
        :class="{ active: activeQuestion.id === question.id }"
        type="button"
        @click="activeQuestion = question; selected = ''"
      >
        {{ question.id === 'bat' ? '直覺題' : '情境題' }}
      </button>
    </div>

    <h3>{{ activeQuestion.text }}</h3>
    <div class="choice-grid">
      <button type="button" @click="answer('fast')">{{ activeQuestion.fast }}</button>
      <button type="button" @click="answer('slow')">{{ activeQuestion.slow }}</button>
    </div>

    <p v-if="result" class="feedback">
      <strong>{{ result }}</strong>
      {{ activeQuestion.insight }}
    </p>
  </div>
</template>
