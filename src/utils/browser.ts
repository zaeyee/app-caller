export const isApple = () => isIOS() || isMacOS()
export const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent)
export const isMacOS = () => /Mac OS X/i.test(navigator.userAgent)

export const isAndroid = () => /Android/i.test(navigator.userAgent)

export const isFirefox = () => /Firefox/i.test(navigator.userAgent)

export const isSamsung = () => /Samsung/i.test(navigator.userAgent)
export const isXiaoMi = () => /XiaoMi|mi/i.test(navigator.userAgent)
export const isHuaWei = () => /Huawei/i.test(navigator.userAgent)

export const isWeChat = () => /MicroMessenger/i.test(navigator.userAgent)
export const isQQ = () => /QQ\/([\d.]+)/i.test(navigator.userAgent)
export const isQQBrowser = () => /(QQBrowser)\/([\d.]+)/i.test(navigator.userAgent)
export const isQZone = () => /qzone\/.*_qz_([\d.]+)/i.test(navigator.userAgent)

export const isBaidu = () => /(baiduboxapp)\/([\d.]+)/i.test(navigator.userAgent)

export const isWeiBo = () => /(Weibo).*weibo__([\d.]+)/i.test(navigator.userAgent)

export const isOriginalChrome = () =>
  isAndroid() &&
  /Chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(navigator.userAgent) &&
  !navigator.userAgent.includes('Version')

export const getIOSVersion = () => {
  const version = navigator.userAgent.match(/iPhone\sOS\s(\d+)/)
  return version?.length ? +version[1] : NaN
}

export const getWeChatVersion = () => {
  const version = navigator.userAgent.match(/MicroMessenger\/(\d+\.\d+\.\d+)/i)
  return version?.length ? version[1] : ''
}

export const compareSemver = (versionA: string, versionB: string) => {
  const v1parts = versionA.split('.')
  const v2parts = versionB.split('.')

  for (let i = 0; i < 3; i++) {
    if (v1parts[i] === v2parts[i]) {
      continue
    }
    return v1parts[i] > v2parts[i] ? 1 : -1
  }

  return 0
}
