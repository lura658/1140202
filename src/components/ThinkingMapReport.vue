<!--
  * 對應章節：結尾分析 / 專屬思考地圖報告 (Thinking Map Report)
  * 檔案功能：作為整個互動體驗的總結，展示使用者的累積總分與認知傾向圖表，並提供後續探索的引導按鈕。
-->

<script setup>
import { computed } from 'vue'
import ResultChart from './ResultChart.vue'

const props = defineProps({
  signals: {
    type: Object,
    required: true,
  },
  scores: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['finished'])

const totalScore = computed(() => {
  return Object.values(props.scores).reduce((sum, item) => sum + item.score, 0)
})
</script>

<template>
  <section class="interactive-block">
    <h3>你的專屬思考地圖</h3>
    <p>恭喜完成所有挑戰！根據你在各章節的互動，我們分析了你的認知傾向：</p>
    
    <ResultChart :signals="signals" />
    
    <div class="score-summary" style="margin-top: 1.5rem; text-align: center;">
      <p>隨機測驗累積總分：<strong style="font-size: 1.5rem; color: #b85b62;">{{ totalScore }}</strong></p>
    </div>

    <button type="button" class="primary-action" @click="emit('finished')" style="margin-top: 1rem;">
      查看完整理論
    </button>
  </section>
</template>