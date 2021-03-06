import { css } from '@emotion/react'
import SystemTypes from '@stage-ui/system/types'

export default (theme: SystemTypes.Theme) => ({
    container: css({
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: '4rem',
        bottom: 0,
        background: theme.color.background.rgb().string(),
        borderTop: `1px solid ${theme.color.lightest}`
    })
})