/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Block, Flexbox, Paragraph, Text, useTheme } from '@stage-ui/core'

import { RefObject, useRef, useState } from 'react'
import { context } from '../..'
import { ArchitectItem } from '../../types'
import Mask, { MaskRefs } from './Mask'
import styles from './styles'

export const componentsInvisibleWhenEmpty = ['Block', 'Flexbox', 'Grid', 'Tree', 'ScrollView']
export const componentsTypography = ['Header', 'Display', 'Paragraph', 'Link', 'Text']

interface RenderItemProps {
  item: ArchitectItem
  theme: Stage.Theme
  mask: {
    hover: RefObject<MaskRefs>
    target: RefObject<MaskRefs>
    focus: RefObject<MaskRefs>
  }
}
const RenderItem = (props: RenderItemProps) => {
  const { item, theme, mask } = props

  const ref: RefObject<HTMLSpanElement> = useRef(null)

  item.$.getRect = () => {
    const rect: any = ref.current?.children[0]?.getBoundingClientRect() || {}
    const { left, top, width, height } = rect

    return {
      x: left,
      y: top,
      w: width,
      h: height,
    }
  }

  let Component = (props) => (
    <Text {...props} align="center" color={(c) => c.error} children={`⚠ ${item.component} not found ⚠`} />
  )

  if (context.tools.components[item.component]) {
    Component = context.tools.components[item.component].component
  }

  let children = item.children?.map((child) => <RenderItem mask={mask} key={child.id} item={child} theme={theme} />)

  if (!children || children.length === 0) {
    children = item.props.children || item.text || null
  }

  const convertedProps: { [key: string]: unknown } = {}

  return (
    <span
      ref={ref}
      css={{
        flex: item.props.flex,
      }}
      children={
        <Component
          {...item.props}
          {...convertedProps}
          draggable
          onMouseEnter={(e) => {
            if (mask.hover.current && !context.tools.captured) {
              mask.hover.current.update(item.$.getRect(), item.component)
            }
          }}
          onMouseLeave={(e) => {
            if (mask.hover.current) {
              mask.hover.current.hide()
            }
          }}
          onDragStart={(e) => {
            e.stopPropagation()
            context.tools.captured = item
          }}
          onDragOver={(e) => {
            e.stopPropagation()
            e.preventDefault()
            if (context.tools.captured) {
              if (context.tools.captured.id === item.id) {
                context.tools.target = item.parent
              } else {
                context.tools.target = item
              }
              if (!context.tools.target?.children) {
                context.tools.target = context.tools.target?.parent
              }
              if (context.tools.target && mask.target.current) {
                mask.target.current.update(context.tools.target.$.getRect(), context.tools.target.component)
              }
            }
          }}
          onDragLeave={(e) => {
            e.stopPropagation()
            if (mask.target.current) {
              mask.target.current.hide()
            }
            if (mask.hover.current) {
              mask.hover.current.hide()
            }
          }}
          onDrop={(e) => {
            e.stopPropagation()
            context.tools.move()
            if (mask.target.current) {
              mask.target.current.hide()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            context.tools.focused = item
            context.tools.update()
          }}
          children={children}
        />
      }
    />
  )
}

const Render = () => {
  const theme = useTheme()
  const cs = styles(theme)
  const architectItems = context.tools.getItems()
  const hoverMask = useRef<MaskRefs>(null)
  const targetMask = useRef<MaskRefs>(null)
  const focusMask = useRef<MaskRefs>(null)
  const [tooltip, setTooltip] = useState('')

  function patchStyle(items: ArchitectItem[]) {
    for (const item of items) {
      if (componentsInvisibleWhenEmpty.includes(item.component)) {
        if (item.children?.length === 0 && !item.text) {
          item.props.children = (
            <Flexbox
              column
              css={{
                color: theme.color.secondary.rgb().string(),
                textAlign: 'center',
                fontSize: '11px',
              }}
              children={`⇠ ${item.name || item.component} ⇢`}
            />
          )
        } else if (item.props.children) {
          delete item.props.children
        }
      }
      if (Array.isArray(item.children)) {
        patchStyle(item.children)
      }
    }
  }

  patchStyle(architectItems)

  return (
    <Flexbox column flex={1} css={cs.container}>
      {architectItems.length === 0 && (
        <Flexbox justifyContent="center" pt="4.75rem" css={{ position: 'absolute', width: '100%' }}>
          <Paragraph align="center" color={(c) => c.light} children="Create any component by droping it here." />
        </Flexbox>
      )}
      <Block
        css={cs.scrollContainer}
        children={architectItems.map((item) => (
          <Block key={item.id}>
            <RenderItem
              mask={{
                hover: hoverMask,
                target: targetMask,
                focus: focusMask,
              }}
              item={item}
              theme={theme}
            />
          </Block>
        ))}
        onDragOver={(e) => {
          e.stopPropagation()
          e.preventDefault()
          context.tools.target = null
        }}
        onDrop={(e) => {
          e.stopPropagation()
          if (context.tools.captured) {
            context.tools.move()
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          context.tools.focused = null
          context.tools.update()
        }}
      />
      <Mask ref={hoverMask} color={(c) => c.primary.alpha(0.5).rgb().string()} />
      <Mask ref={targetMask} color={(c) => c.primary.rgb().string()} />
      <Mask ref={focusMask} color={(c) => c.secondary.rgb().string()} item={context.tools.focused} />
    </Flexbox>
  )
}

export default Render
