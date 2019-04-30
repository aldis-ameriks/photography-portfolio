import PropTypes from 'prop-types'
import React from 'react'
import { animated, useSpring } from 'react-spring'
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

const texts = [
  'Hello 👋',
  "My name is Aldis Ameriks, I'm from Latvia 🇱🇻",
  "I'm a software developer who also loves photography 📷",
  'Have feedback, or want to ask something? <a href="mailto:aldis.ameriks@gmail.com">Drop me an email ✉️</a>',
]

const AnimatedText = ({ text, delay }) => {
  const springProps = useSpring({
    config: config.slow,
    delay: 100 * delay,
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <animated.div style={springProps}>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </animated.div>
  )
}

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}

const About = () => (
  <Layout>
    <Header avatar={config.avatar} name={config.name} location={config.location} />
    <Content>
      <ContentWrapper>
        <Avatar>
          <img src="/me.jpg" alt="" />
        </Avatar>
        {texts.map((text, i) => (
          <AnimatedText delay={i} text={text} />
        ))}
      </ContentWrapper>
    </Content>
  </Layout>
)

export default About
