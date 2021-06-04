import { Button, Drop, Flexbox, Grid, Header, Text } from '@stage-ui/core'
import DropTypes from '@stage-ui/core/components/layout/Drop/types'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { PagesType, PageType } from '../../utils/core'

export interface TopBarMenuProps {
  pages: PagesType
  currentPage: PageType
  onChange: (pageId: string) => void
}

const TopBarMenu = (props: TopBarMenuProps) => {
  const { pages } = props

  const initialRefs = Object.keys(pages).map(() => createRef<HTMLButtonElement>())
  const buttonsRef = useRef(initialRefs)
  const dropRef = useRef<DropTypes.Ref>(null)

  const [section, setSection] = useState<string>('')

  const sections = Object.keys(pages)
    .map((sectionName, i) => (
      <Button
        id={`mb-${sectionName}`}
        key={sectionName}
        ref={buttonsRef.current[i]}
        flex={1}
        decoration={section === sectionName ? 'filled' : 'text'}
        onClick={() => setSection(!section || section !== sectionName ? sectionName : '')}
      >
        <Text weight={700}>{sectionName}</Text>
      </Button>
    ))
    .slice(1)

  useEffect(() => {
    dropRef.current?.updatePosition()
  }, [section])

  return (
    <>
      <Flexbox flexBasis="64rem" mx="l">
        {sections}
      </Flexbox>
      <Drop
        ref={dropRef}
        target={buttonsRef.current.find((c) => c.current?.id === `mb-${section}`)}
        visible={!!section}
        align="bottom"
        justify={(() => {
          const i = Object.keys(pages).indexOf(section)
          if (i < 4) return 'start'
          if (i > 6) return 'end'
          return 'center'
        })()}
        spacing={12}
        animation={{
          type: 'slide',
          reverse: true,
        }}
      >
        {!!section && (
          <Grid
            p="m"
            decoration="minorShadow"
            gap="1rem"
            templateColumns={`repeat(${pages[section].length > 2 ? 3 : 2}, 1fr)`}
          >
            {pages[section].map((item) => (
              <Button
                key={item.id}
                textAlign="left"
                flex={1}
                decoration="text"
                onClick={() => {
                  props.onChange(item.url)
                  setSection('')
                }}
                p="s"
                w="15rem"
              >
                <Flexbox flex={1} alignItems="flex-start" column h="100%">
                  <Header size="xs" m={0} color="primary" weight={700}>
                    {item.title}
                  </Header>
                  <Text mt="xs" size="xs" color="light" capitalize css={{ whiteSpace: 'initial' }}>
                    {item.subtitle}
                  </Text>
                </Flexbox>
              </Button>
            ))}
          </Grid>
        )}
      </Drop>
    </>
  )
}

export default TopBarMenu
