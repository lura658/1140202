<script setup>
import { ref } from 'vue'

defineProps({
  chapter: {
    type: Object,
    required: true,
  },
})

const showChallenge = ref(false)
function toggleChallenge() { showChallenge.value = !showChallenge.value }
</script>

<template>
  <section class="chapter-panel">
    <div class="chapter-heading">
      <p class="eyebrow">{{ chapter.kicker }}</p>
      <h2>{{ chapter.title }}</h2>
      <p>{{ chapter.intro }}</p>
    </div>

    <ul class="key-points">
      <li
        v-for="point in chapter.points"
        :key="point"
      >
        {{ point }}
      </li>
    </ul>

    <slot />

    <div class="action-challenge">
      <button class="text-action" type="button" @click="toggleChallenge">小任務：立即練習 ▼</button>
      <div v-if="showChallenge" class="challenge-body">
        <p>把本章概念帶入 60 秒練習：列出 3 個日常情境，你覺得自己可能會被本章提到的偏誤影響。完成後勾選「完成」，下次回來檢視變化。</p>
        <div style="margin-top:8px"><button class="primary-action" type="button">我完成了（記錄）</button></div>
      </div>
    </div>
  </section>
</template>
