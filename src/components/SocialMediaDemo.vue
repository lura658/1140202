<!--
  * 對應章節：社會影響與媒體 / 模擬社群推薦 (Social Media Demo)
  * 檔案功能：模擬社群媒體的演算法推薦機制，展示 FOMO、同溫層效應如何影響使用者的注意力與行為。
-->

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['answered'])
const actions = ref([])

const feed = [
  { tag: '高互動', title: '大家都在討論的熱門影片', signal: 'FOMO' },
  { tag: '你可能喜歡', title: '和你立場相同的短片', signal: '同溫層效應' },
  { tag: '推薦', title: '剛剛看過類似內容', signal: '演算法推薦' },
]

const analysis = computed(() => actions.value.length ? `你觸發了：${[...new Set(actions.value)].join('、')}。` : '')

function select(item) {
  actions.value.push(item.signal)
  emit('answered', { social: 1 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>模擬社群推薦</h3>
    <div class="bias-grid">
      <article v-for="item in feed" :key="item.title" class="bias-card">
        <span>{{ item.tag }}</span>
        <h3>{{ item.title }}</h3>
        <p>如果你停留更久，平台會認為你想看更多類似內容。</p>
        <button type="button" class="primary-action" @click="select(item)">停留觀看</button>
      </article>
    </div>
    <p v-if="analysis" class="feedback">{{ analysis }}</p>
  </section>
</template>
