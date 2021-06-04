/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Block, Text, useTheme } from '@stage-ui/core'

import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ArchitectItem } from '../../types'
import styles from './styles'

type MaskProps = {
  color: (color: Stage.Theme['color']) => string
  item?: ArchitectItem | null
}
export type MaskRefs = {
  update: (rect: { x: number; y: number; h: number; w: number }, name?: string) => void
  hide: () => void
}

const Mask: ForwardRefRenderFunction<MaskRefs, MaskProps> = (props, ref) => {
  const theme = useTheme()
  const cs = styles(theme)
  const selectMask = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')

  const update = (rect, name) => {
    if (selectMask.current) {
      selectMask.current.style.opacity = '1'
      selectMask.current.style.width = `${rect.w}px`
      selectMask.current.style.height = `${rect.h}px`
      selectMask.current.style.top = `${rect.y}px`
      selectMask.current.style.left = `${rect.x}px`
    }
    setName(name || '')
  }

  const hide = () => {
    if (selectMask && selectMask.current) {
      selectMask.current.style.opacity = '0'
    }
  }

  useEffect(() => {
    if (props.item) {
      const { $, component } = props.item
      update($.getRect(), component)
    }
    if (props.item === null) {
      hide()
    }
  })

  useImperativeHandle(ref, () => ({ update, hide }))

  return (
    <Block
      css={cs.mask(props.color(theme.color))}
      ref={selectMask}
      children={
        name && (
          <Text size="xs" css={cs.maskName(props.color(theme.color))}>
            {name}
          </Text>
        )
      }
    />
  )
}

export default forwardRef(Mask)
