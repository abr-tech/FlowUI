import React from 'react'
import { Divider, Flexbox, Text } from '@stage-ui/core'

export default () => {
  return (
    <Flexbox column decoration="surface" p="1rem">
      <Text>up</Text>
      <Divider my="s" />
      <Text>down</Text>
    </Flexbox>
  )
}
