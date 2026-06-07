<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const selected = ref('')

function choose(type) {
  selected.value = type
  emit('answered', { confirmation: 2 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>陰謀論吸引力測試</h3>
    <p class="prompt">看到一則都市傳說：「所有事情都不是巧合，是某個組織安排的。」你第一步應該做什麼？</p>
    <div class="choice-grid">
      <button type="button" @click="choose('evidence')">查證證據來源</button>
      <button type="button" @click="choose('share')">先轉傳給朋友</button>
      <button type="button" @click="choose('confirm')">只找支持說法的文章</button>
    </div>
    <p v-if="selected" class="feedback">
      陰謀論常利用模式辨識與控制感需求。最好的第一步是查來源、找反證，不要只看支持自己的資料。
    </p>
  </section>
</template>
