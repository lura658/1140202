<script setup>
import { computed, ref, watch } from 'vue'
import ResultChart from './ResultChart.vue'

const props = defineProps({
  chapter: {
    type: Object,
    required: true,
  },
  signals: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answered'])
const selected = ref({})
const locked = ref({})  // track which tests are locked after selection

const chapterKey = computed(() => `${props.chapter.activity}:${props.chapter.title}`)

// load state from localStorage when component mounts
function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem('psychLabState')
    if (saved) {
      const allStates = JSON.parse(saved)
      // 如果是舊版單一章節格式，則重置；否則抓取該章節的獨立紀錄
      if (allStates.chapterKey) {
        selected.value = {}
        locked.value = {}
      } else {
        const state = allStates[chapterKey.value] || {}
        selected.value = state.selected || {}
        locked.value = state.locked || {}
      }
    }
  } catch (e) {
    console.error('failed to load psych lab state', e)
  }
}

// save state to localStorage
function saveStateToStorage() {
  try {
    const saved = localStorage.getItem('psychLabState')
    let allStates = {}
    if (saved) {
      try {
        allStates = JSON.parse(saved)
        if (allStates.chapterKey) allStates = {} // 洗掉舊版格式
      } catch(e) {}
    }
    allStates[chapterKey.value] = { selected: selected.value, locked: locked.value }
    localStorage.setItem('psychLabState', JSON.stringify(allStates))
  } catch (e) {
    console.error('failed to save psych lab state', e)
  }
}

// load on mount
loadStateFromStorage()

watch(chapterKey, () => {
  // 切換章節時，從 LocalStorage 讀取該章節已保存的狀態
  loadStateFromStorage()
})

