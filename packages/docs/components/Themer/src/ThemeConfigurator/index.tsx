/** @jsx jsx */
import { jsx } from '@emotion/react'
import {
  Block,
  Button,
  dialog,
  Divider,
  Flexbox,
  Grid,
  Header,
  Paragraph,
  Switch,
  Tree,
  useTheme,
} from '@stage-ui/core'
import { CodeDownload, Plus } from '@stage-ui/icons'

import mergeObjects from '@stage-ui/system/utils/mergeObjects'
import React, { CSSProperties, useEffect, useState } from 'react'
import ColorPick from './ColorPick'
import NewColorDialog from './NewColorDialog'
import ThemeStorage from './utils/storage'
import themeExport from './utils/themeExport'

const MAIN_COLORS = [
  ['BACKGROUND', 'background'],
  ['SURFACE', 'surface'],
  ['PRIMARY', 'primary'],
  ['SECONDARY', 'secondary'],
  ['VARIANT', 'backgroundVariant'],
  ['VARIANT', 'surfaceVariant'],
  ['PRIMARY TEXT', 'onPrimary'],
  ['SECONDARY TEXT', 'onSecondary'],
  ['BACKGROUND TEXT', 'onBackground'],
  ['SURFACE TEXT', 'onSurface'],
]
const GRAYSCALES = [
  ['LIGHTEST', 'lightest'],
  ['LIGHT', 'light'],
  ['HARD', 'hard'],
  ['HARDEST', 'hardest'],
]

type AssetItem = {
  label: any
  children?: AssetItem[]
}

interface ThemeConfiguratorProps {
  original: Stage.Theme
  updateTheme: React.Dispatch<React.SetStateAction<Stage.Theme>>
}

