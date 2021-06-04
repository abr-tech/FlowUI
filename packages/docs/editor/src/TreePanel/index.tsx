/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Block, Divider, Flexbox, Menu, ScrollView, useTheme } from '@stage-ui/core'
import { Browser, Layers, Plus } from '@stage-ui/icons'

import { useState } from 'react'
import { context } from '../..'
import { default as LayersTab, default as PagesTab } from './layers'
import createStyles, { StyleTypes } from './styles'

export type TabProps = {
  theme: Stage.Theme
  styles: StyleTypes
}

type TabValues = 'layers' | 'pages'

const tabs = []

const ComponentTree = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [tab, setTab] = useState<TabValues>('layers')

  const toolBarActions = {
    onTabChange: (tab: TabValues) => setTab(tab),
  }

  return (
    <Block css={styles.container} backgroundColor={(c) => c.surface} borderColor={(c) => c.lightest}>
      <Flexbox justifyContent="space-between" alignItems="center" my=".5rem">
        <Menu direction="row" size="s" ml="0.5rem" decoration="color" value={tab} onChange={toolBarActions.onTabChange}>
          <Menu.Item value="layers" title="Layers" leftChild={<Layers />} />
          <Menu.Item value="pages" title="Pages" leftChild={<Browser />} />
        </Menu>
        <Plus
          mr="1rem"
          onClick={() => {
            context.tools.componentLibraryShow()
          }}
        />
      </Flexbox>
      <Divider w="unset" />
      <ScrollView size="xs" css={styles.scrollView}>
        <Block css={styles.scrollContainer}>
          {tab === 'pages' && <PagesTab theme={theme} styles={styles} />}
          {!tab || (tab === 'layers' && <LayersTab theme={theme} styles={styles} />)}
        </Block>
      </ScrollView>
    </Block>
  )
}
export default ComponentTree
