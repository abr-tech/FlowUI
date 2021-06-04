import React from 'react'
import { Divider, Flexbox, Text } from '@stage-ui/core'

export default () => {
  return (
    <Flexbox decoration="surface" p="1rem">
      <Text>left</Text>
      <Divider vertical mx="s" />
      <Text>rigth</Text>
    </Flexbox>
  )
}
