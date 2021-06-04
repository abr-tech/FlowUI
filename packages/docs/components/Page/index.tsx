import { Block, Flexbox, Header, Paragraph, ScrollView } from '@stage-ui/core'
import React from 'react'
import { Config, PagesType, PageType } from '../../utils/core'
import TopBar from '../TopBar'
import Editor from './Editor'
import Types from './Types'

interface ContentProps {
  data: PageType
  pages: PagesType
  config: Config
  path: string
  setPath: React.Dispatch<React.SetStateAction<string>>
  theme: Stage.Theme
  themes: Record<string, Stage.Theme>
  setTheme: React.Dispatch<React.SetStateAction<Stage.Theme>>
}

const Page: React.FC<ContentProps> = (props) => {
  const { data, pages, config, setTheme, themes, theme, setPath } = props

  return (
    <>
      <Flexbox h="100vh" css={{ boxSizing: 'border-box', overflow: 'hidden' }}>
        <ScrollView h="100vh" w="100%" backgroundColor="surface">
          <TopBar
            title={config.name}
            setIndex={() => setPath('/')}
            themes={themes}
            currentTheme={theme}
            setTheme={setTheme}
            git={config.git}
            currentPage={data}
            pages={pages}
            onChange={(pageURL) => setPath(pageURL)}
          />
          <Flexbox flex={1} p={['3rem 4rem 1.5rem 4rem', '3rem 4rem 1.5rem 4rem', '1rem']} justifyContent="center">
            <Block
              css={{
                width: '100%',
                maxWidth: '64rem',
                overflow: 'hidden',
              }}
            >
              <Flexbox column alignItems="center">
                {data.title && (
                  <Block
                    style={{
                      width: '100%',
                      maxWidth: data.cases === void 0 ? '45rem' : '100%',
                    }}
                  >
                    <Header my={0} size="xl" weight={800}>
                      {data.title}
                    </Header>
                    {data.subtitle && <Paragraph weight={500}>{data.subtitle}</Paragraph>}
                  </Block>
                )}
                {data.cases && <Editor cases={data.cases} />}
                {data.default && (
                  <Block
                    style={{
                      width: '100%',
                      maxWidth: '45rem',
                    }}
                  >
                    <data.default />
                  </Block>
                )}
              </Flexbox>
              {data.ns && <Types nameSpace={data.ns} config={config} shrink={data.cases === void 0} />}
            </Block>
          </Flexbox>
        </ScrollView>
      </Flexbox>
    </>
  )
}

export default Page
