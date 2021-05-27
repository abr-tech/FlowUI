import SystemTypes from '@stage-ui/system/types'
import Types from './types'

const createClasses: CreateClasses<Types.Styles, Types.Props> = (props, theme) => {
  return {
    container: [
      {
        position: 'relative',
        minWidth: '4rem',
        height: 'calc(1rem + 4px)',
        cursor: 'pointer',
      },
    ],
    rail: [
      {
        position: 'absolute',
        top: 'calc(50% - 2px)',
        height: '4px',
        background: theme.color.lightest.hex(),
        width: '100%',
        zIndex: 1,
        borderRadius: '2px',
      },
    ],
    track: [
      {
        position: 'absolute',
        top: 'calc(50% - 2px)',
        height: '4px',
        background: theme.color.primary.hex(),
        zIndex: 2,
        borderRadius: '2px',
      },
    ],
    thumb: [
      {
        position: 'absolute',
        width: '1rem',
        height: '1rem',
        borderRadius: '1rem',
        marginLeft: 'calc(-.5rem - 2px)',
        background: theme.color.surface.hex(),
        borderColor: theme.assets.border.color,
        borderStyle: theme.assets.border.style,
        borderWidth: theme.assets.border.width,
        boxShadow: theme.assets.shadow.s,
        border: `2px solid ${theme.color.primary.hex()}`,
        zIndex: 3,
        transition: 'transform 0.25s',
        ':hover': {
          transform: 'scale(1.05)',
        },
        ':active': {
          transform: 'scale(0.95)',
        },
      },
    ],
  }
}

export default createClasses