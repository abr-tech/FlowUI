import { css, SerializedStyles } from '@emotion/react'

export type StyleTypes = {
  container: SerializedStyles
  scrollView: SerializedStyles
  scrollContainer: SerializedStyles
  item: (selected: boolean) => SerializedStyles
  tag: SerializedStyles
}

const createTheme: (theme: Stage.Theme) => StyleTypes = (theme) => ({
  container: css({
    width: '20rem',
    borderRight: `1px solid ${theme.color.lightest}`,
  }),
  scrollView: css({
    height: 'calc(100vh - 6rem)',
  }),
  scrollContainer: css({
    paddingTop: '1rem',
  }),
  item: (selected: boolean) =>
    css([
      {
        display: 'block',
        padding: '0.25rem 0.5rem',
        margin: '1px 0',
        borderRightWidth: '4px',
        borderRightStyle: 'solid',
        borderRightColor: theme.color.primary.alpha(0).rgb().string(),
        "span[id^='ctrl']": {
          visibility: 'hidden',
        },
        '&:hover': {
          background: theme.color.hard.alpha(0.1).rgb().string(),
          "span[id^='ctrl']": {
            visibility: 'visible',
          },
        },
      },
      selected && {
        borderRightColor: theme.color.primary.alpha(1).rgb().string(),
        background: theme.color.primary.alpha(0.1).rgb().string(),
        '&:hover': {
          background: theme.color.primary.alpha(0.1).rgb().string(),
        },
      },
    ]),
  tag: css([
    {
      padding: '0.125rem 0.5rem',
      borderRadius: '1rem',
      color: theme.color.onSecondary.rgb().string(),
      background: theme.color.secondary.rgb().string(),
    },
  ]),
})

export default createTheme
