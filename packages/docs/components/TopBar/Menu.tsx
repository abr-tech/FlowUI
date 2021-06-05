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
          <Flexbox p="m" decoration="minorShadow">
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
              >
                <Flexbox flex={1} alignItems="center" column m="s">
                  <Flexbox
                    w="3rem"
                    h="3rem"
                    css={{
                      background: `url(${require(`./glyphs/${item.title}.svg`)}) no-repeat`,
                      backgroundSize: 'contain',
                    }}
                  />
                  <Text display="block" size="m" m={0} weight={500} color="onSurface">
                    {item.title}
                  </Text>
                  {/* <Text mt="xs" size="xs" color="light" capitalize css={{ whiteSpace: 'initial' }}>
                    {item.subtitle}
                  </Text> */}
                </Flexbox>
              </Button>
            ))}
          </Flexbox>
        )}
      </Drop>
    </>
  )
}

export default TopBarMenu
