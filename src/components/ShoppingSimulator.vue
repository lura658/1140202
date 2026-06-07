<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['choice'])
const selected = ref(null)

const products = [
  {
    name: 'Focus Pro 耳機',
    price: 999,
    original: 2999,
    badge: '限時 72 折',
    cues: ['錨定效應', '稀缺效應'],
    signal: { scarcity: 2 },
  },
  {
    name: 'Study Flow 筆記套組',
    price: 480,
    original: 520,
    badge: '同學推薦',
    cues: ['社會認同', '從眾效應'],
    signal: { social: 2 },
  },
  {
    name: 'Basic Timer 計時器',
    price: 260,
    original: 260,
    badge: '需求明確',
    cues: ['理性比較', '系統二'],
    signal: { rational: 2 },
  },
]

const analysis = computed(() => {
  if (!selected.value) return ''
  return `你選擇了 ${selected.value.name}。可能影響你的機制：${selected.value.cues.join('、')}。`
})

function choose(product) {
  selected.value = product
  emit('choice', product.signal)
}
</script>

<template>
  <div class="interactive-block">
    <div class="shop-grid">
      <article
        v-for="product in products"
        :key="product.name"
        class="product-card"
        :class="{ selected: selected?.name === product.name }"
      >
        <span>{{ product.badge }}</span>
        <h3>{{ product.name }}</h3>
        <p class="price">
          <del>NT$ {{ product.original }}</del>
          <strong>NT$ {{ product.price }}</strong>
        </p>
        <button type="button" @click="choose(product)">選擇這個</button>
      </article>
    </div>

    <p v-if="analysis" class="feedback">{{ analysis }}</p>
  </div>
</template>
