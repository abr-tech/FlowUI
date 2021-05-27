import { jsx } from '@emotion/react'
import { useSystem } from '@stage-ui/system'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import styles from './styles'
import Types from './types'

const Flexbox: ForwardRefRenderFunction<HTMLDivElement, Types.Props> = (props, ref) => {

    const { classes, attributes, events } = useSystem('Flexbox', { 
        props, 
        styles, 
        styleProps: { container: ['all'] },
    })

    return jsx(
        'div',
        {
            ...attributes,
            ...events,
            ref: ref,
            css: classes.container({
                decoration: props.decoration
            }),
            className: props.className
        },
        props.children
    )
}

export default forwardRef(Flexbox)