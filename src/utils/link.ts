import type { Intent, Params, StoreLinks } from '../types'
import { isApple, isSamsung, isXiaoMi, isHuaWei } from './browser'

export const genQueryStr = (params?: Params, prefix = '?') =>
  params ? prefix + new URLSearchParams(params).toString() : ''

export const genUniversalLink = (host: string, path = '/', params?: Params) =>
  `https://${host}${path}${genQueryStr(params)}`

export const genSchemeLink = (scheme: string, path = '', params?: Params) =>
  `${scheme}://${path}${genQueryStr(params, '')}`

export const genIntentLink = (intent: Intent, fallback: string, path = '', params?: Params) => {
  const keys = Object.keys(intent) as Array<keyof Intent>
  const intentParam = keys.map(key => `${key}=${intent[key]};`).join('')
  const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(fallback)};end;`
  return `intent://${path}${genQueryStr(params)}${intentTail}`
}

export const getStoreLink = (storeLinks?: StoreLinks) => {
  if (!storeLinks) return

  let storeLink: string | undefined

  if (isApple()) {
    storeLink = storeLinks.apple
  } else if (isSamsung()) {
    storeLink = storeLinks.samsung
  } else if (isXiaoMi()) {
    storeLink = storeLinks.xiaomi
  } else if (isHuaWei()) {
    storeLink = storeLinks.huawei
  }

  return storeLink || storeLinks.google || storeLinks.yyb
}
