/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useComponent } from '@stage-ui/system'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import styles from './styles'
import Types from './types'

const Badge: ForwardRefRenderFunction<HTMLDivElement, Types.Props> = (props, ref) => {

    const { cs, attributes, events } = useComponent('Badge', { 
        props, 
        styles, 
        styleProps: {
            container: ['flow'], 
            holder: ['self']
        }
    })

    return (
        <div css={cs.container}>
            <div
                {...attributes}
                {...events.all}
                ref={ref}
                children={props.content}
                css={cs.holder({
                    align: props.align,
                    shape: props.shape
                })}
            />
            {props.children}
        </div>
    )
}

export default forwardRef(Badge)