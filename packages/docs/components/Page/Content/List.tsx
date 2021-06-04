import { useTheme } from '@stage-ui/system/'
import React from 'react'

export default (props: { data: string[]; higlightBefore?: string }) => {
  const theme = useTheme()

  return (
    <ul
      css={{
        listStyle: 'none',
        lineHeight: 1.5,
        'li::before': {
          content: `'\\2022'`,
          color: theme.color.primary.rgb().string(),
          fontWeight: 'bold',
          display: 'inline-block',
          width: '1em',
          marginLeft: '-1em',
        },
      }}
    >
      {props.higlightBefore
        ? props.data.map((child, index) => {
            const split = child.split(props.higlightBefore as string)[0]
            const other = child.substring(split.length)

            return (
              <li key={child + index}>
                <span
                  css={{
                    backgroundColor: theme.color.primary.lighten(0.5).rgb().string(),
                    padding: '.05rem .3rem .1rem',
                    borderRadius: '.2rem',
                  }}
                >
                  {split}
                </span>
                {other}
              </li>
            )
          })
        : props.data.map((child, index) => <li key={child + index}>{child}</li>)}
    </ul>
  )
}
