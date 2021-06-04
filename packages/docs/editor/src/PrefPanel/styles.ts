import { css } from '@emotion/react'

export default (theme: Stage.Theme) => {
  return {
    container: css({
      width: '20rem',
      borderLeft: `1px solid ${theme.color.lightest}`,
    }),
    scrollView: css({
      height: 'calc(100vh - 6rem)',
    }),
    scrollContainer: css({
      padding: '0 1rem',
    }),
    componentName: (active: boolean) =>
      css(
        {
          position: 'absolute',
          top: '0.25rem',
          right: '0.5rem',
          borderRadius: '1rem',
          color: theme.color.light.rgb().string(),
        },
        active && {
          color: theme.color.onPrimary.rgb().string(),
          background: theme.color.primary.rgb().string(),
        },
      ),
  }
}
