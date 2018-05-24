import React, { Component } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import theme, { globalStyles } from 'theme'

/*
  This component is basically a hack to copy all the css classes
  used with styled-components to also be inside the Netlify CMS preview
  iFrame.
*/

export default class PreviewStyleManager extends Component {
  state = { target: '' }

  componentDidMount() {
    const iframe = document.querySelector('.nc-previewPane-frame')
    const head = iframe.contentDocument.getElementsByTagName('head')[0]
    head.innerHTML += `<style>${globalStyles}</style>`
    this.setState({ target: head })
  }

  render() {
    return this.state.target ? (
      <StyleSheetManager target={this.state.target}>
        <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
      </StyleSheetManager>
    ) : (
      this.props.children
    )
  }
}
