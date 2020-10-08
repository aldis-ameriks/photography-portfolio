import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  position: relative;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidths.general};
  padding: 3rem 1.0875rem 3rem 1.0875rem;
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  height: 200px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    height: 500px;
  }
`

const Name = styled.h1`
  margin: 1rem 0 0.25rem 0;
  color: ${(props) => props.theme.colors.color};
`

const Header = ({ text }) => (
  <Wrapper>
    {text && (
      <Content>
        <Name>{text}</Name>
      </Content>
    )}
  </Wrapper>
)

export default Header

Header.propTypes = {
  text: PropTypes.string,
}

Header.defaultProps = {
  text: null,
}
