import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class ImageLoader extends Component {
  state = {
    src: null
  }

  _onImageLoad = () => {
    let src = this.img.currentSrc || this.img.src
    this.setState({ src })
  }

  componentDidMount() {
    this.img.addEventListener('load', this._onImageLoad)
  }

  componentWillUnmount() {
    this.img.removeEventListener('load', this._onImageLoad)
  }

  render() {
    const { srcSet, image, src, sizes, children } = this.props
    let imgSrc = src
    let imgSrcSet = srcSet
    if (image) {
      imgSrc = image
      if (image.childImageSharp) {
        if (image.childImageSharp.sizes) {
          imgSrc = image.childImageSharp.sizes.src
          imgSrcSet = image.childImageSharp.sizes.srcSet
        } else if (image.childImageSharp.resolutions) {
          imgSrc = image.childImageSharp.resolutions.src
          imgSrcSet = image.childImageSharp.resolutions.srcSet
        }
      }
    }
    return (
      <Fragment>
        <img
          srcSet={imgSrcSet}
          src={imgSrc}
          sizes={sizes}
          alt=" "
          ref={x => (this.img = x)}
          style={{ display: 'none' }}
        />
        {children(this.state.src)}
      </Fragment>
    )
  }
}

ImageLoader.propTypes = {
  children: PropTypes.func.isRequired,
  srcSet: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default ImageLoader
