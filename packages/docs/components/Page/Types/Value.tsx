import { Flexbox, Link, Text } from '@stage-ui/core'
import TextTypes from '@stage-ui/core/components/content/Text/types'
import { OType, Property } from '@stage-ui/docs/utils/types'
import React from 'react'

// import { ValueDefinition } from '@stage-ui/docs/components/Page/Types/Interface'
// interface ValueProps {
//     type: ValueDefinition,
// }

type BadgeProps = {
  text: string
  textColor?: TextTypes.Props['textColor']
  backgroundColor?: TextTypes.Props['backgroundColor']
}

const LightText = (props: { children: string }) => (
  <Text size="xs" color="hard">
    {props.children}
  </Text>
)

const Badge: React.FC<BadgeProps> = ({ text, ...textProps }) => (
  <Text
    h="fit-content"
    size="xs"
    p=".125rem 0.25rem"
    mx=".125rem"
    mb=".25rem"
    backgroundColor={(c) => {
      switch (text) {
        case 'number':
          return c.success.alpha(0.2)
        case 'boolean':
          return c.primary.alpha(0.2)
        case 'string':
          return c.error.alpha(0.2)
        case 'function':
          return c.primary.alpha(0.3)
        default:
          return c.onSurface.alpha(0.1)
      }
    }}
    {...textProps}
    css={{ borderRadius: '.25rem' }}
  >
    {text}
  </Text>
)

const Value = (props: { property: Property }) => {
  const { property } = props

  let values: JSX.Element[] = []

  const { value, tags } = property

  const val = value

  const push = (val: OType) => {
    let isArray = false
    let ret = <span />

    if (val.type === 'array') {
      val = val.elementType
      isArray = true
    }
    if (val.type === 'reflection') {
      if (val.declaration.signatures) {
        ret = <Badge text="function" />
      }
    }
    if (val.type === 'intrinsic') {
      const text = val.name
      ret = <Badge text={text} />
    }
    if (val.type === 'stringLiteral') {
      const text = val.value
      ret = <Badge text={text} />
    }
    if (val.type === 'reference') {
      ret = <Badge text={val.name} backgroundColor="onSurface" textColor="surface" />
    }

    values.push(isArray ? <span key={Math.random()}>[{ret}]</span> : <span key={Math.random()}>{ret}</span>)
  }

  if (val.type === 'union') {
    val.types.map((val) => push(val))
  } else {
    push(val)
  }

  if (values.length === 0) {
    values.push(<LightText key={Math.random()}>Not documented yet</LightText>)
  }

  if (tags.display) {
    const vals = tags.display.split('|')
    values = []
    for (const val of vals) {
      values.push(
        <Badge
          key={Math.random()}
          text={val.trim()}
          textColor={tags.display ? (c) => c.primary : void 0}
          backgroundColor={tags.display ? (c) => c.primary.alpha(0.1) : void 0}
        />,
      )
    }
  }
  if (tags.link) {
    return (
      <Link target="_blank" css={{ textDecoration: 'underline' }} color="primary" href={tags.link}>
        {values}
      </Link>
    )
  }

  return <Flexbox wrap="wrap">{values}</Flexbox>
}

export default Value
