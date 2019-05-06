import React from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import styled from 'styled-components'

import { useTextAnimation } from '../styles/animation'

const SocialLinkWrapper = styled(animated.div)`
  margin-top: 5rem;
  & > * {
    margin: 0.5rem;
  }
`

const SocialLink = styled.a`
  border: 1px solid #b9b9b9;
  display: inline-block;
  padding: 0.35rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.2);
  transition: all 200ms;
  font-size: 0.8rem;

  :hover,
  :focus {
    box-shadow: 1px 3px 4px 2px rgba(0, 0, 0, 0.2);
    color: black;
  }

  span {
    vertical-align: middle;
    margin-left: 0.5rem;
  }
`

const SocialLinks = ({ delay }) => {
  const animationProps = useTextAnimation(delay)

  return (
    <SocialLinkWrapper style={animationProps}>
      <SocialLink href="https://www.linkedin.com/in/aldis-ameriks" target="_blank">
        <img src="/logos/linkedin.png" alt="" width="24" height="24" />
        <span>Linkedin profile</span>
      </SocialLink>
      <SocialLink href="https://github.com/aldis-ameriks" target="_blank">
        <img src="/logos/github.png" alt="" width="24" height="24" />
        <span>Github profile</span>
      </SocialLink>
      <SocialLink href="https://500px.com/aldis-ameriks" target="_blank">
        <img src="/logos/500px.png" alt="" width="19.04" height="24" />
        <span>500px profile</span>
      </SocialLink>
    </SocialLinkWrapper>
  )
}

SocialLinks.propTypes = {
  delay: PropTypes.number,
}

SocialLinks.defaultProps = {
  delay: 0,
}

export default SocialLinks
