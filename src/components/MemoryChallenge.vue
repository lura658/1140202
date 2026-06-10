<!--
  * 對應章節：記憶機制 / 記憶挑戰 (Memory Challenge)
  * 檔案功能：透過短暫記憶物品的測驗，展示大腦在回憶時常會被相似物品或期待所影響的重建特性。
-->

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['finished'])
const phase = ref('observe')
const answers = ref([])

const items = ['紅色雨傘', '藍色筆記本', '黃色檯燈', '黑色耳機', '白色水杯', '綠色便條紙']
const options = ['紅色雨傘', '藍色筆記本', '黃色檯燈', '紫色背包', '黑色耳機', '白色水杯', '橘色錢包', '綠色便條紙']
const correctCount = computed(() => answers.value.filter((answer) => items.includes(answer)).length)

function toggle(item) {
  answers.value = answers.value.includes(item)
    ? answers.value.filter((answer) => answer !== item)
    : [...answers.value, item]
}

function finish() {
  phase.value = 'result'
  emit('finished', { memory: Math.max(0, items.length - correctCount.value) })
}
</script>

<template>
  <div class="interactive-block">
    <template v-if="phase === 'observe'">
      <p class="prompt">請觀察這些物品，準備好後進入回憶測驗。</p>
      <div class="memory-board">
        <span v-for="item in items" :key="item">{{ item }}</span>
      </div>
      <button type="button" class="primary-action" @click="phase = 'recall'">開始回憶</button>
    </template>

    <template v-else-if="phase === 'recall'">
      <p class="prompt">剛剛出現過哪些物品？</p>
      <div class="memory-options">
        <button
          v-for="option in options"
          :key="option"
          :class="{ selected: answers.includes(option) }"
          type="button"
          @click="toggle(option)"
        >
          {{ option }}
        </button>
      </div>
      <button type="button" class="primary-action" @click="finish">看結果</button>
    </template>

    <p v-else class="feedback">
      你答對 {{ correctCount }} / {{ items.length }} 個。記憶常會被相似物品與期待補上缺口，所以它比較像重建，不像錄影。
    </p>
  </div>
</template>
