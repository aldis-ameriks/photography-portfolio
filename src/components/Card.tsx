import { Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { rgba } from 'polished'
import React from 'react'
import { animated, config, useSpring } from 'react-spring'
import styled from 'styled-components'

const CardItem = styled(Link)`
  min-height: 500px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.text};
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 15px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    min-height: 300px;
  }
`

const Cover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  > div {
    overflow: hidden;
    position: static;
  }
`

const Content = styled.div`
  transition: opacity 0.3s ease;
  opacity: 0;
  background-color: ${(props) => rgba(props.theme.colors.bg, 0.8)};

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  ${CardItem}:hover & {
    opacity: 1;
  }
`

const Name = styled.h1`
  margin-bottom: 1rem;
  margin-top: 0;
`

type Props = {
  path: string
  cover: IGatsbyImageData
  title: string
  delay: number
  date?: string
  areas?: readonly string[] | null
}

const Card: React.FC<Props> = ({ path, cover, date, areas, title, delay }) => {
  const springProps = useSpring({
    config: config.slow,
    delay: 100 * delay,
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  })

  return (
    <animated.div style={springProps}>
      <CardItem to={path}>
        <Cover>
          <GatsbyImage image={cover} alt={`Cover image for ${title}`} />
        </Cover>
        <Content>
          <Name>{title}</Name>
          {date && <div>{date}</div>}
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
        </Content>
      </CardItem>
    </animated.div>
  )
}

export default Card
