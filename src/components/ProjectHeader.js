import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import PropTypes from 'prop-types'
import React from 'react'
import { animated, config, useSpring } from 'react-spring'
import styled from 'styled-components'
import BackLink from './BackLink'

const Wrapper = styled.div`
  display: flex;
  position: relative;
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidths.general};
  padding: 0 1.0875rem 5rem 1.0875rem;
  color: ${(props) => props.theme.colors.secondary};
`

const Details = styled.div`
  width: 100%;
  margin-top: 3rem;
  text-align: center;

  h1 {
    color: ${(props) => props.theme.colors.color};
  }
`

const Text = styled.div`
  max-width: 750px;
  margin: 2rem auto 2rem auto;
`

const ProjectHeader = ({ title, date, areas, text }) => {
  const titleProps = useSpring({
    config: config.slow,
    delay: 200,
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const contentProps = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Wrapper>
      <Content>
        <BackLink />
        <Details>
          <animated.h1 style={titleProps}>{title}</animated.h1>
          <animated.div style={contentProps}>
            {date && <p>{date}</p>}
            {areas && (
              <div>
                {areas.map((area, index) => (
                  <React.Fragment key={area}>
                    {index > 0 && ', '}
                    {area}
                  </React.Fragment>
                ))}
              </div>
            )}
            {text && (
              <Text>
                <MDXRenderer>{text}</MDXRenderer>
              </Text>
            )}
          </animated.div>
        </Details>
      </Content>
    </Wrapper>
  )
}

export default ProjectHeader

ProjectHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string,
  areas: PropTypes.array,
}

ProjectHeader.defaultProps = {
  areas: [],
  date: null,
}
