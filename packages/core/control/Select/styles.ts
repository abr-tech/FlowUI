import Types from './types'
import fieldStyles from '../../misc/hocs/Field/styles'
import SystemTypes from '@stage-ui/system/types'
import SharedZIndex from '../../misc/utils/SharedZIndex'

const styles: SystemTypes.CreateStyles<Types.Styles, Types.Props, Types.StyleParams> = (props, theme, params) => {

    const minHeight =
        theme.assets.field[props.size || 'm']?.minHeight ||
        theme.assets.field.m.minHeight ||
        '2.5rem'

    return {
        ...fieldStyles<Types.Styles>(props, theme, {
            field: (variant) => [
                params?.isOpen && {
                    borderColor: theme.color.primary.rgb().string(),
                    zIndex: SharedZIndex.increment + 2
                },
                variant({
                    decoration: {
                        filled: [
                            params?.isOpen && {
                                borderColor: 'transparent',
                            }
                        ],
                        none: [
                            { padding: 0 },
                            params?.isOpen && {
                                borderColor: 'transparent',
                            }
                        ],
                        underline: [
                            params?.isOpen && {
                                borderColor: 'transparent',
                            }
                        ]
                    }
                }),
            ]
        }),
        drop: (variant) => [
            {
                position: 'relative',
                background: theme.color.surface.rgb().string(),
                borderRadius: theme.radius.s,
                boxShadow: theme.assets.shadow.l,
                boxSizing: 'border-box',
                overflow: 'hidden',
            },
            variant({
                shape: {
                    square: {
                        borderRadius: 0
                    },
                    round: {
                        borderRadius: `calc(${minHeight}/2)`,
                    }
                },
                decoration: {
                    filled: [
                        {
                            boxShadow: 'none',
                            top: 0,
                            borderColor: 'transparent'
                        },
                    ],
                    underline: {
                        borderTopColor: 'transparent',
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        background: 'transparent',
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderRadius: 0,
                        backgroundColor: theme.color.surface.hex(),
                    },
                    none: {
                        borderTopLeftRadius: theme.radius.s,
                        borderTopRightRadius: theme.radius.s,
                        borderTopWidth: '1px',
                    }
                }
            })
        ],
        dropItem: (variant) => [
            theme.assets.typography.text.m,
            theme.assets.field,
            {
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.25s',
                ':hover': {
                    color: theme.color.primary.rgb().string(),
                    backgroundColor: theme.color.primary.alpha(0.1).rgb().string()
                }
            },
            variant({
                size: theme.assets.typography.text
            }),
            variant({
                size: theme.assets.field
            }),
            variant({
                selected: {
                    color: theme.color.onPrimary.rgb().string(),
                    backgroundColor: theme.color.primary.rgb().string(),
                    ':hover': {
                        color: theme.color.onPrimary.rgb().string(),
                        backgroundColor: theme.color.primary.rgb().string(),
                    }
                }
            }),
        ],

        selected: [{
            display: 'flex',
            flexWrap: 'wrap',
            margin: `calc(${minHeight} / 10) 0`,
            // marginLeft: 0,
            // marginBottom: `calc(${minHeight} / 5)`,
        }],

        input: (variant) => [
            {
                flex: 1,
                outline: 0,
                padding: 0,
                margin: 0,
                border: 'none',
                backgroundImage: 'none',
                backgroundColor: 'transparent',
                resize: 'vertical',
                boxShadow: 'none',
                color: 'inherit',
                font: 'inherit',
                cursor: 'inherit',
                textOverflow: 'ellipsis',
                '&::placeholder': {
                    color: theme.color.light.rgb().string()
                },
            },
            variant({
                searchMode: {
                    color: theme.color.hard.rgb().string()
                },
                disableEvents: {
                    pointerEvents: 'none'
                },
            })
        ],
        tag: (variant) => [
            {
                display: 'inline-flex',
                background: props.disabled
                    ? theme.color.lightest.rgb().string()
                    : theme.color.primary.alpha(0.2).rgb().string(),
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: props.disabled
                    ? theme.color.light.rgb().string()
                    : theme.color.primary.rgb().string(),
                borderRadius: `calc(${theme.radius.s} / 2)`,
                boxSizing: 'border-box',
                color: props.disabled
                    ? theme.color.light.rgb().string()
                    : theme.color.primary.rgb().string(),
                padding: `0 calc(${minHeight} / 5)`,
                margin: `calc(${minHeight} / 20)`,
                marginRight: 'calc(${minHeight} / 10)',
                marginLeft: 0,
                alignItems: 'center'
            },
            variant({
                shape: {
                    square: {
                        borderRadius: 0
                    },
                    round: {
                        borderRadius: `100px`
                    }
                },
                decoration: {
                    filled: [
                        {
                            borderColor: 'transparent'
                        },
                    ],
                    underline: {
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                        background: 'transparent',
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderRadius: 0,
                    },
                    none: {
                        background: 'transparent',
                    }
                }
            })
        ],
        tagRemove: (variant) => [
            {
                marginLeft: `calc(${minHeight} / 10)`,
                marginRight: `calc(-${minHeight} / 10)`,
                borderLeft: '1px solid',
                color: props.disabled
                    ? theme.color.light.rgb().string()
                    : theme.color.primary.alpha(0.8).rgb().string(),
                cursor: 'pointer',
                ':hover': {
                    color: props.disabled
                        ? theme.color.light.rgb().string()
                        : theme.color.primary.rgb().string()
                },
            },
        ],
        emptyConteiner: (variant) => [
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `calc(${minHeight} / 5)`
            },
        ],
        emptyText: (variant) => [
            {
                color: theme.color.light.hex(),
                userSelect: 'none',
            },
            variant({
                size: theme.assets.typography.text
            }),
        ]
    }
}

export default styles