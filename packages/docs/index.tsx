import { Global, jsx } from '@emotion/react'
import { Viewport } from '@stage-ui/core'
import * as defaultThemes from '@stage-ui/core/themes/index'

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Router from './pages/router'

export { default as Menu } from './components/TopBar'
export { default as Sidebar } from './components/TopBar/Menu'

declare global {
  interface Window {
    breakpoints: number[]
    jsx: any
  }
}

// esbuild hack
window.jsx = jsx

window.breakpoints = [960, 768]

const Docs = () => {
  const [theme, setTheme] = useState<Stage.Theme>(defaultThemes.light)

  useEffect(() => {
    localStorage.setItem('current_theme', theme.name.toLowerCase())
  }, [theme])

  return (
    <Viewport theme={theme}>
      <Global
        styles={{
          'html,body,#docs': {
            minHeight: '100vh',
            overscrollBehavior: 'none',
          },
        }}
      />
      <Router theme={theme} defaultThemes={defaultThemes} setTheme={setTheme} />
    </Viewport>
  )
}

ReactDOM.render(<Docs />, document.getElementById('docs'))
