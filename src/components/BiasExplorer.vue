<script setup>
import { computed, ref } from 'vue'
import BiasCard from './BiasCard.vue'
import QuickQuiz from './QuickQuiz.vue'

const search = ref('')
const activeCategory = ref('全部')

const biases = [
  { category: '資訊處理偏誤', name: '確認偏誤', summary: '只尋找支持自己想法的資訊。', example: '只看同立場影片，越看越覺得自己一定對。' },
  { category: '資訊處理偏誤', name: '可得性捷思', summary: '用最容易想到的例子判斷機率。', example: '剛看到空難新聞，就覺得搭飛機很危險。' },
  { category: '記憶偏誤', name: '曼德拉效應', summary: '許多人共同記錯同一件事。', example: '大家都以為某句台詞或標誌曾經長那樣。' },
  { category: '記憶偏誤', name: '後見之明偏誤', summary: '事情發生後覺得自己早就知道。', example: '考完才說這題我本來就覺得會考。' },
  { category: '社會偏誤', name: '從眾效應', summary: '因為多數人選擇而跟著選。', example: '排隊名店越多人排，越覺得一定好吃。' },
  { category: '社會偏誤', name: '光環效應', summary: '一個優點影響整體評價。', example: '覺得外表有自信的人，能力也一定比較好。' },
  { category: '決策偏誤', name: '沉沒成本', summary: '因為已經投入而不願停止。', example: '電影很難看，但票都買了還是看完。' },
  { category: '決策偏誤', name: '現狀偏誤', summary: '偏好維持原本選項。', example: '明知方案不適合，仍懶得更換。' },
  { category: '自我認知偏誤', name: '達克效應', summary: '能力不足時反而高估自己。', example: '只學一點投資，就覺得自己能穩贏市場。' },
  { category: '自我認知偏誤', name: '自利偏誤', summary: '成功歸功自己，失敗怪外在。', example: '考高分是我努力，考差是老師出太難。' },
]

const categories = computed(() => ['全部', ...new Set(biases.map((bias) => bias.category))])
const filteredBiases = computed(() => {
  const keyword = search.value.trim()
  return biases.filter((bias) => {
    const matchesCategory = activeCategory.value === '全部' || bias.category === activeCategory.value
    const matchesSearch = !keyword || `${bias.name}${bias.summary}${bias.example}`.includes(keyword)
    return matchesCategory && matchesSearch
  })
})
const showQuiz = ref(false)

function openQuiz() {
  showQuiz.value = true
}

function closeQuiz() {
  showQuiz.value = false
}
</script>

<template>
  <div class="interactive-block">
    <div class="search-row">
      <input v-model="search" type="search" placeholder="搜尋心理效應，例如：從眾、記憶、決策" />
    </div>

    <div class="mini-toolbar">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: activeCategory === category }"
        type="button"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
      <button class="primary-action" type="button" @click="openQuiz">開始快問快答</button>
    </div>

    <div class="bias-grid">
      <BiasCard
        v-for="bias in filteredBiases"
        :key="bias.name"
        :bias="bias"
      />
    </div>

    <QuickQuiz v-if="showQuiz" :biases="biases" @close="closeQuiz" />
  </div>
</template>
