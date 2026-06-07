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
  </aside>
</template>
