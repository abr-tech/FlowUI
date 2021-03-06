import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { useTheme } from '@stage-ui/core'
import Typography from '@stage-ui/core/misc/hocs/Typography'
import Types from './types'

const Link: ForwardRefRenderFunction<HTMLAnchorElement, Types.Props> = (props, ref) => {
    const theme = useTheme()

    return (
        <Typography
            tag="a"
            sizesOf="text"
            overrides="Link"
            specificStyles={{
                outline: 'none',
                color: theme.color.primary.hex(),
                textDecoration: 'unset',
                '&:hover': {
                    textDecoration: 'underline'
                },
            }}
            ref={ref}
            {...props}
        />
    )
}

export default forwardRef(Link)