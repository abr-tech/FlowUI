import { Text } from '@stage-ui/core'
import { Property } from '@stage-ui/docs/utils/types'
import React from 'react'
import BreakpointifyFeature from './Features/Breakpointify'

const PropName = (props: { property: Property }) => {
  const { property } = props

  const name = (
    <Text m={0} pb="0.5rem">
      {property.name}
      {property.flags.isOptional === false && (
        <Text textColor="error">
          <sup>*</sup>
        </Text>
      )}
    </Text>
  )
  if (property.tags?.hasOwnProperty('breakpointify')) {
    return <BreakpointifyFeature>{name}</BreakpointifyFeature>
  }
  return name
}

export default PropName
