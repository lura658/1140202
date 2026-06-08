<script setup>
defineProps({
  chapters: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
  showSummary: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <aside class="chapter-nav" aria-label="章節導覽">
    <button
      v-for="(chapter, index) in chapters"
      :key="chapter.title"
      class="chapter-tab"
      :class="{ active: activeIndex === index }"
      type="button"
      @click="$emit('select', index)"
    >
      <span>{{ chapter.kicker }}</span>
      <strong>{{ chapter.title }}</strong>
    </button>
    <button
      v-if="showSummary"
      class="chapter-tab"
      :class="{ active: activeIndex === -1 }"
      type="button"
      @click="$emit('select', -1)"
    >
      <span>學習分析報告</span>
      <strong>個人總攬表</strong>
    </button>
  </aside>
</template>
