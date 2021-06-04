import { css } from '@emotion/react'

export default (theme: Stage.Theme) => {
  return {
    container: css({
      padding: '1rem',
      border: '1px solid',
      borderColor: theme.color.lightest.rgb().string(),
      borderRadius: theme.radius.m,
    }),
    legatureButton: css({
      width: '100%',
      fontFamily: 'Courier',
    }),
  }
}
