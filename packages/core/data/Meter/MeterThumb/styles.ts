
import colorProp from '@stage-ui/system/utils/colorProp'
import SystemTypes from '@stage-ui/system/types'
import Types from './types'

//@ts-ignore
const styles: SystemTypes.CreateStyles<Types.Styles, Types.PrivateProps> = (props, theme) => {
    const { loading } = props

    const color = colorProp(theme, props.color) || theme.color.primary
    const field = theme.assets.field[props.size || 'm'] || theme.assets.field.m

    return {
        container: (variant) => [
            {
                position: 'absolute',
                top: 0,
                height: '100%',
                background: color.rgb().string(),
                animation: loading ? 'move 2s linear infinite' : 'none',
                overflow: 'hidden',
                borderRadius: '4rem',
                transition: 'width 0.25s',
                boxSizing: 'border-box',
                minHeight: `calc(${field.minHeight} / 4)`,
                zIndex: 1,
                '&:last-child': {
                    position: 'relative',
                },
                '&:after': loading && [
                    {
                        content: `''`,
                        position: 'absolute',
                        top: '0; left: 0; bottom: 0; right: 0',
                        backgroundImage: `linear-gradient(
                            -45deg, 
                            ${theme.color.surface.alpha(0.2).string()} 25%, 
                            transparent 25%, 
                            transparent 50%, 
                            ${theme.color.surface.alpha(0.2).string()} 50%, 
                            ${theme.color.surface.alpha(0.2).string()} 75%, 
                            transparent 75%, 
                            transparent
                        )`,
                        backgroundSize: '2rem 2rem',
                        zIndex: 1,
                        animation: 'move 2s linear infinite',
                        overflow: 'hidden',
                    },
                    variant({
                        size: {
                            xs: [{
                                backgroundSize: '0.5rem 0.5rem'
                            }],
                            s: [{
                                backgroundSize: '1rem 1rem'
                            }],
                            l: [{
                                backgroundSize: '3rem 3rem'
                            }],
                            xl: [{
                                backgroundSize: '4rem 4rem'
                            }],
                        }
                    }),
                ],
                '@keyframes move': {
                    '0%': {
                        backgroundposition: '0 0'
                    },
                    '100%': {
                        backgroundPosition: '2rem 2rem'
                    }
                }
            },
            variant({
                shape: {
                    square: [{
                        borderRadius: 0
                    }]
                }
            }),
        ]
    }
}

export default styles