import { css } from '@emotion/react'

type State = {
  lockX: boolean
  lockY: boolean
  lockC: boolean
}
export default (theme: Stage.Theme, state: State) => {
  const { lockX, lockY, lockC } = state

  return {
    container: css({
      padding: '1rem',
      border: '1px solid',
      borderColor: theme.color.lightest.rgb().string(),
      borderRadius: theme.radius.m,
    }),
    lock: css({
      position: 'relative',
    }),
    lockX: css({
      position: 'absolute',
      width: '100%',
      height: '7px',
      top: '50%',
      marginTop: '-3px',
      background: theme.color.primary.alpha(0.1).rgb().string(),
      '> div': {
        position: 'absolute',
        width: '100%',
        height: '1px',
        top: '3px',
        background: theme.color.primary
          .alpha(lockX ? 1 : 0.2)
          .rgb()
          .string(),
      },
    }),
    lockY: css({
      position: 'absolute',
      height: '100%',
      width: '7px',
      left: '50%',
      marginLeft: '-3px',
      background: theme.color.primary.alpha(0.1).rgb().string(),
      '> div': {
        position: 'absolute',
        height: '100%',
        width: '1px',
        left: '3px',
        background: theme.color.primary
          .alpha(lockY ? 1 : 0.2)
          .rgb()
          .string(),
      },
    }),
    lockC: css({
      display: 'flex',
      // justifyItems:'center',
      alignItems: 'center',
      // alignContent:'center',
      position: 'absolute',
      height: '1.5rem',
      width: '1.5rem',
      top: '50%',
      left: '50%',
      marginTop: '-0.75rem',
      marginLeft: '-0.75rem',
      background: theme.color.surface.rgb().string(),
      border: '1px solid',
      borderTopColor: theme.color.primary
        .alpha(lockY ? 1 : 0.2)
        .rgb()
        .string(),
      borderBottomColor: theme.color.primary
        .alpha(lockY ? 1 : 0.2)
        .rgb()
        .string(),
      borderLeftColor: theme.color.primary
        .alpha(lockX ? 1 : 0.2)
        .rgb()
        .string(),
      borderRightColor: theme.color.primary
        .alpha(lockX ? 1 : 0.2)
        .rgb()
        .string(),
      '> span': {
        color: theme.color.primary
          .alpha(lockC ? 1 : 0.2)
          .rgb()
          .string(),
        flex: 1,
        justifyContent: 'center',
      },
    }),
  }
}
