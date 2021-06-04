import { Block, Paragraph, Header } from '@stage-ui/core'
import React from 'react'
import config from './config.raw'
import icons from './icons.raw'
import Syntax from '../../../../components/Page/Content/Syntax'

export const title = 'Bundle'
export const sticky = true

export default () => (
  <Block>
    <Paragraph>
      It is convenient to import components from the StageUI index file, however, this design leads to the fact that all
      components get into the bundle at once. This may lead to its undesirable increase.
    </Paragraph>
    <Syntax code={`import {Button} from '@stage-ui/core'`} />
    <Paragraph>To avoid this please use our babel plugin.</Paragraph>
    <Header>Install</Header>
    <Syntax code="yarn add -D babel-plugin-import" />
    <Header>Configure</Header>
    <Syntax code={config} />
    <Header>Сaveat</Header>
    <Paragraph>
      Avoid imports all icons with * syntax. Plugin can't transform this construction and all icons will be packed in
      bundle. It's about 300kb.
    </Paragraph>
    <Syntax code={icons} />
  </Block>
)
