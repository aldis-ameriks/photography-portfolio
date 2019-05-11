import PropTypes from 'prop-types'
import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'

import { useTextAnimation } from '../styles/animation'

const SocialLinkWrapper = styled(animated.div)`
  margin-top: 1rem;
  & > * {
    margin: 0.5rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.s}) {
    margin-top: 5rem;
  }
`

const SocialLink = styled.a`
  display: inline-block;
  padding: 0.35rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.2);
  transition: all 400ms ease;
  font-size: 0.8rem;

  :hover,
  :focus {
    box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.4);
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
      <SocialLink href="https://www.linkedin.com/in/aldis-ameriks" target="_blank" rel="noreferrer">
        <img src="/logos/linkedin.png" alt="" width="24" height="24" />
        <span>Linkedin profile</span>
      </SocialLink>
      <SocialLink href="https://github.com/aldis-ameriks" target="_blank" rel="noreferrer">
        <img src="/logos/github.png" alt="" width="24" height="24" />
        <span>Github profile</span>
      </SocialLink>
      <SocialLink href="https://500px.com/aldis-ameriks" target="_blank" rel="noreferrer">
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
