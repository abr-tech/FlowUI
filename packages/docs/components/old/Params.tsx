import { Flexbox, Text } from '@flow-ui/core'
import TextTypes from '@flow-ui/core/content/Text/types'
import React from 'react'
import { Property } from '@flow-ui/docs/system/types'

const Params = (props: { property: Property }) => {
    const { property } = props

    const Label = (props: TextTypes.Props) =>
        <Text
            mr=".5rem"
            css={{ whiteSpace: 'nowrap' }}
            {...props}
        />
    return (
        <Flexbox css={{ overflow: 'hidden' }} wrap="wrap">
            {property.tags?.depricated &&
                <Label>Deprecated</Label>
            }
            {!property.flags?.isOptional && (
                <Text 
                    size="s"
                    backgroundColor={c => c.warning.alpha(0.2)}
                    borderRadius={'0.125rem'}
                    p="0.125rem 0.25rem"
                    children="Required"
                />
            )}
            {property.tags?.breakpointify &&
                <Label>Support breakpoints</Label>
            }
        </Flexbox>
    )
}

export default Params