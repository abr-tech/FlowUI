import callProp from '@flow-ui/core/misc/utils/callProp'
import Types from './types'
import fieldStyles from '../../misc/hocs/Field/styles'
import WhaleTypes from '@flow-ui/whale/types'

const styles: WhaleTypes.CreateStyles<Types.Overrides, Types.Props, Types.StyleParams> = (props, theme, params) => {

    const minHeight =
        theme.assets.field[props.size || 'm']?.minHeight ||
        theme.assets.field.m.minHeight ||
        '2.5rem'

    return {
        ...fieldStyles<Types.Overrides>(props, theme, {
            field: (variant) => [
                params?.isOpen && {
                    borderColor: theme.color.primary.css(),
                    borderBottomColor: theme.color.lightest.css(),
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                },
                variant({
                    decoration: {
                        filled: [
                            params?.isOpen && {
                                borderColor: 'transparent',
                            }
                        ],
                        none: [
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
                background: theme.color.surface.css(),
                borderColor: theme.color.primary.css(),
                borderRadius: theme.radius.narrow,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxSizing: 'border-box',
                overflow: 'hidden'
            },
            variant({
                shape: {
                    square: {
                        borderRadius: 0
                    },
                    round: [
                        {
                            borderRadius: `calc(${theme.assets.field.m.minHeight}/2)`
                        },
                        variant({
                            size: {
                                xl: { borderRadius: `calc(${theme.assets.field.xl.minHeight}/2)` },
                                l:  { borderRadius: `calc(${theme.assets.field.l.minHeight}/2)` },
                                s:  { borderRadius: `calc(${theme.assets.field.s.minHeight}/2)` },
                                xs: { borderRadius: `calc(${theme.assets.field.xs.minHeight}/2)` }
                            },
                        })
                    ]
                },
                decoration: {
                    filled: [
                        {
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
                    },
                    none: {
                        background: 'transparent',
                        borderColor: 'transparent',
                    }
                },
            }),
            {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: 'none',
            }
        ],
        dropItem: (variant) => [
            theme.typography.text.m,
            theme.assets.field,
            {
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': {
                    color: theme.color.primary.css(),
                    backgroundColor: theme.color.primary.alpha(0.1).css()
                }
            },
            variant({
                size: theme.typography.text
            }),
            variant({
                size: theme.assets.field
            })
        ],

        selectedOptionsContainer: [{
            display: 'flex',
            flexWrap: 'wrap',
            margin: `calc(${minHeight} / 10) 0`,
            // marginLeft: 0,
            // marginBottom: `calc(${minHeight} / 5)`,
        }],
        selectedOptionInput: (variant) => [
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
                '&::placeholder': {
                    color: theme.color.light.css()
                },
            },
            variant({
                searchMode: {
                    color: theme.color.hard.css()
                },
                // multiselect: {
                //     width: 'auto',
                //     minWidth: '1rem'
                // }
            })
        ],
        tag: (variant) => [
            {
                display: 'inline-flex',
                background: theme.color.primary.alpha(0.2).css(),
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme.color.primary.css(),
                borderRadius: `calc(${theme.radius.narrow} / 2)`,
                boxSizing: 'border-box',
                color: theme.color.primary.css(),
                padding: `0 calc(${minHeight} / 5)`,
                marginRight: `calc(${minHeight} / 10)`,
                // marginLeft: 0,
                // marginBottom: 0,
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
                borderColor: theme.color.primary.alpha(0.2).css(),
                color: theme.color.primary.alpha(0.8).css(),
                cursor: 'pointer',
                ':hover': {
                    color: theme.color.primary.css()
                },
            },
        ],
    }
}

export default styles