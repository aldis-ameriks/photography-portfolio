import React from 'react'
import { useTransition, animated } from 'react-spring'

const Transition = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transitions: any = useTransition([props], (item) => item.location.pathname, {
    // from: { opacity: 0, transform: 'translateY(60px)' },
    // enter: { opacity: 1, transform: 'translateY(0px)' },
    // leave: { opacity: 0, transform: 'translateY(30px)' },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  return transitions.map(({ item, props: styles, key }) => (
    <animated.div key={key} style={{ ...styles, position: 'relative' }}>
      {item.children}
    </animated.div>
  ))
}

export default Transition
