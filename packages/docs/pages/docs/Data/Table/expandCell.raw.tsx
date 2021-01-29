import { Flexbox, Table, Text } from '@stage-ui/core'
import { ArrowIosDownward } from '@stage-ui/core/icons'
import React from 'react'

export default () => {
    const ExpandCell = (props: { ctx }) => {

        return (
            <Flexbox alignItems="center" onClick={() => {
                if (props.ctx.isExpand) {
                    props.ctx.setExpand(null)
                } else {
                    props.ctx.setExpand(
                        <Text>Any ReactNode here.</Text>
                    )
                }
            }}>
                <ArrowIosDownward
                    mr="0.5rem"
                    color={c => c.primary}
                    rotate={props.ctx.isExpand ? 180 : 0}
                />
                <Text>{props.ctx.value}</Text>
            </Flexbox>
        )
    }

    return (
        <Table
            columns={[
                {
                    title: 'Fullname', key: 'name', render: ctx => (
                        <ExpandCell ctx={ctx} />
                    )
                },
                { title: 'Age', key: 'age', width: 120 },
            ]}
            data={[
                { name: 'Matt', age: 25 },
                { name: 'John', age: 29 },
                { name: 'Kate', age: 26 },
            ]}
        />
    )
}