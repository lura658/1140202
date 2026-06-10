<!--
  * 對應章節：系統 / 登入首頁 (Login Home)
  * 檔案功能：處理使用者的登入與註冊，呈現背景粒子動畫，並串接 Google Apps Script 進行帳號檢查與狀態初始化。
-->

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps({
  appsScriptUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['login'])
const canvasRef = ref(null)
const errorMessage = ref('')
const checking = ref(false)
const form = reactive({
  name: '',
  username: '',
})

let animationId = 0
let resizeCanvas = null

function normalizeUsername(value) {
  return value.trim().toLowerCase()
}

function jsonp(url, params) {
  return new Promise((resolve, reject) => {
    const callbackName = `scoreCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const script = document.createElement('script')
    const query = new URLSearchParams({
      ...params,
      callback: callbackName,
    })

    window[callbackName] = (data) => {
      resolve(data)
      script.remove()
      delete window[callbackName]
    }

    script.onerror = () => {
      reject(new Error('Apps Script 無法連線'))
      script.remove()
      delete window[callbackName]
    }

    script.src = `${url}?${query.toString()}`
    document.body.appendChild(script)
  })
}

async function login() {
  errorMessage.value = ''
  const name = form.name.trim()
  const username = normalizeUsername(form.username)

  if (!name || !username) {
    errorMessage.value = '請輸入姓名與使用者名稱。'
    return
  }

  checking.value = true
  try {
    const result = await jsonp(props.appsScriptUrl, {
      action: 'registerLearner',
      name,
      username,
    })

    if (!result.ok) {
      errorMessage.value = result.message || '登入失敗，請稍後再試。'
      return
    }

    emit('login', {
      name,
      username,
      startedAt: new Date().toISOString(),
    })
  } catch {
    errorMessage.value = '無法檢查使用者名稱，請確認 Apps Script 已部署為「任何人可存取」。'
  } finally {
    checking.value = false
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const particles = Array.from({ length: 58 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0018,
    vy: (Math.random() - 0.5) * 0.0018,
    r: 2 + Math.random() * 3,
  }))

  resizeCanvas = function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
  }

  function draw() {
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'rgba(247, 248, 243, 0.9)'
    ctx.fillRect(0, 0, width, height)

    particles.forEach((dot, index) => {
      dot.x += dot.vx
      dot.y += dot.vy
      if (dot.x < 0 || dot.x > 1) dot.vx *= -1
      if (dot.y < 0 || dot.y > 1) dot.vy *= -1

      const x = dot.x * width
      const y = dot.y * height
      ctx.beginPath()
      ctx.fillStyle = index % 3 === 0 ? '#c48a1b' : index % 3 === 1 ? '#196d77' : '#b85b62'
      ctx.arc(x, y, dot.r * window.devicePixelRatio, 0, Math.PI * 2)
      ctx.fill()

      particles.slice(index + 1).forEach((other) => {
        const ox = other.x * width
        const oy = other.y * height
        const distance = Math.hypot(x - ox, y - oy)
        if (distance < 145 * window.devicePixelRatio) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(25, 109, 119, ${1 - distance / (145 * window.devicePixelRatio)})`
          ctx.lineWidth = 0.65 * window.devicePixelRatio
          ctx.moveTo(x, y)
          ctx.lineTo(ox, oy)
          ctx.stroke()
        }
      })
    })

    animationId = requestAnimationFrame(draw)
  }

  resizeCanvas()
  draw()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  if (resizeCanvas) {
    window.removeEventListener('resize', resizeCanvas)
  }
})
</script>

<template>
  <main class="login-home">
    <canvas ref="canvasRef" class="home-canvas" aria-hidden="true"></canvas>
    <section class="login-panel">
      <p class="eyebrow">心理學互動學習平台</p>
      <h1>你以為是自己決定的？</h1>
      <p>輸入姓名與唯一的使用者名稱後開始學習，系統會自動更新每章測驗成績。</p>

      <form class="login-form" @submit.prevent="login">
        <label>
          姓名
          <input v-model="form.name" type="text" autocomplete="name" placeholder="請輸入姓名" />
        </label>
        <label>
          使用者名稱
          <input v-model="form.username" type="text" autocomplete="username" placeholder="例如：amy_01" />
        </label>
        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
        <button type="submit" :disabled="checking">
          {{ checking ? '檢查中...' : '登入並開始學習' }}
        </button>
      </form>
    </section>
  </main>
</template>
