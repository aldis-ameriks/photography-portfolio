import React from 'react'
import styled from 'styled-components'

const Content = styled.footer`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  font-size: 0.85rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
`

const Footer = (): JSX.Element => (
  <Content>
    <a href="https://github.com/aldis-ameriks/photography-portfolio" rel="noreferrer">
      code
    </a>
    , design and pictures by Aldis Ameriks &copy; {new Date().getFullYear()}
  </Content>
)

export default Footer
