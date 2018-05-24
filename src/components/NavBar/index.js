import React from 'react'
import Media from 'react-media'

import DesktopNav from './Desktop'
import MobileNav from './Mobile'

const routes = [
  {
    text: 'Home',
    path: '/'
  }
  }
]

export default () => (
  <Media query="(max-width: 950px)">
    {matches =>
      matches ? <MobileNav routes={routes} /> : <DesktopNav routes={routes} />
    }
  </Media>
)
