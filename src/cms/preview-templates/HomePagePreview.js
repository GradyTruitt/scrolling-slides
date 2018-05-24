import React from 'react'
import { HomePageTemplate } from 'templates/index'

import StyleManager from './../PreviewStyleManager'

const ContentPagePreview = ({ entry, widgetFor }) => (
  <StyleManager>
    <HomePageTemplate
      header={{
        title: entry.getIn(['data', 'header', 'title']),
        subTitle: entry.getIn(['data', 'header', 'subTitle']),
        image: entry.getIn(['data', 'header', 'image'])
      }}
    />
  </StyleManager>
)

export default ContentPagePreview
