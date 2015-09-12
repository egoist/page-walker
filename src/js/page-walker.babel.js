(W, D) => {

  let $ = document.querySelector.bind(document)
  const className = 'page-walker'
  const selector = `.${className}`

  let definition = () => {
    class PageWalker {
      constructor () {
        this.bgColor = '#0A74DA'
        this.position = 'top'
      }
      style () {
        return `
          position: fixed;
          ${this.position}: 0;
          background-color: ${this.bgColor};
          left: 0;
          width: 0;
          height: 3px;
          z-index: 9999;
          transition: width .3s ease-in-out;
        `
      }
      watch () {
        const exitsingBar = $(selector)
        if (exitsingBar) {
          D.body.removeChild(exitsingBar)
        }
        this.getBar()
        this.watchBar()
      }
      watchBar () {
        W.addEventListener('scroll', () => {
          updateProgress()
        })
      }
      getBar () {
        let bar = $(selector)
        if (!bar) {
          bar = this.initBar()
        }
        return bar
      }
      initBar () {
        let bar = D.createElement('div')
        bar.className = className
        bar.setAttribute('style', this.style())
        D.body.appendChild(bar)
        return bar
      }
      top () {
        this.position = 'top'
        return this
      }
      bottom () {
        this.position = 'bottom'
        return this
      }
    }

    return new PageWalker()
  }

  if (typeof module === 'object') {
    module.exports = definition()
  } else if (typeof window === 'object') {
    window.PageWalker = definition()
  }

  function getDocHeight () {
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    )
  }

  function updateProgress () {
    const wh = W.innerHeight
    const h = height(D.body)
    const sHeight = h - wh;
    const width = Math.max(0, Math.min(1, W.scrollY / sHeight)) * 100 + '%'
    $(selector).style.width = width
  }

  function height (el) {
    return parseInt(getComputedStyle(el).height)
  }

}(window, document)
