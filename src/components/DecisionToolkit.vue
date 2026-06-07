<script setup>
const shoppingQuestions = ['我真的需要嗎？', '我多久會用一次？', '有替代品嗎？', '明天還會想買嗎？', '不買會造成什麼損失？']
const mediaSteps = ['誰說的？', '證據是什麼？', '有反面觀點嗎？', '我是不是只相信想相信的？']
</script>

<template>
  <div class="toolkit-grid">
    <section class="tool-panel">
      <h3>購物前五問</h3>
      <label v-for="question in shoppingQuestions" :key="question">
        <input type="checkbox" />
        <span>{{ question }}</span>
      </label>
    </section>

    <section class="tool-panel">
      <h3>資訊判讀四步驟</h3>
      <ol>
        <li v-for="step in mediaSteps" :key="step">{{ step }}</li>
      </ol>
    </section>
  </div>
</template>
