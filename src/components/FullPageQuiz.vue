<!--
  * 對應章節：佈局元件 / 全螢幕測驗框架 (Full Page Quiz)
  * 檔案功能：作為章節測驗 (Chapter Quiz) 的全螢幕容器，提供標題列與返回導航功能。
-->

<script setup>
import ChapterQuiz from './ChapterQuiz.vue'
const props = defineProps({
  chapter: { type: Object, required: true },
  chapterIndex: { type: Number, required: true },
  learner: { type: Object, required: true },
  appsScriptUrl: { type: String, required: true },
  totalScore: { type: Number, required: true },
})
const emit = defineEmits(['close', 'scored'])

function handleScored(result) {
  emit('scored', result)
}

function goBack() {
  emit('close')
}
</script>

<template>
  <div class="fullpage-quiz">
    <header class="quiz-topbar">
      <button class="text-action" type="button" @click="goBack">← 回到章節</button>
      <h3>本章測驗：{{ chapter.title }}</h3>
    </header>

    <main class="quiz-main">
      <ChapterQuiz
        :chapter="chapter"
        :chapter-index="chapterIndex"
        :learner="learner"
        :apps-script-url="appsScriptUrl"
        :total-score="totalScore"
        @scored="handleScored"
      />
    </main>
  </div>
</template>

<style>
.fullpage-quiz { min-height: 100vh; display: grid; grid-template-rows: auto 1fr; background: var(--bg-color); padding: 28px; }
.quiz-topbar { display:flex; gap:12px; align-items:center; color:var(--text-color); }
.quiz-main { margin-top: 12px; }
</style>
