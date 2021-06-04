import * as CoreScope from '@stage-ui/core'
import { Block } from '@stage-ui/core'
import * as IconScope from '@stage-ui/icons'
import * as LabScope from '@stage-ui/lab'

import React from 'react'
import ts, { JsxEmit, ModuleKind } from 'typescript'

Object.assign(window, {
  React,
  ...React,
  FlowScope: {
    React,
    ...React,
    ...IconScope,
    ...CoreScope,
    ...LabScope,
  },
})

interface PreviewProps {
  theme: Stage.Theme
  code: string
  grid: boolean
  fullscreen: boolean
  setFullscreen: (state: boolean) => void
}

const Preview = (props: PreviewProps) => {
  const { theme, code, grid, fullscreen, setFullscreen } = props
  let traspiledCode =
    code &&
    ts.transpile(code, {
      jsx: JsxEmit.React,
      module: ModuleKind.ES2015,
    })
  /**
   * Butch of crutchs before execute :)
   */
  traspiledCode = traspiledCode.split('export default ')[1].trim().slice(0, -1)
  traspiledCode = traspiledCode.replace(/createElement\(/g, 'createElement(FlowScope.')
  traspiledCode = traspiledCode.replace(/dialog\(/g, 'FlowScope.dialog(')
  traspiledCode = traspiledCode.replace(/notify\(/g, 'FlowScope.notify(')
  traspiledCode = traspiledCode.replace(/useTheme\(/g, 'FlowScope.useTheme(')
  traspiledCode = traspiledCode.replace(/useBreakpoints\(/g, 'FlowScope.useBreakpoints(')

  traspiledCode.match(/var \S+/g)?.map((varible) => {
    const varName = varible.split('var ')[1]
    traspiledCode = traspiledCode.replace(new RegExp(`FlowScope.${varName}`, 'g'), varName)
  })
  traspiledCode += '()'

  return (
    <Block h="100%" css={{ position: 'relative' }}>
      <Block
        p="2rem"
        css={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          grid && {
            '&::before': {
              content: "''",
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: theme.color.background.rgb().string(),
              backgroundImage: `
                                linear-gradient(45deg, ${theme.color.surface.rgb().string()} 25%, transparent 25%),
                                linear-gradient(-45deg, ${theme.color.surface.rgb().string()} 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, ${theme.color.surface.rgb().string()} 75%), 
                                linear-gradient(-45deg, transparent 75%, ${theme.color.surface.rgb().string()} 75%)
                            `,
              backgroundSize: '2rem 2rem',
              backgroundPosition: '0 0, 0 1rem, 1rem -1rem, -1rem 0px',
              borderRadius: '0 8px 8px 0',
            },
          },
        ]}
      >
        <span style={{ position: 'relative', display: 'block', height: '100%' }}>
          {/* eslint-disable-next-line */}
          {Function(`"use strict";return (${traspiledCode})`)()}
        </span>
      </Block>
    </Block>
  )
}

export default Preview
