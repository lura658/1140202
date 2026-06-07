<script setup>
const emit = defineEmits(['finished'])

function finish() {
  emit('finished', { memory: 2 })
}
</script>

<template>
  <section class="interactive-block">
    <h3>記憶三階段</h3>
    <div class="pipeline">
      <button type="button" @click="finish">
        <strong>Encoding</strong>
        <span>把注意到的資訊轉成可儲存的線索</span>
      </button>
      <button type="button" @click="finish">
        <strong>Storage</strong>
        <span>資訊被保存，但不一定完整</span>
      </button>
      <button type="button" @click="finish">
        <strong>Retrieval</strong>
        <span>回想時重新組合記憶</span>
      </button>
    </div>
    <p class="feedback">點選任何階段都能看到重點：記憶是流程，不是錄影檔。</p>
  </section>
</template>
