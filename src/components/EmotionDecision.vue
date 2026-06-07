<script setup>
import { ref } from 'vue'

const activeEmotion = ref('焦慮')
const emotions = {
  焦慮: {
    scene: '考試前一直想著失敗，容易把小風險看得很大。',
    advice: '先列出可控制的三件事，把注意力拉回行動。',
  },
  憤怒: {
    scene: '被誤會時立刻回訊息，容易做出攻擊性判斷。',
    advice: '延後十 分鐘回覆，讓生理激動先下降。',
  },
  快樂: {
    scene: '心情很好時購物，容易低估花費與後悔機率。',
    advice: '把想買的東西放入清單，隔天再決定。',
  },
  壓力: {
    scene: '面試前壓力大，可能只看見最糟結果。',
    advice: '把問題拆小，先完成一個具體準備動作。',
  },
}
</script>

<template>
  <div class="interactive-block emotion-layout">
    <div class="mini-toolbar vertical">
      <button
        v-for="(_, emotion) in emotions"
        :key="emotion"
        :class="{ active: activeEmotion === emotion }"
        type="button"
        @click="activeEmotion = emotion"
      >
        {{ emotion }}
      </button>
    </div>
    <article class="emotion-card">
      <h3>{{ activeEmotion }}如何改變判斷？</h3>
      <p>{{ emotions[activeEmotion].scene }}</p>
      <strong>{{ emotions[activeEmotion].advice }}</strong>
    </article>
  </div>
</template>
