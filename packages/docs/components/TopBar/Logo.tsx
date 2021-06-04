import { Flexbox, Text } from '@stage-ui/core'
import corePackage from '@stage-ui/core/package.json'
import React from 'react'

export interface TopBarLogoProps {
  title?: string
  setIndex: () => void
}

const TopBarLogo = ({ title, setIndex }: TopBarLogoProps) => (
  <Flexbox flex={1}>
    <Text size="xl" weight="bold" css={{ cursor: 'pointer' }} onClick={setIndex}>
      {title}
    </Text>
    <Text
      size="xs"
      lineHeight="0"
      textColor="primary"
      css={{
        verticalAlign: 'text-top',
      }}
    >
      β
    </Text>
    <Text
      size="xs"
      lineHeight="0"
      ml="0.25rem"
      textColor="light"
      css={{
        verticalAlign: 'text-top',
      }}
    >
      {corePackage.version}
    </Text>
  </Flexbox>
)

export default TopBarLogo
