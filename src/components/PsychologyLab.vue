<script setup>
import { computed, ref } from 'vue'
import ResultChart from './ResultChart.vue'

const props = defineProps({
  signals: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answered'])
const selected = ref({})

const tests = [
  {
    id: 'confirm',
    question: '看到和你立場相反的文章時，你通常會？',
    options: [
      { label: '先找資料確認', score: { rational: 2 } },
      { label: '先懷疑它有問題', score: { confirmation: 2 } },
    ],
  },
  {
    id: 'group',
    question: '朋友都說某餐廳很好吃，但你看評價普通，你會？',
    options: [
      { label: '跟著大家去', score: { social: 2 } },
      { label: '再比較其他選擇', score: { rational: 1 } },
    ],
  },
  {
    id: 'cost',
    question: '遊戲已經玩了 40 小時但不喜歡了，你會？',
    options: [
      { label: '都玩這麼久了繼續玩', score: { sunkCost: 2 } },
      { label: '停止，把時間拿回來', score: { rational: 2 } },
    ],
  },
]

const profileText = computed(() => {
  const entries = Object.entries(props.signals).sort((a, b) => b[1] - a[1])
  const top = entries[0]
  const labels = {
    social: '你較容易受到從眾效應與社會認同影響。',
    scarcity: '你對限時、折扣與稀缺訊息比較敏感。',
    sunkCost: '你可能會因為已投入成本而不容易停下。',
    memory: '你的記憶測驗提醒你：回憶很容易被重建。',
    confirmation: '你需要特別留意確認偏誤。',
    intuitive: '你常用快速直覺處理問題。',
    rational: '你很常啟動系統二，會刻意檢查判斷。',
  }
  return top && top[1] > 0 ? labels[top[0]] : '完成上方互動後，這裡會產生你的個人心理分析報告。'
})

function choose(test, option) {
  selected.value[test.id] = option.label
  emit('answered', option.score)
}
</script>

<template>
  <div class="interactive-block lab-layout">
    <section class="lab-tests">
      <article v-for="test in tests" :key="test.id" class="lab-test">
        <h3>{{ test.question }}</h3>
        <div class="choice-grid">
          <button
            v-for="option in test.options"
            :key="option.label"
            :class="{ selected: selected[test.id] === option.label }"
            type="button"
            @click="choose(test, option)"
          >
            {{ option.label }}
          </button>
        </div>
      </article>
    </section>

    <section class="report-panel">
      <h3>個人心理分析報告</h3>
      <p>{{ profileText }}</p>
      <ResultChart :signals="signals" />
    </section>
  </div>
</template>
