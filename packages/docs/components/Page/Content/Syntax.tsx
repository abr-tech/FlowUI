import { useTheme } from '@stage-ui/core'
import React from 'react'
import { Prism } from 'react-syntax-highlighter'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark'

const Syntax = (props: { code?: (() => JSX.Element) | string; children?: string }) => {
  const theme = useTheme()
  const isDark = !!/DARK/.exec(theme.name.toUpperCase())
  const style = isDark ? dark : light

  const styles = {
    padding: '1rem',
    fontSize: theme.assets.typography.text.s.fontSize,
    borderRadius: theme.radius.m,
    background: theme.color.background,
  }

  return (
    <Prism language="typescript" style={style} customStyle={styles}>
      {props.children || props.code}
    </Prism>
  )
}

export default Syntax
