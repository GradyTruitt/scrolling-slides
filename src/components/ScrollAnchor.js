import React, { Component, Fragment } from 'react'
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor'

export default class ScrollAnchor extends Component {

  componentDidMount = () => {
    const { anchor } = this.props
    if(anchor) {
      configureAnchors({ offset: -70, scrollDuration: 1000 })
    }
  }

  render () {
    const { anchor, children } = this.props
    return (
      <Fragment>
        {
          typeof anchor === 'string'
          ?
          <ScrollableAnchor id={anchor}>
            {children}
          </ScrollableAnchor>
          :
          <Fragment>
            {children}
          </Fragment>
        }
      </Fragment>
    )
  }
}
