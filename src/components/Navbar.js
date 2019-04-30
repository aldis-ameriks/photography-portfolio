import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const NavbarStyled = styled.div`
  width: 100%;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin-bottom: 2rem;
`

const Entry = styled(Link)`
  margin-left: 1rem;
  cursor: pointer;
`

const Entries = styled.div`
  text-align: right;
  width: 100%;
  display: inline-block;
`

const Image = styled.img`
  top: 14px;
  cursor: pointer;
  position: absolute;
`

const Navbar = () => (
  <NavbarStyled>
    <Link to="/">
      <Image src="/logos/AA_black.png" width="50" data-info="home" alt="Go to home" aria-label="Go to home" />
    </Link>
    <Entries>
      <Entry to="/">Home</Entry>
      <Entry to="/about">About me</Entry>
    </Entries>
  </NavbarStyled>
)

export default Navbar
