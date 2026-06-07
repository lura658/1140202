<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const checked = ref([])

const checks = ['來源是誰？', '證據在哪裡？', '有沒有反面觀點？', '標題是否在煽動情緒？']

function toggle(item) {
  checked.value = checked.value.includes(item)
    ? checked.value.filter((check) => check !== item)
    : [...checked.value, item]
  emit('answered', { misinformation: 1, rational: 1 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>假新聞檢查站</h3>
    <p class="prompt">看到聳動標題時，先完成四個檢查。</p>
    <div class="tool-panel compact">
      <label v-for="item in checks" :key="item">
        <input type="checkbox" :checked="checked.includes(item)" @change="toggle(item)" />
        <span>{{ item }}</span>
      </label>
    </div>
    <p class="feedback">完成越多檢查，越不容易被情緒傳播與資訊泡泡牽著走。</p>
  </section>
</template>
