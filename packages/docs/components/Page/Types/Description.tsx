import { Link, Paragraph, Text } from '@stage-ui/core'
import { Property } from '@stage-ui/docs/utils/types'
import React from 'react'

const Description = (props: { property: Property }) => {
  const { property } = props
  return (
    <>
      <Paragraph m={0}>{property.comment}</Paragraph>
      {property.tags.see && (
        <Link target="_blank" mt="0.5rem" css={{ textDecoration: 'underline' }} href={property.tags.see}>
          <Text size="xs">Learn more.</Text>
        </Link>
      )}
    </>
  )
}

export default Description
