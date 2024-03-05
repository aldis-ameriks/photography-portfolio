import { Link } from 'gatsby'
import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'

const Back = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  img[data-info='back'] {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1rem 0 0;
  }
`

const Name = styled(animated.h4)`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`

const BackLink = (): JSX.Element => (
  <Back to="/">
    <img src="/icons/left-chevron.svg" data-info="back" alt="Back to home" aria-label="Back to home" />
    <Name>Home</Name>
  </Back>
)

export default BackLink
