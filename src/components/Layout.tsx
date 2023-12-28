/* eslint no-unused-expressions: off */
import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from '../config/theme'
import reset from '../styles/reset'
import Footer from './Footer'
import Navbar from './Navbar'
import SEO from './SEO'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  html {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
`

const Content = styled.main`
  background-color: ${(props) => props.theme.colors.bg};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const Layout = ({ children, customSEO = false }: { children: React.ReactNode; customSEO?: boolean }): JSX.Element => (
  <ThemeProvider theme={theme}>
    <>
      {!customSEO && <SEO />}
      <GlobalStyle />
      <Content>
        <Navbar />
        <noscript>To browse this site, please enable JavaScript.</noscript>
        {children}
        <Footer />
      </Content>
    </>
  </ThemeProvider>
)

export default Layout
