/* eslint no-unused-expressions: off */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from '../../config/theme'
import reset from '../styles/reset'
import Footer from './Footer'
import Navbar from './Navbar'
import SEO from './SEO'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  html {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  
  .gatsby-resp-image-wrapper {
    margin: 2.75rem 0;
  }
`

const AbsoluteWrapper = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const Layout = ({ children, customSEO }) => (
  <ThemeProvider theme={theme}>
    <>
      {!customSEO && <SEO />}
      <GlobalStyle />
      <AbsoluteWrapper>
        <Navbar />
        <noscript>To browse this site, please enable JavaScript.</noscript>
        {children}
        <Footer />
      </AbsoluteWrapper>
    </>
  </ThemeProvider>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}
