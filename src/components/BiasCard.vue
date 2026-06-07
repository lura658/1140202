<script setup>
defineProps({
  bias: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="bias-card">
    <span>{{ bias.category }}</span>
    <h3>{{ bias.name }}</h3>
    <p>{{ bias.summary }}</p>
    <small>生活案例：{{ bias.example }}</small>
  </article>
</template>
