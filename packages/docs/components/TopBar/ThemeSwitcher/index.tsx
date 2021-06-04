import { Block, Drop, Flexbox, Grid, Popover } from '@stage-ui/core'
import { ColorPalette } from '@stage-ui/icons'
import React, { useRef, useState } from 'react'

export interface ThemeSwitcherProps {
  themes: Record<string, Stage.Theme>
  currentTheme: Stage.Theme
  setTheme: (theme: Stage.Theme) => void
}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { themes, currentTheme, setTheme } = props
  const [visible, setVisible] = useState(false)
  const iconRef = useRef(null)

  return (
    <>
      <ColorPalette
        style={{ display: 'block' }}
        size="1.5rem"
        ref={iconRef}
        onClick={() => setVisible(!visible)}
        color={(c) => c.primary}
      />
      <Drop target={iconRef} visible={visible} spacing={16} onClickOutside={(e, ot) => ot && setVisible(!visible)}>
        <Popover>
          <Grid templateRows="auto auto" templateColumns="auto auto" gap=".5rem" p=".25rem">
            {Object.keys(props.themes).map((theme, index) => (
              <Flexbox
                key={`theme${index}`}
                h="2rem"
                w="2rem"
                css={{
                  cursor: 'pointer',
                  borderRadius: '16rem',
                  position: 'relative',
                }}
                borderWidth="2px"
                borderStyle="solid"
                borderColor={(c) => (currentTheme.name === themes[theme].name ? c.primary : c.lightest)}
                onClick={() => {
                  setTheme(themes[theme])
                }}
              >
                <Block
                  flex={1}
                  css={{
                    borderTopLeftRadius: '16rem',
                    borderBottomLeftRadius: '16rem',
                    background: themes[theme].color.primary.rgb().string(),
                  }}
                />
                <Block
                  flex={1}
                  css={{
                    borderTopRightRadius: '16rem',
                    borderBottomRightRadius: '16rem',
                    background: themes[theme].color.background.rgb().string(),
                  }}
                />
              </Flexbox>
            ))}
          </Grid>
        </Popover>
      </Drop>
    </>
  )
}

export default ThemeSwitcher
