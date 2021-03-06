import { Paragraph } from '@stage-ui/core'
import { Fragment } from 'react'
import { TabProps } from '..'
import { context } from '../../..'
import React from 'react'

const PagesTab = (props: TabProps) => {
    return (
        <Fragment>
            {
                context.tools.getItems().length === 0 && (
                    <Paragraph
                        align="center"
                        pt="2rem"
                        color={c => c.light}
                        children="Pages"
                    />
                )
            }
        </Fragment>
    )
}

export default PagesTab