<!--
  * 對應章節：各章節 / 隨機測驗區塊 (Chapter Quiz)
  * 檔案功能：負責處理章節末的隨機抽取題目、使用者作答互動、計算成績，並將結果上傳至遠端儲存。
-->

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  chapter: {
    type: Object,
    required: true,
  },
  chapterIndex: {
    type: Number,
    required: true,
  },
  learner: {
    type: Object,
    required: true,
  },
  appsScriptUrl: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['scored'])
const selected = ref('')
const submitted = ref(false)
const sending = ref(false)
const uploadStatus = ref('')
const questionIndex = ref(0)
const answers = ref([])
const activeQuestions = ref([])
const quizDone = ref(false)

const currentQuestion = computed(() => activeQuestions.value[questionIndex.value] || {})
const questionProgress = computed(() => `${Math.min(questionIndex.value + 1, activeQuestions.value.length)} / ${activeQuestions.value.length}`)
const isCorrect = computed(() => selected.value === currentQuestion.value.answer)
const totalScore = computed(() => answers.value.reduce((sum, item) => sum + (item.correct ? 10 : 0), 0))
const finished = computed(() => quizDone.value)

watch(
  () => props.chapterIndex,
  () => {
    resetQuiz()
  },
)

function makeQuestionSet() {
  const pool = [...props.chapter.questions]
  const result = []
  while (result.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(idx, 1)[0])
  }
  return result
}

async function submitQuiz() {
  if (!selected.value) return
  submitted.value = true

  answers.value.push({
    question: currentQuestion.value.question,
    answer: selected.value,
    correctAnswer: currentQuestion.value.answer,
    correct: isCorrect.value,
  })

  if (questionIndex.value < activeQuestions.value.length - 1) {
    questionIndex.value += 1
    selected.value = ''
    submitted.value = false
  } else {
    await finalizeQuiz()
    quizDone.value = true
  }
}

async function finalizeQuiz() {
  const result = {
    chapterIndex: props.chapterIndex,
    chapterTitle: props.chapter.title,
    score: totalScore.value,
    answer: answers.value.map((item) => item.answer).join(' | '),
    correctAnswer: answers.value.map((item) => item.correctAnswer).join(' | '),
    submittedAt: new Date().toISOString(),
  }

  emit('scored', result)
  await uploadScore(result)
}

async function uploadScore(result) {
  sending.value = true
  uploadStatus.value = '正在更新成績...'

  const body = new URLSearchParams({
    action: 'saveScore',
    name: props.learner?.name || '未知',
    username: props.learner?.username || '未知',
    chapter: result.chapterTitle,
    chapterIndex: String(result.chapterIndex + 1),
    score: String(result.score),
    totalScore: String(props.totalScore + result.score),
    answer: result.answer,
    correctAnswer: result.correctAnswer,
    submittedAt: result.submittedAt,
  })

  try {
    await fetch(props.appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    })
    uploadStatus.value = '已送出成績到試算表。'
  } catch {
    uploadStatus.value = '目前無法連線更新，請確認 Apps Script 部署與試算表網址。'
  } finally {
    sending.value = false
  }
}

function resetQuiz() {
  activeQuestions.value = makeQuestionSet()
  questionIndex.value = 0
  selected.value = ''
  submitted.value = false
  sending.value = false
  uploadStatus.value = ''
  answers.value = []
  quizDone.value = false
}

resetQuiz()
</script>

<template>
  <section class="chapter-quiz">
    <p class="eyebrow">隨機理解測驗</p>
    <p class="quiz-progress">題目 {{ questionProgress }}</p>
    <h3>{{ currentQuestion.question }}</h3>
    <div class="choice-grid">
      <button
        v-for="option in currentQuestion.options"
        :key="option"
        type="button"
        :class="{ selected: selected === option }"
        :disabled="submitted || finished"
        @click="selected = option"
      >
        {{ option }}
      </button>
    </div>

    <button
      class="primary-action"
      type="button"
      :disabled="!selected || sending || finished"
      @click="submitQuiz"
    >
      {{ questionIndex < activeQuestions.length - 1 ? '下一題' : '完成測驗' }}
    </button>

    <p v-if="submitted && !finished" class="feedback">
      {{ isCorrect ? '答對了！' : `這題答案是「${currentQuestion.answer}」。` }}
    </p>

    <div v-if="finished" class="quiz-summary">
      <p class="eyebrow">測驗完成</p>
      <p>本次共答對 {{ totalScore / 10 }} / {{ activeQuestions.length }} 題，總得分 {{ totalScore }} 分。</p>
      <p>{{ uploadStatus }}</p>
    </div>
  </section>
</template>
