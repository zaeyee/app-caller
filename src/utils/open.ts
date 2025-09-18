let a: HTMLAnchorElement
let iframe: HTMLIFrameElement

export const openByLocation = (url: string) => {
  if (window.top) {
    window.top.location.href = url
  } else {
    window.location.href = url
  }
}

export const openByTagA = (url: string) => {
  if (!a) {
    a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
  }
  a.href = url
  a.click()
}

export const openByIFrame = (url: string) => {
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
  }
  iframe.src = url
}

export const checkOpen = (failure: () => void, timeout = 2000) => {
  const timer = setTimeout(() => {
    if (!document.hidden) {
      failure()
    }
  }, timeout)

  document.addEventListener('visibilitychange', () => {
    clearTimeout(timer)
  })
}
