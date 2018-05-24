import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { TimelineMax, TweenMax } from 'gsap'
import ScrollMagic from 'components/ScrollMagic'

import GatsbyImageLoader from 'components/GatsbyImageLoader'

export default class SlidesContainer extends Component {

  componentDidMount = () => {

    TweenMax.to(this['dot0'], 0, { width: 16, height: 16, borderRadius: 8, background: 'transparent'})

    let wipeAnimation = new TimelineMax()
    .to(this.slidesRef, 0.5, {z: -150})
    .to(this.slidesRef, 1, {x: "-25%"})
    .to(this['dot0'], 0.2, { width: 12, height: 12, borderRadius: 6, background: 'white'})
    .to(this['dot1'], 0.2, { width: 16, height: 16, borderRadius: 8, background: 'transparent'})
    .to(this.slidesRef, 0.5, {z: 0})
    .to(this.slidesRef, 0.5, {z: -150, delay: 1})
    .to(this.slidesRef, 1, {x: "-50%"})
    .to(this['dot1'], 0.2, { width: 12, height: 12, borderRadius: 6, background: 'white'})
    .to(this['dot2'], 0.2, { width: 16, height: 16, borderRadius: 8, background: 'transparent'})
    .to(this.slidesRef, 0.5, {z: 0})
    .to(this.slidesRef, 0.5, {z: -150, delay: 1})
    .to(this.slidesRef, 1, {x: "-75%"})
    .to(this['dot2'], 0.2, { width: 12, height: 12, borderRadius: 6, background: 'white'})
    .to(this['dot3'], 0.2, { width: 16, height: 16, borderRadius: 8, background: 'transparent'})
    .to(this.slidesRef, 0.5, {z: 0})

    let controller = new ScrollMagic.Controller()
    new ScrollMagic.Scene({
      triggerElement: this.containerRef,
      triggerHook: "onLeave",
      duration: "500%"
    })
    .setPin(this.containerRef)
    .setTween(wipeAnimation)
    .addTo(controller)
  }

  handleClick = (slide) => {
    window.scrollTo(0, (window.innerWidth * slide))
  }

  render() {
    const { slideImages } = this.props
    return (
      <Fragment>
        <DotsContainer>
          {slideImages.map((slide, i) => (
            <Dot
              key={i}
              onClick={() => {this.handleClick(i)}}
              value={i+1}
              innerRef={x => {this['dot' + i] = x}}
            />
          ))}
        </DotsContainer>
        <Container innerRef={x => {this.containerRef = x}}>
          <Slides innerRef={x => {this.slidesRef = x}}>
            {slideImages.map((item,i) => (
              <GatsbyImageLoader key={i} sizes={item.slide.childImageSharp.sizes}>
                {({ src }) => (
                  <Slide image={src} />
                )}
              </GatsbyImageLoader>
            ))}
          </Slides>
        </Container>
      </Fragment>
    )
  }
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  perspective: 1000;
  background: black;
`
const Slides = styled.div`
  width: 400%;
  height: calc(100% - 70px);
  display: flex;
`
const Slide = styled.div`
  width: 25%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
`
const DotsContainer = styled.div`
  width: 40px;
  height: 160px;
  position: fixed;
  top: calc(50% - 80px);
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background: white;
`
