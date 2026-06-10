<!--
  * 對應章節：視覺與直覺 / 錯覺挑戰 (Illusion Demo)
  * 檔案功能：透過艾賓浩斯錯覺圖片互動，展示大腦如何依賴比較基準而產生視覺判斷上的偏差。
-->

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const revealed = ref(false)
const picked = ref('')

function answer(option) {
  picked.value = option
  revealed.value = true
  emit('answered', { perception: 2 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>錯覺挑戰：中間兩個圓一樣大嗎？</h3>
    <img src="./圓.png" alt="艾賓浩斯錯覺" class="illusion-image" />
    <div class="illusion-stage">
      <div class="illusion-group">
        <span v-for="i in 8" :key="`small-${i}`" class="outer small"></span>
        <strong></strong>
      </div>
      <div class="illusion-group">
        <span v-for="i in 8" :key="`large-${i}`" class="outer large"></span>
        <strong></strong>
      </div>
    </div>
    <div class="choice-grid">
      <button type="button" @click="answer('same')">一樣大</button>
      <button type="button" @click="answer('different')">不一樣大</button>
    </div>
    <p v-if="revealed" class="feedback">
      答案是：一樣大。周圍圓形的大小改變了大腦的比較基準，所以我們會把相同大小看成不同大小。
    </p>
  </section>
</template>
