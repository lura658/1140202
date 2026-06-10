<!--
  * 對應章節：社會心理學 / 情境測驗 (Scenario Quiz)
  * 檔案功能：提供生活情境題，讓使用者判斷並辨識光環效應、團體迷思或旁觀者效應等心理學現象。
-->

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const picked = ref('')

const scenarios = [
  {
    text: '新同學第一次上台報告很流暢，班上很多人立刻覺得他每科都很強。',
    answer: '光環效應',
    signal: { social: 1 },
  },
  {
    text: '小組討論時大家都同意同一方案，你雖然覺得怪怪的，還是沒有提出反對。',
    answer: '團體迷思',
    signal: { social: 1 },
  },
  {
    text: '走廊有人跌倒，旁邊人很多，結果每個人都以為別人會幫忙。',
    answer: '旁觀者效應',
    signal: { social: 1 },
  },
]

const options = ['光環效應', '團體迷思', '旁觀者效應']
const active = ref(scenarios[0])

function submit(option) {
  picked.value = option
  emit('answered', active.value.signal)
}
</script>

<template>
  <div class="interactive-block">
    <div class="mini-toolbar">
      <button
        v-for="(scenario, index) in scenarios"
        :key="scenario.text"
        :class="{ active: active.text === scenario.text }"
        type="button"
        @click="active = scenario; picked = ''"
      >
        情境 {{ index + 1 }}
      </button>
    </div>

    <h3>{{ active.text }}</h3>
    <div class="choice-grid">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        @click="submit(option)"
      >
        {{ option }}
      </button>
    </div>
    <p v-if="picked" class="feedback">
      {{ picked === active.answer ? '答對了。' : '再想一下。' }}
      這個情境的心理效應是：{{ active.answer }}。
    </p>
  </div>
</template>
