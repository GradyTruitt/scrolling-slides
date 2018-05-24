import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import gsap from './animations'

import Logo from 'icons/main-logo-2.svg'
import GitHub from 'icons/github-icon.svg'

import MenuIcon from './HamburgerIcon'

export default class MobileMenu extends Component {
  state = {
    open: 'false'
  }

  handleClick = () => {
    const { open } = this.state
    open === 'true'
      ? this.setState({ open: 'false' })
      : this.setState({ open: 'true' })
    gsap.toggleMobileNav(open)
  }

  closeMenu = () => {
    gsap.resetNav()
    this.setState({ open: 'false' })
  }

  render() {
    const { open } = this.state
    const { routes } = this.props

    return (
      <Container>
        <Link to="/">
          <MainLogo />
        </Link>
        <MenuIcon open={open} click={this.handleClick} />
        <NavItems id="nav-tray">
          {routes.map((item, i) => (
            <NavLink key={i} to={item.path} onClick={this.closeMenu}>
              {item.text}
            </NavLink>
          ))}
          <ExternalLink href="https://github.com/merchantlabs/gatsby-starter-mlabs">
            <GitHub />
          </ExternalLink>)
        </NavItems>
        <MainLogo2 id="menu-logo" />
      </Container>
    )
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.primaryColor};
  border-bottom: 3px solid ${props => props.theme.accentColor1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`
const MainLogo = styled(Logo)`
  width: 150px;
  height: 22px;
  fill: ${props => props.theme.accentColor1};
`
const MainLogo2 = styled(Logo)`
  position: fixed;
  right: 75px;
  bottom: -60px;
  opacity: 0;
  width: 150px;
  height: 22px;
  fill: ${props => props.theme.accentColor1};
`
const NavItems = styled.div`
  padding: 100px 0 50px;
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  background-color: ${props => props.theme.primaryColor};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-end;
`
const NavLink = styled(Link)`
  margin: 50px 40px;
  font-size: 40px;
  font-weight: 600;
  color: white;
  opacity: 0;
`
const ExternalLink = NavLink.withComponent('a').extend`
  margin: 30px 40px 0 0;
  padding: 20px 0 0;

  & svg {
    height: 44px;
    width: 44px;

    path {
      transition-duration: 0.5s;
      fill: ${props => props.theme.accentColor1};
    }
  }
`
