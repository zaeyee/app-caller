export type Params = string | Record<string, string> | string[][] | URLSearchParams

// export type BrowserType =
//   | 'Apple'
//   | 'IOS'
//   | 'MacOS'
//   | 'Android'
//   | 'Firefox'
//   | 'Samsung'
//   | 'XiaoMi'
//   | 'HuaWei'
//   | 'WeChat'
//   | 'QQ'
//   | 'QQBrowser'
//   | 'QZone'
//   | 'Baidu'
//   | 'WeiBo'

export type StoreType = 'apple' | 'google' | 'samsung' | 'xiaomi' | 'huawei' | 'yyb'
export type StoreLinks = Partial<Record<StoreType, string>>

export interface Intent {
  package: string
  scheme: string
  action?: string
  category?: string
  component?: string
}

export interface AppCallerConfig {
  scheme: string
  universalHost?: string
  intent?: Intent
  storeLinks?: StoreLinks
  supportWeiBo?: boolean
  fallback: string
  timeout?: number
  debug?: boolean | ((message: string) => void)
}

export interface AppCallerOptions {
  path?: string
  params?: Params
  callback?: () => void
}
