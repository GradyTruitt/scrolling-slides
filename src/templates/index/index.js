import React, { Fragment } from 'react'

import Slides from './Slides'

export const HomePageTemplate = ({ slides, slideImages }) => (
  <Fragment>
    <Slides
      title={slides.title}
      subTitle={slides.subTitle}
      image={slides.image}
      slideImages={slideImages}
    />
  </Fragment>
)

export default ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return <HomePageTemplate slides={frontmatter.header} slideImages={frontmatter.slides} />
}

export const query = graphql`
  query HomePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        header {
          title
          subTitle
          image {
            childImageSharp {
              sizes {
                src
                srcSet
              }
            }
          }
        }
        slides {
          slide {
            childImageSharp {
              sizes(maxWidth: 1000) {
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
`
