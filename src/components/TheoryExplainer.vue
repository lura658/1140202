<!--
  * 對應章節：各章節 / 完整理論解釋 (Theory Explainer)
  * 檔案功能：提供章節心理學理論的深入解說，並包含「深入解釋」與「換句話說」的文本選取互動功能。
-->

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  chapter: {
    type: Object,
    required: true,
  },
})

const selectedText = ref('')
const selectedMode = ref('deep')

const keywordAnswers = [
  { key: '系統一', deep: '系統一像大腦的快速模式，靠經驗和直覺立刻判斷，優點是省時間，缺點是容易忽略細節。', simple: '簡單說，就是你還沒仔細想，腦中就先冒出的第一個答案。' },
  { key: '系統二', deep: '系統二需要注意力與工作記憶，負責計算、查證、比較和抑制衝動。', simple: '簡單說，就是你停下來慢慢想、重新檢查的思考模式。' },
  { key: '確認偏誤', deep: '確認偏誤會讓人偏好支持原本信念的證據，並低估反對資料的重要性。', simple: '簡單說，就是比較容易相信自己本來就想相信的東西。' },
  { key: '錨定效應', deep: '錨定效應會讓第一個數字或資訊成為判斷基準，即使它不一定合理。', simple: '簡單說，就是先看到的價格會偷偷影響你覺得貴或便宜。' },
  { key: '稀缺效應', deep: '稀缺效應會提高物品的主觀價值，因為大腦把「快沒了」解讀成「更值得」。', simple: '簡單說，就是越怕錯過，越容易衝動做決定。' },
  { key: '光環效應', deep: '光環效應是單一正面特質外溢到整體評價，使我們忽略其他證據。', simple: '簡單說，就是因為一個優點，就覺得整個人都很好。' },
  { key: '記憶重建', deep: '記憶重建表示回憶會受到新資訊、情緒和語境影響，每次回想都可能被改寫。', simple: '簡單說，記憶比較像重寫故事，不像播放影片。' },
  { key: '情緒', deep: '情緒會改變注意力與風險評估，讓某些線索變得特別突出。', simple: '簡單說，心情不同時，看同一件事的感覺也會不同。' },
]

const helperText = computed(() => {
  if (!selectedText.value) return '選取上方理論中的任一段文字，這裡會自動用更深入或更簡單的方式補充。'
  const hit = keywordAnswers.find((item) => selectedText.value.includes(item.key) || item.key.includes(selectedText.value))
  if (hit) return hit[selectedMode.value]
  if (selectedMode.value === 'deep') {
    return `你選取的是「${selectedText.value}」。可以把它理解成：這段內容正在說明心理機制如何在不知不覺中影響判斷，重點是找出觸發條件、造成的偏差，以及可用的修正方法。`
  }
  return `換個方式說，「${selectedText.value}」就是提醒我們：不要只相信第一感覺，要多問一次原因和證據。`
})

function captureSelection() {
  const text = window.getSelection().toString().trim()
  if (text) {
    selectedText.value = text.slice(0, 38)
  }
}
</script>

<template>
  <section class="theory-section">
    <div class="theory-copy" @mouseup="captureSelection" @touchend="captureSelection">
      <p class="eyebrow">完整理論解釋</p>
      <h3>{{ chapter.title }}</h3>
      <p v-for="paragraph in chapter.theory" :key="paragraph">{{ paragraph }}</p>
    </div>

    <aside class="selection-helper">
      <div class="mini-toolbar">
        <button
          type="button"
          :class="{ active: selectedMode === 'deep' }"
          @click="selectedMode = 'deep'"
        >
          深入解釋
        </button>
        <button
          type="button"
          :class="{ active: selectedMode === 'simple' }"
          @click="selectedMode = 'simple'"
        >
          換句話說
        </button>
      </div>
      <p>{{ helperText }}</p>
    </aside>
  </section>
</template>
