import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Logo from 'icons/main-logo-2.svg'
import GitHub from 'icons/github-icon.svg'

export default ({ routes }) => (
  <Container>
    <Link to="/">
      <MainLogo />
    </Link>
    <NavItems>
      {routes.map((item, i) => (
        <NavLink key={i} to={item.path}>
          {item.text}
        </NavLink>
      ))}
      <ExternalLink href="https://github.com/merchantlabs/gatsby-starter-mlabs">
        <GitHub />
      </ExternalLink>
    </NavItems>
  </Container>
)

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  padding: 0 40px;
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
const NavItems = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const NavLink = styled(Link)`
  margin: 0;
  padding: 25px 15px;
  font-size: 18px;
  font-weight: 400;
  color: white;
  transition-duration: 0.5s;

  &:hover {
    color: ${props => props.theme.accentColor1};
    background-color: rgba(0, 0, 0, 0.25);
  }
`
const ExternalLink = NavLink.withComponent('a').extend`
  & svg {
    height: 24px;
    width: 24px;

    path {
      transition-duration: 0.5s;
      fill: white;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);

    & path {
      fill: ${props => props.theme.accentColor1};
    }
  }
`