const tests = computed(() => {
  const base = {
    illusion: [
      {
        id: 'illusion-1',
        question: '看到圖像的第一反應是什麼？你通常會？',
        options: [
          { label: '相信眼前所見，迅速判斷', score: { intuitive: 2 } },
          { label: '覺得這可能是錯覺，先多看幾眼', score: { rational: 2 } },
        ],
      },
      {
        id: 'illusion-2',
        question: '對於不完整的視覺訊號，你傾向？',
        options: [
          { label: '用經驗填補缺口', score: { confirmation: 1 } },
          { label: '保持懷疑並等待更多資訊', score: { rational: 2 } },
        ],
      },
      {
        id: 'illusion-3',
        question: '如果一張圖片看起來不合理，你會？',
        options: [
          { label: '直接判斷它是錯覺', score: { confirmation: 1 } },
          { label: '試著分析為何看起來不對', score: { rational: 2 } },
        ],
      },
    ],
    gestalt: [
      {
        id: 'gestalt-1',
        question: '你是否常把零碎訊息視為完整圖案？',
        options: [
          { label: '是，我習慣一眼看整體', score: { intuitive: 2 } },
          { label: '我會慢慢拆解每個部分', score: { rational: 2 } },
        ],
      },
      {
        id: 'gestalt-2',
        question: '當看到不連續線條，你會？',
        options: [
          { label: '想像它們可能連在一起', score: { social: 1 } },
          { label: '保持它們就是分離的', score: { rational: 2 } },
        ],
      },
      {
        id: 'gestalt-3',
        question: '你會先注意整體形狀還是細節？',
        options: [
          { label: '整體形狀', score: { intuitive: 2 } },
          { label: '細節差異', score: { rational: 2 } },
        ],
      },
    ],
    memoryPipeline: [
      {
        id: 'memory-1',
        question: '回憶舊事時，你最容易？',
        options: [
          { label: '憑印象快速描述', score: { memory: 2 } },
          { label: '努力回想細節再說', score: { rational: 2 } },
        ],
      },
      {
        id: 'memory-2',
        question: '你是否會把後來聽到的資訊當成原本發生的事？',
        options: [
          { label: '常常會', score: { memory: 2 } },
          { label: '不太會，我會分辨不同來源', score: { rational: 2 } },
        ],
      },
      {
        id: 'memory-3',
        question: '當你回憶時，你相信它像？',
        options: [
          { label: '錄影帶，完整重播', score: { confirmation: 1 } },
          { label: '重寫故事，會變動', score: { memory: 2 } },
        ],
      },
    ],
    misinformation: [
      {
        id: 'misinfo-1',
        question: '面對大量矛盾資訊，你會？',
        options: [
          { label: '選最符合原本想法的', score: { confirmation: 2 } },
          { label: '分析每個來源再決定', score: { rational: 2 } },
        ],
      },
      {
        id: 'misinfo-2',
        question: '聽到「大家都這麼說」時，你通常？',
        options: [
          { label: '容易相信並接受', score: { social: 2 } },
          { label: '還是查證一次', score: { rational: 2 } },
        ],
      },
      {
        id: 'misinfo-3',
        question: '當你發現自己記錯細節時，你會？',
        options: [
          { label: '覺得記憶沒問題，可能他們錯', score: { confirmation: 1 } },
          { label: '承認記憶會被影響', score: { memory: 2 } },
        ],
      },
    ],
    emotion: [
      {
        id: 'emotion-1',
        question: '情緒強烈時，你會？',
        options: [
          { label: '依直覺立即行動', score: { intuitive: 2 } },
          { label: '先冷靜判斷', score: { rational: 2 } },
        ],
      },
      {
        id: 'emotion-2',
        question: '你是否容易被當下心情影響選擇？',
        options: [
          { label: '是，情緒左右我很多', score: { emotion: 2 } },
          { label: '不太會，我會分開情緒與事實', score: { rational: 2 } },
        ],
      },
      {
        id: 'emotion-3',
        question: '壓力下你比較常？',
        options: [
          { label: '跟著感覺走', score: { intuitive: 2 } },
          { label: '試著冷靜分析', score: { rational: 2 } },
        ],
      },
    ],
    emotionDecision: [
      {
        id: 'emotionDecision-1',
        question: '你在做決定前會先檢查情緒嗎？',
        options: [
          { label: '不會，我先看直覺', score: { intuitive: 2 } },
          { label: '會，覺得情緒很重要', score: { emotion: 2 } },
        ],
      },
      {
        id: 'emotionDecision-2',
        question: '你覺得情緒讓你判斷變得？',
        options: [
          { label: '更真實', score: { emotion: 2 } },
          { label: '更容易偏頗', score: { rational: 2 } },
        ],
      },
      {
        id: 'emotionDecision-3',
        question: '面對風險，你更信任？',
        options: [
          { label: '直覺感覺', score: { intuitive: 2 } },
          { label: '數據與分析', score: { rational: 2 } },
        ],
      },
    ],
    system: [
      {
        id: 'system-1',
        question: '你做快速判斷時會？',
        options: [
          { label: '相信第一直覺', score: { intuitive: 2 } },
          { label: '覺得需要再想一想', score: { rational: 2 } },
        ],
      },
      {
        id: 'system-2',
        question: '你是否會因為忙碌而省略深思？',
        options: [
          { label: '是，常用系統一', score: { intuitive: 2 } },
          { label: '不會，我會特意慢下來', score: { rational: 2 } },
        ],
      },
      {
        id: 'system-3',
        question: '當你想要提高決策品質，你會？',
        options: [
          { label: '靠經驗與直覺', score: { intuitive: 1 } },
          { label: '靠邏輯與流程', score: { rational: 2 } },
        ],
      },
    ],
    bias: [
      {
        id: 'bias-1',
        question: '面對不確定的資訊，你通常？',
        options: [
          { label: '挑最容易想到的例子', score: { confirmation: 1 } },
          { label: '再多想幾個可能性', score: { rational: 2 } },
        ],
      },
      {
        id: 'bias-2',
        question: '你是否容易受第一印象影響？',
        options: [
          { label: '是，第一印象很重', score: { confirmation: 2 } },
          { label: '不會，我會多觀察', score: { rational: 2 } },
        ],
      },
      {
        id: 'bias-3',
        question: '你判斷時更相信？',
        options: [
          { label: '感覺對的那個答案', score: { intuitive: 2 } },
          { label: '追求證據與邏輯', score: { rational: 2 } },
        ],
      },
    ],
    scenario: [
      {
        id: 'scenario-1',
        question: '有人說：「大家都這樣做」，你會？',
        options: [
          { label: '覺得應該跟著做', score: { social: 2 } },
          { label: '判斷是否合理再決定', score: { rational: 2 } },
        ],
      },
      {
        id: 'scenario-2',
        question: '如果群體意見和你不同，你會？',
        options: [
          { label: '調整自己的想法', score: { social: 2 } },
          { label: '保持原本判斷', score: { rational: 2 } },
        ],
      },
      {
        id: 'scenario-3',
        question: '面對壓力，你容易？',
        options: [
          { label: '採取安全選擇', score: { social: 1 } },
          { label: '依據事實分析', score: { rational: 2 } },
        ],
      },
    ],
    socialMedia: [
      {
        id: 'socialMedia-1',
        question: '你是否常根據演算法推薦決定？',
        options: [
          { label: '是，推薦影響我', score: { social: 2 } },
          { label: '不，我會自己搜尋', score: { rational: 2 } },
        ],
      },
      {
        id: 'socialMedia-2',
        question: '你看到熱門貼文會？',
        options: [
          { label: '認為它比較可信', score: { social: 2 } },
          { label: '先想它可能只是受歡迎', score: { rational: 2 } },
        ],
      },
      {
        id: 'socialMedia-3',
        question: '在社群中你是否容易被情緒帶動？',
        options: [
          { label: '會，情緒影響我很多', score: { emotion: 2 } },
          { label: '不太會，我會冷靜思考', score: { rational: 2 } },
        ],
      },
    ],
    conspiracy: [
      {
        id: 'conspiracy-1',
        question: '你是否容易在隨機事件中找出陰謀？',
        options: [
          { label: '是，我喜歡連結線索', score: { confirmation: 2 } },
          { label: '不，我覺得事情可能只是巧合', score: { rational: 2 } },
        ],
      },
      {
        id: 'conspiracy-2',
        question: '感到無助時，你會？',
        options: [
          { label: '想知道誰在操控', score: { confirmation: 1 } },
          { label: '尋找真實證據', score: { rational: 2 } },
        ],
      },
      {
        id: 'conspiracy-3',
        question: '你比較相信？',
        options: [
          { label: '背後有大計畫', score: { confirmation: 2 } },
          { label: '事情可能沒有那麼複雜', score: { rational: 2 } },
        ],
      },
    ],
    fakeNews: [
      {
        id: 'fakeNews-1',
        question: '看到震撼標題，你會？',
        options: [
          { label: '先點進去看', score: { social: 1 } },
          { label: '先留心是不是假新聞', score: { rational: 2 } },
        ],
      },
      {
        id: 'fakeNews-2',
        question: '如果內容讓你很生氣，你會？',
        options: [
          { label: '容易相信並分享', score: { emotion: 2 } },
          { label: '先檢查來源再分享', score: { rational: 2 } },
        ],
      },
      {
        id: 'fakeNews-3',
        question: '你是否會因為內容符合自己的立場而特別信任？',
        options: [
          { label: '會，立場一致讓我放心', score: { confirmation: 2 } },
          { label: '不，我會保持懷疑', score: { rational: 2 } },
        ],
      },
    ],
    toolkit: [
      {
        id: 'toolkit-1',
        question: '你會在做決策前問自己嗎？',
        options: [
          { label: '很少，我直接決定', score: { intuitive: 2 } },
          { label: '會，我會先反思', score: { rational: 2 } },
        ],
      },
      {
        id: 'toolkit-2',
        question: '你是否常用清單檢查自己的想法？',
        options: [
          { label: '不太會', score: { intuitive: 2 } },
          { label: '會的，這讓我更謹慎', score: { rational: 2 } },
        ],
      },
      {
        id: 'toolkit-3',
        question: '遇到重大選擇，你會？',
        options: [
          { label: '憑感覺做決定', score: { intuitive: 2 } },
          { label: '用一套方法檢查', score: { rational: 2 } },
        ],
      },
    ],
    decisionChecklist: [
      {
        id: 'decisionChecklist-1',
        question: '理性決策檢查表的第一步應該是？',
        options: [
          { label: '檢查資訊來源是否可靠', score: { rational: 2 } },
          { label: '先聽自己的第一直覺', score: { intuitive: 2 } },
        ],
      },
      {
        id: 'decisionChecklist-2',
        question: '貝氏更新提醒我們看到新證據後應該做什麼？',
        options: [
          { label: '調整原先的信念', score: { rational: 2 } },
          { label: '堅持最初的看法', score: { intuitive: 2 } },
        ],
      },
      {
        id: 'decisionChecklist-3',
        question: '以下哪一項最適合出現在理性決策檢查表中？',
        options: [
          { label: '這個資訊的來源是否可靠？', score: { rational: 2 } },
          { label: '這個網紅說了什麼？', score: { intuitive: 2 } },
        ],
      },
    ],
    map: [
      {
        id: 'map-1',
        question: '你是否會回頭檢視自己最近的判斷？',
        options: [
          { label: '會，常反思', score: { rational: 2 } },
          { label: '不太，覺得沒必要', score: { intuitive: 2 } },
        ],
      },
      {
        id: 'map-2',
        question: '發現自己犯錯時，你通常？',
        options: [
          { label: '責怪外部因素', score: { confirmation: 1 } },
          { label: '思考怎麼改進', score: { rational: 2 } },
        ],
      },
      {
        id: 'map-3',
        question: '你覺得最重要的心理能力是？',
        options: [
          { label: '快速直覺', score: { intuitive: 2 } },
          { label: '自我覺察', score: { rational: 2 } },
        ],
      },
    ],
  }
  return base[props.chapter.activity] || base.bias
})

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
  // only allow selection if not locked
  if (locked.value[test.id]) return
  
  selected.value[test.id] = option.label
  locked.value[test.id] = true
  saveStateToStorage()
  emit('answered', option.score)
}

function resetChoice(testId) {
  // clear score by emitting negative of previous scores
  const test = tests.find(t => t.id === testId)
  const prevOption = test.options.find(o => o.label === selected.value[testId])
  if (prevOption) {
    const negScore = {}
    Object.entries(prevOption.score).forEach(([key, val]) => {
      negScore[key] = -val
    })
    emit('answered', negScore)
  }
  
  selected.value[testId] = null
  locked.value[testId] = false
  saveStateToStorage()
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
            :class="{ selected: selected[test.id] === option.label, disabled: locked[test.id] && selected[test.id] !== option.label }"
            type="button"
            :disabled="locked[test.id] && selected[test.id] !== option.label"
            @click="choose(test, option)"
          >
            {{ option.label }}
          </button>
        </div>
        <div v-if="locked[test.id]" style="margin-top:8px; display:flex; gap:8px; align-items:center;">
          <small style="color:rgba(248,250,252,0.7)">已選擇</small>
          <button class="text-action" type="button" @click="resetChoice(test.id)">重新選擇</button>
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
