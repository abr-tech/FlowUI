/** @jsx jsx */
import { jsx } from '@emotion/react'
import * as themes from '@stage-ui/core/misc/themes'
import { Provider, useComponent } from '@stage-ui/system'
import { forwardRef, ForwardRefRenderFunction, Fragment, useImperativeHandle, useRef } from 'react'
import MountArea from './MountArea'
import styles from './styles'
import Types from './types'

const Viewport: ForwardRefRenderFunction<HTMLDivElement, Types.Props> = (props, ref) => {
    
    const { wrapper, cache } = props
    const theme = (typeof props.theme === 'string' 
        ? themes[props.theme] 
        : props.theme
        ) || themes.light

    const viewportRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => viewportRef.current as HTMLDivElement)

    const EmotionCache = {
        key: 'flow',
        container:  (viewportRef && viewportRef.current) || undefined,
        ...cache
    }

    const { cs, attributes, events } = useComponent('Viewport', {
        props,
        styles,
        styleProps: {
            container: ['all']
        },
        theme,
    }, { wrapper })

    const Content = (
        <Provider theme={theme} global={!wrapper ? cs.container : undefined} cache={EmotionCache}>
            <Fragment>
                {props.children}
                <MountArea />
            </Fragment>
        </Provider>
    )

    return wrapper 
        ? <div 
            {...attributes} 
            {...events.all} 
            ref={viewportRef} 
            children={Content} 
            css={cs.container} 
        />
        : Content
}

export default forwardRef(Viewport)