const ThemeConfigurator = (props: ThemeConfiguratorProps) => {
  const [updateIdx, forceUpdate] = useState(1)
  let theme = useTheme()
  const { original, updateTheme } = props

  const [testflight, setTestflight] = useState(ThemeStorage.test())

  const patch = ThemeStorage.load()

  if (patch) {
    theme = theme.replace(patch)
  }

  useEffect(() => {
    if (testflight) {
      if (patch) {
        updateTheme(theme)
      }
    } else {
      updateTheme(original)
    }
  }, [testflight])

  const colorChange = (key: string, color: number[], palette = false, deleteKey?: string) => {
    let patch: SystemTypes.ReplaceTheme = ThemeStorage.load() || {
      main: {},
    }

    if (palette === false) {
      patch = mergeObjects(patch, {
        main: {
          color: {
            [key]: color,
          },
        },
      }) as SystemTypes.ReplaceTheme
    }

    if (palette === true) {
      if (deleteKey) {
        if (patch.main.color && patch.main.color.palette?.[deleteKey]) {
          delete patch.main.color.palette[deleteKey]
        }
        if (theme.color.palette?.[deleteKey]) {
          delete theme.color.palette[deleteKey]
        }
      }

      if (color.length) {
        patch = mergeObjects(patch, {
          main: {
            color: {
              palette: {
                [key]: color,
              },
            },
          },
        }) as SystemTypes.ReplaceTheme
      }
    }

    ThemeStorage.save(patch)

    forceUpdate(updateIdx * -1)
    if (testflight) {
      updateTheme(theme.replace(patch))
    }
  }

  const AssetsRender = (items?: AssetItem[]) =>
    items &&
    items.map((i, index) => (
      <Tree key={index} label={i.label}>
        {AssetsRender(i.children)}
      </Tree>
    ))

  return (
    <Block>
      <Flexbox alignItems="center" justifyContent="space-between">
        <Block css={{ letterSpacing: '0.125rem' }}>
          <Header m={0}>Light</Header>
          <Paragraph size="xs" m={0} textColor="hard">
            theme
          </Paragraph>
        </Block>
        <Flexbox>
          <Switch
            label="Testflight"
            checked={testflight}
            onChange={() => {
              setTestflight(!testflight)
              ThemeStorage.test(!testflight)
            }}
            styles={{
              label: () => [
                {
                  fontSize: '0.75rem',
                  letterSpacing: '0.125rem',
                  color: theme.color.light.rgb().string(),
                },
              ],
            }}
          />
          {/* <Divider vertical mx="1rem" />
                    <Button
                        size="s"
                        color="warning"
                        rightChild={<Refresh />}
                        decoration="text"
                        children="Reset"
                        onClick={() => {
                            ThemeStorage.save({ main: {} })
                            forceUpdate(updateIdx * -1)
                            if (testflight) {
                                setTestflight(false)
                                updateTheme(theme.replace({ main: {} }))
                            }
                        }}
                    /> */}
          <Divider vertical mx="1rem" />
          <Button
            size="s"
            rightChild={<CodeDownload />}
            decoration="text"
            children="Export TS"
            onClick={() => {
              themeExport(theme)
            }}
          />
        </Flexbox>
      </Flexbox>
      {/**
       *
       * MAIN COLORS
       *
       */}
      <Divider gap="4px" my="1rem" />
      <Header size="s" fontSize="0.625rem" color="light">
        MAIN COLOR
      </Header>
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap="1rem">
        {MAIN_COLORS.map((mc) => (
          <ColorPick
            key={mc[1]}
            title={mc[0]}
            subtitle={mc[1]}
            color={theme.color[mc[1]]}
            onChange={(color) => colorChange(mc[1], color)}
          />
        ))}
      </Grid>
      {/**
       *
       * GRAYSCALES
       *
       */}
      <Divider gap="4px" my="1rem" />
      <Header size="s" fontSize="0.625rem" color="light">
        GRAYSCALES
      </Header>
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap="1rem">
        {GRAYSCALES.map((mc) => (
          <ColorPick
            key={mc[1]}
            title={mc[0]}
            subtitle={mc[1]}
            color={theme.color[mc[1]]}
            onChange={(color) => colorChange(mc[1], color)}
          />
        ))}
      </Grid>
      {/**
       *
       * PALETTE
       *
       */}
      <Divider gap="4px" my="1rem" />
      <Flexbox alignItems="center">
        <Header size="s" fontSize="0.625rem" color="light">
          PALETTE
        </Header>
        <Plus
          size="s"
          ml="0.5rem"
          p={0}
          shape="circle"
          backgroundColor="primary"
          color="surface"
          onClick={() => {
            dialog({
              hideHeader: true,
              render: (close) => (
                <NewColorDialog
                  palettKeys={Object.keys(theme.color.palette)}
                  close={close}
                  onColorChosen={(name, color) => {
                    colorChange(name, color, true)
                  }}
                />
              ),
            })
          }}
        />
      </Flexbox>
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap="1rem">
        {Object.keys(theme.color.palette).map((key) => (
          <ColorPick
            key={key}
            title={key.toUpperCase()}
            subtitle={key}
            color={theme.color.palette[key]}
            onChange={(_) => void 0}
            onClick={() => {
              dialog({
                hideHeader: true,
                render: (close) => (
                  <NewColorDialog
                    edit={{
                      name: key,
                      color: theme.color.palette?.[key],
                    }}
                    palettKeys={Object.keys(theme.color.palette)}
                    close={close}
                    onColorChosen={(name, color, deleteKey) => {
                      /**
                       * When equils true causes
                       * issue with deleting
                       */
                      setTestflight(false)
                      colorChange(name, color, true, deleteKey)
                    }}
                  />
                ),
              })
            }}
          />
        ))}
      </Grid>
      <Divider gap="4px" my="1rem" />
      <Flexbox alignItems="flex-start">
        <Header size="s" fontSize="0.625rem" color="light">
          ASSETS
        </Header>
        {AssetsRender([
          {
            label: '',
            children: [
              {
                label: 'Border',
                children: [
                  {
                    label: <Button>Edit CSS</Button>,
                  },
                ],
              },
              {
                label: 'Typography',
                children: [
                  {
                    label: 'Header',
                    children: [
                      {
                        label: 'Extra Small',
                        children: [{ label: <Button>Edit CSS</Button> }],
                      },
                      {
                        label: 'Small',
                        children: [{ label: <Button>Edit CSS</Button> }],
                      },
                      {
                        label: 'Medium Small',
                        children: [{ label: <Button>Edit CSS</Button> }],
                      },
                      {
                        label: 'Large',
                        children: [{ label: <Button>Edit CSS</Button> }],
                      },
                      {
                        label: 'Extra Large',
                        children: [{ label: <Button>Edit CSS</Button> }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ])}
      </Flexbox>
    </Block>
  )
}

export default ThemeConfigurator
export const panel = (
  original: ThemeConfiguratorProps['original'],
  updateTheme: ThemeConfiguratorProps['updateTheme'],
  css?: CSSProperties,
) =>
  dialog({
    decoration: 'panel',
    hideHeader: true,
    styles: {
      window: (variant) =>
        variant({
          decoration: {
            panel: {
              marginTop: '50vh',
              ...css,
            },
          },
        }),
    },
    render: (close) => <ThemeConfigurator original={original} updateTheme={updateTheme} />,
  })
