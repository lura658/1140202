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
const activeQuestion = ref(makeRandomQuestion())

const isCorrect = computed(() => selected.value === activeQuestion.value.answer)

watch(
  () => props.chapterIndex,
  () => {
    selected.value = ''
    submitted.value = false
    uploadStatus.value = ''
    activeQuestion.value = makeRandomQuestion()
  },
)

function makeRandomQuestion() {
  const pool = props.chapter.questions
  return pool[Math.floor(Math.random() * pool.length)]
}

async function submitQuiz() {
  if (!selected.value) return
  submitted.value = true

  const score = isCorrect.value ? 10 : 0
  const result = {
    chapterIndex: props.chapterIndex,
    chapterTitle: props.chapter.title,
    score,
    answer: selected.value,
    correctAnswer: activeQuestion.value.answer,
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

function nextRandomQuestion() {
  selected.value = ''
  submitted.value = false
  uploadStatus.value = ''
  activeQuestion.value = makeRandomQuestion()
}
</script>

<template>
  <section class="chapter-quiz">
    <p class="eyebrow">隨機理解測驗</p>
    <h3>{{ activeQuestion.question }}</h3>
    <div class="choice-grid">
      <button
        v-for="option in activeQuestion.options"
        :key="option"
        type="button"
        :class="{ selected: selected === option }"
        :disabled="submitted"
        @click="selected = option"
      >
        {{ option }}
      </button>
    </div>

    <button
      class="primary-action"
      type="button"
      :disabled="!selected || sending"
      @click="submitQuiz"
    >
      送出本章測驗
    </button>

    <p v-if="submitted" class="feedback">
      {{ isCorrect ? '答對了！' : `這題答案是「${activeQuestion.answer}」。` }}
      {{ uploadStatus }}
    </p>
    <button v-if="submitted" class="text-action" type="button" @click="nextRandomQuestion">
      換一題練習
    </button>
  </section>
</template>
