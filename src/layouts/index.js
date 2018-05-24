import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import theme from 'theme'
import SEO from 'components/SEO'

const TemplateWrapper = ({ children, data }) => {
  const { logo, site } = data
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>{site.meta.title}</title>
          <link rel="icon" href={logo.sizes.src} />
        </Helmet>
        <SEO />
        {children()}
      </Fragment>
    </ThemeProvider>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper

export const query = graphql`
  query LayoutTemplateQuery {
    site {
      meta: siteMetadata {
        title
      }
    }
    logo: imageSharp(id: { regex: "/favicon/" }) {
      id
      sizes {
        src
      }
    }
  }
`
