import { useSpring } from 'react-spring'

export const useTextAnimation = (delay = 0) =>
  useSpring({
    delay: 100 * delay,
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
