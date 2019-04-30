import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import config from '../../config/site'
import { Header, Layout } from '../components'
import Content from '../components/Content'

const ContentWrapper = styled.div`
  margin-top: 5rem;
  text-align: center;
`

const Avatar = styled.div`
  height: 8rem;
  width: 8rem;
  margin: auto;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  img {
    border-radius: 50%;
    height: auto;
    width: 100%;
  }
`

const About = () => (
  <Layout>
    <Header avatar={config.avatar} name={config.name} location={config.location} />
    <Content>
      <ContentWrapper>
        <Avatar>
          <img src="me.jpg" alt="" />
        </Avatar>
        <p>Hello 👋</p>
        <p>My name is Aldis Ameriks, I'm from Latvia 🇱🇻</p>
        <p>I'm a software developer who also loves photography 📷</p>
        <p>
          Have feedback, or want to ask something? <a href="mailto:aldis.ameriks@gmail.com">Drop me an email ✉️</a>
        </p>
      </ContentWrapper>
    </Content>
  </Layout>
)

export default About
