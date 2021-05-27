/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useSystem } from '@stage-ui/system'
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './styles'
import TableFoot from './TableFoot'
import TableHeadCell from './TableHeadCell'
import TableRow from './TableRow'
import Types from './types'

function Table<ROW>(props: Types.Props<ROW>, ref: Types.TableRef<ROW>) {

// const Table: ForwardRefRenderFunction<Types.TableRef, Types.Props> = (props, ref) => {

    const tableRef = useRef<HTMLTableElement>(null)
    const { classes, attributes, events } = useSystem('Table', { props, styles, styleProps: { container: ['all'] } })
    const { columns, pagination, footer } = props
    const [currentPage, setCurrentPage] = useState(1)
    const [reloadData, reload] = useState(false)
    const [sort, setSort] = useState<Types.TableSortObject>({
        key: '',
        sort: 'ASC'
    })

    //@ts-ignore
    let rowCtx: Types.TableRowContext<ROW>[] = props.data.map(row => {
        const isCellModify: Types.TableRowContext<ROW>['isCellModify'] = {}
        columns.forEach(column => {
            isCellModify[column.key] = false
        })
        return {
            row,
            isExpand: false,
            isVisible: true,
            isCellModify,
            setModifyState: {}
        }
    })

    const columnSort = (column: Types.TableColumn<ROW>) => {
        if (column.sort) {
            rowCtx = rowCtx.sort((a, b) => {
                if (column.sort === 'ASC') {
                    if (typeof a.row[column.key] === 'string') {
                        return a.row[column.key].localeCompare(b.row[column.key])
                    } else {
                        return a.row[column.key] - b.row[column.key]
                    }
                } else {
                    if (typeof b.row[column.key] === 'string') {
                        return b.row[column.key].localeCompare(a.row[column.key])
                    } else {
                        return b.row[column.key] - a.row[column.key]
                    }
                }
            })
        }
    }

    //@ts-ignore
    const getCellContext: Types.TableRef<ROW>['getCellContext'] = (index, key) => {

        if (!rowCtx[index]?.row) {
            return null
        }

        return {
            key,
            index: index,
            row: rowCtx[index].row,
            column: columns.find(column => column.key === key) || null,
            value: rowCtx[index].row[key],
            isExpand: rowCtx[index].isExpand,
            isModify: rowCtx[index].isCellModify[key],
            isVisible: rowCtx[index].isVisible,
            setExpand: (content) => setExpand(index, content),
            setModify: (modify, kkey = key) => setModify(modify, index, kkey),
            reloadData: () => reload(!reloadData),
            setRow: (row) => {               
                for (key in rowCtx[index].row) {
                    rowCtx[index].row[key] = row[key]
                }
                reload(!reloadData)
            }
        }
    }

    const setExpand: Types.TableRef<ROW>['setExpand'] = (index, content) => {
        if (rowCtx[index]) {
            rowCtx[index].setExpandComponent?.(content)
            return true
        }
        return false
    }

    const setModify: Types.TableRef<ROW>['setModify'] = (modify, index, key) => {
        if (rowCtx[index]) {
            if (key !== undefined) {
                //@ts-ignore
                if (rowCtx[index].row.hasOwnProperty(key)) {
                    rowCtx[index].setModifyState[key]?.(modify)
                    return true
                }
            }
            Object.keys(rowCtx[index].isCellModify).forEach(key => {
                rowCtx[index].setModifyState[key]?.(modify)
            })
            return true
        }
        return false
    }

    /**
     * Handle refs
     */
    //@ts-ignore
    useImperativeHandle(ref, () => ({
        getCellContext,
        setExpand,
        setModify,
        ...tableRef.current
    }))

    /**
     * Sorting data
     */
    if (sort.key) {
        const sortColumn = columns.find(column => column.key === sort.key)
        if (sortColumn) {
            //@ts-ignore
            columnSort({
                ...sortColumn,
                ...sort
            })
        }
    } else {
        for (const column of columns) {
            //@ts-ignore
            columnSort(column)
        }
    }

    const setNeedDisplay = () => {
        let state = 1
        for (let rowCtxItem of rowCtx) {
            const didRender = rowCtxItem.setNeedDisplay?.(state === 3)
            if (didRender) {
                state = 2
            } else {
                if (state === 2) state = 3
            }
        }
    }

    const enableRenderOptimization = props.rowMountType?.match('Visible') ? true : false

    useEffect(() => {
        /**
         * Handle optimized method of render
         */
        if (enableRenderOptimization) {
            setNeedDisplay()
            document.addEventListener('resize', setNeedDisplay)
            document.addEventListener('scroll', setNeedDisplay)
            document.addEventListener('onflowscroll', setNeedDisplay)
            return () => {
                document.removeEventListener('resize', setNeedDisplay)
                document.removeEventListener('scroll', setNeedDisplay)
                document.removeEventListener('onflowscroll', setNeedDisplay)
            }
        }
        return
    }, [])

    /**
     * Render Data
     */
    return (
        <table {...attributes} {...events} ref={tableRef} css={classes.container}>
            <thead>
                <tr
                    children={
                        columns.map((column, colIndex) => (
                            <TableHeadCell
                                key={colIndex}
                                styles={classes}
                                column={column}
                                setSort={setSort}
                            />
                        ))
                    }
                />
            </thead>
            <tbody
                children={
                    rowCtx.map((rowCtxItem, rowIndex) => {
                        if (pagination) {
                            const { pageSize } = pagination
                            const startIndex = pageSize * (currentPage - 1)
                            if (startIndex > rowIndex || rowIndex >= currentPage * pageSize) {
                                return null
                            }

                        }
                        /**
                         * Row events map
                         */
                        const events: Types.RowEvents<ROW> = {
                        }
                        /**
                         * We'll call onRow*Event* at on*Event*
                         * with injected rowIndex.
                         */
                        Object.keys(props).forEach(key => {
                            if (key.match('onRow')) {
                                events[key.replace('Row', '')] = (e: MouseEvent) => {
                                    return props[key](rowCtxItem, e)
                                }
                            }
                        })

                        return (
                            <TableRow
                                rowCtxItem={rowCtxItem}
                                getCellContext={getCellContext}
                                rowDidMount={props.rowDidMount}
                                rowDidUnmount={props.rowDidUnmount}
                                styles={classes}
                                key={rowIndex}
                                columns={columns}
                                rowIndex={rowIndex}
                                events={events}
                                rowMountType={props.rowMountType}
                                enableRenderOptimization={enableRenderOptimization}
                                delegates={{
                                    rowHeight: props.rowHeight,
                                    rowShouldRender: props.rowShouldRender,
                                }}
                            />
                        )
                    })
                }
            />
            <TableFoot
                rowCtx={rowCtx}
                styles={classes}
                footerContent={footer}
                columns={columns}
                pagination={pagination}
                onPageChange={setCurrentPage}
            />
        </table>
    )
}

export default forwardRef(Table as any) as <ROW>(props: Types.Props<ROW>, ref: Types.TableRef<ROW>) => React.ReactElement