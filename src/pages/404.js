import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Content from '../components/Content'
import Header from '../components/Header'
import Layout from '../components/Layout'

const ContentWrapper = styled.div`
  margin-top: 5rem;
  text-align: center;
`

const NotFound404 = () => (
  <Layout>
    <Header />
    <Content>
      <ContentWrapper>
        <p>Page not found.</p>
        <p>
          <Link to="/">Click here to go home.</Link>
        </p>
      </ContentWrapper>
    </Content>
  </Layout>
)

export default NotFound404
