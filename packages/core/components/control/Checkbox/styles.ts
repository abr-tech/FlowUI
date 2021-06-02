import Types from './types'
import SystemTypes from '@stage-ui/system/types'
import checkStyles from '@stage-ui/core/misc/hocs/Check/styles'

const createClasses: CreateClasses<Types.Styles, Types.Props> = (props, theme) => {

    return {
        ...checkStyles(props, theme),

        check: (variant) => [
            {
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.color.primary.hex(),
                backgroundColor: theme.color.surface.hex(),
                borderColor: theme.color.light.hex(),
                boxShadow: theme.assets.innerShadow.m,
                borderWidth: theme.assets.border.width,
                borderStyle: theme.assets.border.style,
                borderRadius: theme.radius.s,
                transition: 'color .15s, border-color .15s, background-color .15s',
                willChange: 'color, border-color, background-color',
            },
            variant({
                focus: [{
                    borderColor: theme.color.primary.alpha(0.5).rgb().string()
                }],
                checked: [{
                    backgroundColor: theme.color.primary.hex(),
                    borderColor: 'transparent'
                }],
                disabled: [{
                    color: theme.color.hardest.hex(),
                    borderColor: theme.color.lightest.hex(),
                    backgroundColor: theme.color.lightest.hex(),
                }, variant({
                    checked: [{
                        backgroundColor: theme.color.primary.alpha(0.5).rgb().string(),
                        borderColor: 'transparent'
                    }]
                })],
                size: {
                    xs: [{
                        width: '0.75rem',
                        height: '0.75rem'
                    }],
                    s: [{
                        width: '1rem',
                        height: '1rem'
                    }],
                    m: [{
                        width: '1.25rem',
                        height: '1.25rem'
                    }],
                    l: [{
                        width: '1.5rem'
                    }],
                    xl: [{
                        width: '2rem',
                        height: '2rem'
                    }],
                },
            }),
        ],
        icon: (variant) => [
            {
                height: 'auto',
                transition: 'opacity .15s, transform .15s',
                willChange: 'opacity, transform',
                stroke: theme.color.onPrimary.hex(),
                strokeWidth: "2px",
                strokeLinejoin: "round",
                opacity: 0,
                transform: `scale(0.5)`,
            },
            variant({
                size: {
                    xs: [{
                        fontSize: '0.5rem'
                    }],
                    s: [{
                        fontSize: '0.75rem'
                    }],
                    m: [{
                        fontSize: '1rem'
                    }],
                    l: [{
                        fontSize: '1.45rem'
                    }],
                    xl: [{
                        fontSize: '1.9rem'
                    }],
                },
                checked: [{
                    opacity: 1,
                    transform: `scale(1)`,

                }]
            }),
        ]
    }
}

export default createClasses