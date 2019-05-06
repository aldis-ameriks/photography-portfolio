import PropTypes from 'prop-types'
import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'
import { Header, Layout } from '../components'
import BackLink from '../components/BackLink'
import Content from '../components/Content'
import SocialLinks from '../components/SocialLinks'
import { useTextAnimation } from '../styles/animation'

const ContentWrapper = styled(animated.div)`
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
  const animationProps = useTextAnimation(delay)
  return (
    <animated.div style={animationProps}>
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
    <Header />
    <Content>
      <BackLink />
      <ContentWrapper>
        <Avatar>
          <img src="/me.jpg" alt="" />
        </Avatar>
        {texts.map((text, i) => (
          <AnimatedText key={text} delay={i} text={text} />
        ))}
        <SocialLinks delay={texts.length + 2} />
      </ContentWrapper>
    </Content>
  </Layout>
)

export default About
