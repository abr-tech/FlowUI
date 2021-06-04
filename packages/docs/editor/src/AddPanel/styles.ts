import { css, SerializedStyles } from '@emotion/react'

export type AddPanelStyles = {
  backgroundLayer: SerializedStyles
  container: SerializedStyles
  searchBar: SerializedStyles
  component: (focused: boolean) => SerializedStyles
}

export default (theme: Stage.Theme): AddPanelStyles => {
  return {
    backgroundLayer: css({
      zIndex: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }),
    container: css({
      zIndex: 10,
      position: 'absolute',
      width: '40rem',
      height: '30rem',
      top: '50%',
      left: '50%',
      marginTop: '-15rem',
      marginLeft: '-20rem',
      background: theme.color.surface.rgb().string(),
      border: '0.5px solid',
      borderColor: theme.color.lightest.rgb().string(),
      boxShadow: '0 0.5rem 5rem rgba(0,0,0,0.3)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }),
    searchBar: css({
      boxShadow: 'none !important',
    }),
    component: (focused: boolean) =>
      css({
        padding: '1rem 2rem',
        background: focused ? theme.color.primary.alpha(0.2).rgb().string() : theme.color.surface.rgb().string(),
      }),
  }
}
