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
  </section>
</template>
