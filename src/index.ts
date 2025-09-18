import type { AppCallerOptions, AppCallerConfig } from './types'
import {
  getIOSVersion,
  getWeChatVersion,
  compareSemver,
  isOriginalChrome,
  isWeiBo,
  isBaidu,
  isQZone,
  isQQ,
  isQQBrowser,
  isWeChat,
  isFirefox,
  isIOS
} from './utils/browser'
import { genIntentLink, genSchemeLink, genUniversalLink, getStoreLink } from './utils/link'
import { checkOpen, openByIFrame, openByLocation, openByTagA } from './utils/open'

export const createAppCaller = (config: AppCallerConfig) => {
  const { scheme, universalHost, intent, storeLinks, supportWeiBo, fallback, timeout, debug } = config

  const log = (message: string) => {
    if (!debug) return
    if (typeof debug === 'function') {
      debug(message)
    } else {
      console.log(message)
    }
  }

  return (options?: AppCallerOptions) => {
    const { path, params, callback } = options || {}

    const schemeLink = genSchemeLink(scheme, path, params)
    const storeLink = getStoreLink(storeLinks)

    log(`[userAgent]:\n${navigator.userAgent} \n\n[schemeLink]:\n${schemeLink} \n\n[storeLink]:\n${storeLink}`)

    if (isIOS()) {
      if ((isWeChat() && compareSemver(getWeChatVersion(), '7.0.5') === -1) || (isWeiBo() && !supportWeiBo)) {
        // 1.iOS 微信自 7.0.5 版本放开了 Universal Link 的限制
        // 2.iOS 微博禁止了 Universal Link

        // 如果是微信且版本 < 7.0.5 或 是微博但配置了不支持，则直接打开 Apple Store
        openByLocation(storeLinks?.apple || fallback)
      } else if (getIOSVersion() < 9) {
        // 1.iOS 9 才开始引入 Universal Link

        // 如果 iOS 版本 < 9，则通过 iframe 打开 Scheme Link
        openByIFrame(schemeLink)
      } else if (!universalHost || isQQ() || isQQBrowser() || isQZone()) {
        // 1.iOS QQ 2018/12/23禁止了 Universal Link
        // 2.iOS QQBrowser 2019/05/01禁止了 Universal Link
        // 3.iOS QQ 通过 iframe / window.location 都无法打开 Scheme Link，只能通过 a 标签打开

        // 如果没有配置 Universal Link 域名 或 是 QQ/QQBrowser/QZone，则通过 a 标签打开 Scheme Link
        openByTagA(schemeLink)
      } else {
        // 1.iOS 通过 iframe 无法打开 Universal Link
        // 2.iOS QQ 通过 iframe / a 标签 / window.location 都无法打开 Universal Link，只能通过 window.top.location 打开

        // 否则打开 Universal Link
        openByLocation(genUniversalLink(universalHost, path, params))
      }
    } else {
      if (isWeChat() && storeLinks?.yyb) {
        // 1.微信禁止了 Scheme Link

        // 如果是微信且配置了应用宝链接，则打开
        openByLocation(`${storeLinks.yyb}&android_schema=${encodeURIComponent(schemeLink)}`)
      } else if (isOriginalChrome()) {
        if (intent) {
          // 1.动态生成的 a 标签，使用 dispatch 来模拟触发点击事件，很多种 event 传递过去都无效
          //   使用 click() 模拟触发，部分场景下存在：第一次点击后，回到原来页面再次点击，点击位置和页面所识别位置有不小的偏移
          //   所以从 a 标签换成了 window.location
          // 2.原生 Chrome 25+ 开始，无法打开 Scheme Link

          // 如果是原生 Chrome 系浏览器且配置了 intent，则打开 Intent Link
          openByLocation(genIntentLink(intent, fallback, path, params))
        } else {
          // 1.Android Chrome 25+ 通过 iframe 无法打开 Scheme Link

          // 否则打开 Scheme Link
          openByLocation(schemeLink)
        }
      } else if (isWeChat() || isQZone() || isBaidu() || (isWeiBo() && !supportWeiBo)) {
        // 1.微信/QZone/百度/微博禁止了 Scheme Link

        // 如果是微信/QZone/百度/微博，则直接打开 fallback
        openByLocation(fallback)
      } else if (isFirefox()) {
        // 1.火狐通过 iframe 无法打开 Scheme Link

        // 如果是火狐则打开 Scheme Link
        openByLocation(schemeLink)
      } else {
        // 否则通过 iframe 打开 Scheme Link
        openByIFrame(schemeLink)
      }
    }

    // 如果失败，则打开 应用商店 或 fallback
    checkOpen(() => {
      typeof callback === 'function' ? callback() : openByLocation(storeLink || fallback)
    }, timeout)
  }
}
