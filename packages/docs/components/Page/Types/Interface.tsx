import React, { useState, useMemo } from 'react'
import { Block, Header, Flexbox, Table, ScrollView } from '@stage-ui/core'
import TableTypes from '@stage-ui/core/components/data/Table/types'
import { Interface as InterfaceType, Property } from '../../../utils/types'

interface InterfaceProps {
  data: InterfaceType
  separatedTypes?: string[]
  columns: TableTypes.TableColumn<Property>[]
}

const sortTypes = (data: InterfaceType, separatedTypes?: string[]) => {
  const types: Record<string, Property[]> = {
    [data.name]: data.types,
  }

  const getExtendedTypes = (type: InterfaceType, parent?: string) => {
    type.extendedTypes.forEach((innerType) => {
      const innerName = innerType.tags.name?.trim()
      if ((separatedTypes && separatedTypes.includes(innerName)) || parent) {
        if (parent) {
          types[parent] = types[parent].concat(innerType.types)
        } else {
          types[innerName] = innerType.types
        }
        getExtendedTypes(innerType, parent || innerName)
      } else {
        types[data.name] = types[data.name].concat(innerType.types)
        getExtendedTypes(innerType)
      }
    })
  }

  getExtendedTypes(data)

  return types
}

const Interface = (props: InterfaceProps) => {
  const [active, setActive] = useState(props.data.name)

  const types = useMemo(() => {
    setActive(props.data.name)
    return sortTypes(props.data, props.separatedTypes)
  }, [props])

  const names = Object.keys(types)

  const data = types[active]?.sort((a, b) => {
    return a.flags.isOptional ? 1 : -1
  })

  return (
    <Block>
      <div style={{ position: 'relative', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
        <ScrollView size="xs">
          <Flexbox>
            {names.map((name) => (
              <Header
                key={name}
                mr="1.5rem"
                color={name === active ? 'onBackground' : 'light'}
                onClick={() => setActive(name)}
              >
                {name}
              </Header>
            ))}
          </Flexbox>
        </ScrollView>
      </div>
      <Table columns={props.columns} data={data || []} />
    </Block>
  )
}

export default Interface
