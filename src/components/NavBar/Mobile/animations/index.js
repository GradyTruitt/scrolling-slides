import { TweenMax, TimelineMax } from 'gsap'

const tl = new TimelineMax()

export default {
  /*********** animate menu tray and items ***********/

  toggleMobileNav(open) {
    let tray = document.getElementById('nav-tray')
    let logo = document.getElementById('menu-logo')
    let arr = Array.from(tray.children)

    if (open === 'false') {
      TweenMax.to(tray, 0.3, {
        width: 300,
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.2)'
      })
      tl.add(TweenMax.to(logo, 0.3, { opacity: 1, bottom: 30 }))
      tl.add(
        TweenMax.staggerTo(arr, 0.2, { opacity: 1, margin: '10px 40px' }, 0.1)
      )
    } else {
      tl.add(
        TweenMax.staggerTo(
          arr.reverse(),
          0.2,
          { opacity: 0, margin: '50px 40px' },
          0.1
        )
      )
      tl.add(TweenMax.to(logo, 0.3, { opacity: 0, bottom: -70 }))
      tl.add(TweenMax.to(tray, 0.3, { width: 0 }))
    }
  },

  /*********** close menu tray on redirect ***********/

  resetNav() {
    let tray = document.getElementById('nav-tray')
    let logo = document.getElementById('menu-logo')
    let arr = Array.from(tray.children)

    tl.add(TweenMax.staggerTo(arr, 0, { opacity: 0, margin: '50px 40px' }, 0))
    tl.add(TweenMax.to(logo, 0, { opacity: 0, bottom: -70 }))
    tl.add(TweenMax.to(tray, 0.2, { width: 0 }))
  }
}
