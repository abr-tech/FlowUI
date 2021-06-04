import { Flexbox, Link, useTheme } from '@stage-ui/core'
import { panel } from '@stage-ui/docs/components/Themer/src/ThemeConfigurator'
import { Brush, Github } from '@stage-ui/icons'
import React from 'react'
import { PagesType, PageType } from '../../utils/core'
import TopBarLogo from './Logo'
import TopBarMenu from './Menu'
import ThemeSwitcher, { ThemeSwitcherProps } from './ThemeSwitcher'

export interface TopBarProps extends ThemeSwitcherProps {
  title?: string
  setIndex: () => void
  git?: string

  pages: PagesType
  currentPage: PageType
  onChange: (pageId: string) => void
}

const TopBar = (props: TopBarProps) => {
  const { git, pages, currentPage, onChange, themes, currentTheme, setTheme, ...logoProps } = props
  const theme = useTheme()

  return (
    <Flexbox
      px="1.5rem"
      h="3rem"
      justifyContent="space-around"
      alignItems="center"
      decoration="minorShadow"
      mb="m"
      borderRadius={0}
    >
      <TopBarLogo {...logoProps} />
      <TopBarMenu pages={pages} currentPage={currentPage} onChange={onChange} />
      <Flexbox flex={1} justifyContent="flex-end">
        <ThemeSwitcher themes={themes} currentTheme={currentTheme} setTheme={setTheme} />
        <Brush
          onClick={() => {
            panel(theme, setTheme, {
              boxShadow: '0 -2rem 10rem rgba(0,0,0,0.2)',
              border: 0,
            })
          }}
          style={{ display: 'block' }}
          size="1.5rem"
          ml="1rem"
          color={(c) => c.primary}
        />
        {git && (
          <Link target="_blank" href={git} ml="1rem">
            <Github size="1.5rem" />
          </Link>
        )}
      </Flexbox>
    </Flexbox>
  )
}

export default TopBar
