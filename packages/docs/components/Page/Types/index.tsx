import React from 'react'
import { Grid } from '@stage-ui/core'
import { Config } from '../../../utils/core'
import TypeDoc from '../../../utils/types'
import Interface from './Interface'

interface TypesProps {
  nameSpace: string
  config: Config
  shrink: boolean
}

const Types = (props: TypesProps) => {
  const { nameSpace, config } = props
  const types = TypeDoc.findModule(nameSpace)

  if (!config.pages?.types || !types) {
    return null
  }

  return (
    <Grid templateColumns={props.shrink ? '45rem' : '100%'} gap="3rem" mt="3rem">
      {config.pages.types.map((configType, index) => {
        const interfaceTypes = types.findInterface(configType.interface)
        if (!interfaceTypes) return null
        return (
          <Interface
            key={`interface-${index}`}
            data={interfaceTypes}
            columns={configType.columns}
            separatedTypes={config.pages?.separatedTypes}
          />
        )
      })}
    </Grid>
  )
}

export default Types
