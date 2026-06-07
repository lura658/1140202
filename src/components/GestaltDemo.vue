<script setup>
import { ref } from 'vue'

const emit = defineEmits(['answered'])
const active = ref('接近律')
const principles = {
  接近律: '距離近的元素會被大腦看成同一組。',
  相似律: '顏色、形狀或大小相似的元素容易被歸為一類。',
  閉合律: '即使圖形有缺口，大腦也會自動補成完整形狀。',
  連續律: '大腦偏好把線條看成平滑連續的方向。',
}

function select(name) {
  active.value = name
  emit('answered', { perception: 1 })
}
</script>

<template>
  <section class="interactive-block">
    <div class="mini-toolbar">
      <button
        v-for="(_, name) in principles"
        :key="name"
        :class="{ active: active === name }"
        type="button"
        @click="select(name)"
      >
        {{ name }}
      </button>
    </div>

    <div class="gestalt-board" :class="active">
      <span v-for="i in 16" :key="i"></span>
    </div>
    <p class="feedback">{{ principles[active] }}這也是 Logo、網頁與廣告設計常用的視覺規則。</p>
  </section>
</template>
