<script setup>
import { createAppCaller } from '../../dist/index.js'

// const appCaller = createAppCaller({
//   scheme: 'phizscheme',
//   fallback: 'https://phiz.chat'
// })

const appCaller = createAppCaller({
  scheme: 'phizscheme',
  // universalHost: 'share.phiz.chat',
  storeLinks: {
    apple: 'https://apps.apple.com/us/app/phiz-chat/id6447375837',
    google: 'https://play.google.com/store/apps/details?id=live.phiz.app2',
    samsung: 'samsungapps://ProductDetail/live.phiz.app2',
    xiaomi: 'mimarket://details?id=live.phiz.app2',
    huawei: 'appmarket://details?id=live.phiz.app2'
    // yyb: 'https://sj.qq.com/appdetail/live.phiz.app2'
  },
  fallback: 'https://phiz.chat',
  debug: message => alert(message)
})

const callApp = () => {
  try {
    appCaller({ params: 'userId=105713' })
    // appCaller({ params: { userId: '105713', name: '张三' } })
    // appCaller({ path: 'tapPay', params: 's=nfc&t=01&sn=ML6gtPywsBSICZBY' })
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <button class="btn" @click="callApp">Call App</button>
</template>

<style scoped>
.btn {
  display: block;
  width: 80%;
  height: 60px;
  font-size: 24px;
  margin: 40vh auto;
}
</style>
