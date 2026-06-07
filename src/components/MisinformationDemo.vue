<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const choice = ref('')

function answer(value) {
  choice.value = value
  emit('answered', { memory: 1, misinformation: 2 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>錯誤訊息效應</h3>
    <p class="prompt">目擊一場車禍後，如果有人問：「兩台車猛烈撞上時速度多快？」這個問法可能造成什麼影響？</p>
    <div class="choice-grid">
      <button type="button" @click="answer('bias')">讓人高估速度</button>
      <button type="button" @click="answer('none')">完全不影響記憶</button>
    </div>
    <p v-if="choice" class="feedback">
      「猛烈撞上」是暗示性語句，可能讓回憶變得更誇張。這正是 Elizabeth Loftus 研究中的核心概念。
    </p>
  </section>
</template>
