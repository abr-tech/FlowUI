import { Block, Divider, Drop, Link, Paragraph, Popover, Text } from '@stage-ui/core'
import { ExternalLink } from '@stage-ui/icons'
import React from 'react'

const BreakpointifyFeature = (props: { children: React.ReactNode }) => {
  const [active, setActive] = React.useState(false)
  const ref = React.createRef<HTMLDivElement>()
  return (
    <Block
      ref={ref}
      css={{ display: 'inline' }}
      onMouseEnter={() => setActive(true)}
      onTouchStart={() => setActive(true)}
    >
      <Text weight="bold" textColor="primary">
        [
      </Text>
      {props.children}
      <Text weight="bold" textColor="primary">
        ]
      </Text>
      <Drop
        spacing={10}
        css={{
          transition: 'all 0.25s',
          marginTop: active ? '0' : '1rem',
          visibility: active ? 'visible' : 'hidden',
          opacity: active ? 1 : 0,
        }}
        target={ref}
        onClickOutside={() => {
          setActive(false)
        }}
      >
        <Popover
          onMouseLeave={() => {
            setActive(false)
          }}
          css={{ maxWidth: '15rem' }}
        >
          <Paragraph m={0} weight="bold" textColor="hardest">
            Breakpoints support
          </Paragraph>
          <Paragraph>You could provide array of properties for responsive render.</Paragraph>
          <Divider mb="0.5rem" />
          <Link href="/props/#breakpoints">
            More info <ExternalLink />
          </Link>
        </Popover>
      </Drop>
    </Block>
  )
}
export default BreakpointifyFeature
