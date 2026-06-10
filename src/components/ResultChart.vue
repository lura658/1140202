<!--
  * 對應章節：共用元件 / 分析圖表 (Result Chart)
  * 檔案功能：接收使用者的認知傾向分數 (Signals)，並將其視覺化為長條圖，顯示各項心理特質的偏好程度。
-->

<script setup>
import { computed } from 'vue'

const props = defineProps({
  signals: {
    type: Object,
    required: true,
  },
})

const rows = computed(() => [
  { key: 'intuitive', label: '直覺反應' },
  { key: 'rational', label: '理性檢查' },
  { key: 'social', label: '社會影響' },
  { key: 'scarcity', label: '稀缺刺激' },
  { key: 'sunkCost', label: '沉沒成本' },
  { key: 'memory', label: '記憶偏差' },
  { key: 'confirmation', label: '確認偏誤' },
].map((row) => ({
  ...row,
  value: props.signals[row.key],
  width: `${Math.min(100, props.signals[row.key] * 18)}%`,
})))
</script>

<template>
  <div class="result-chart" aria-label="心理分析圖表">
    <div v-for="row in rows" :key="row.key" class="chart-row">
      <span>{{ row.label }}</span>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: row.width }"></div>
      </div>
      <strong>{{ row.value }}</strong>
    </div>
  </div>
</template>
