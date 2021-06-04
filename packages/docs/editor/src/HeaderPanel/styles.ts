import { css } from '@emotion/react'

export default (theme: Stage.Theme) => {
  return {
    container: css({
      background: theme.color.surface.rgb().string(),
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '3rem',
      padding: '0 1rem',
    }),
  }
}
