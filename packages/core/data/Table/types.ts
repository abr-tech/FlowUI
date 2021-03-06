import SystemTypes from '@stage-ui/system/types'
import { LayoutDecoration } from '@stage-ui/core/misc/utils/applyLayoutDecoration'
import { MutableRefObject } from 'react'
declare namespace TableTypes {

    type RowMountType =
        /**
         * Render all rows at onec
         */
        'default' |
        /**
         * Render row only when it become visible
         */
        'whenBecomeVisible' |
        /**
         * Render row when it become visible
         * and unmount when row away from screen
         */
        'onlyWhenVisible'

    type TableCellKey = number | string
    type TableSortType = 'ASC' | 'DESC'
    type TableSortAsync = (sortType: TableSortType) => Promise<void>
    type TableSortObject = {
        key: TableCellKey
        sort: TableSortType
    }
    type TablePaginationOptions = {
        pageSize: number
        alwaysVisible?: boolean
    }

    interface TableCellContext<ROW> {
        /**
         * Current cell key
         * @readonly
         */
        key: TableCellKey
        /**
         * Current row index
         * @readonly
         */
        index: number
        /**
         * Current row data
         * @readonly
         */
        row: ROW
        /**
         * Link on column configuration
         * @readonly
         */
        column: TableColumn<ROW> | null
        /**
         * Raw data of cell
         * @readonly
         */
        value?: React.ReactNode | string | number | null
        /**
         * Is current cell in modify mode
         * @readonly
         */
        isModify: boolean
        /**
         * Is current cell in modify mode
         * @readonly
         */
        isCellModify: boolean
        /**
         * Is current row expanded
         * @readonly
         */
        isExpand: boolean
        /**
         * If row visible on screen
         * @readonly
         */
        isVisible: boolean
        /**
         * Set expanded ReactNode below current row
         */
        setExpand: (el: React.ReactNode | null) => boolean
        /**
         * Set modify mode for this cell
         */
        setModify: (modify: boolean, key?: TableCellKey) => boolean
        /**
         * Reload all data in table
         */
        reloadData: () => void
        /**
         * Set row data and reload all data in table
         */
        setRow: (row: ROW) => void
    }

    type TableRowContext<ROW> = {
        /**
         * Row data
         */
        row: ROW
        /**
         * true if element expanded
         * @default false
         */
        isExpand: boolean
        /**
         * true if element visible
         * @default false
         */
        isVisible: boolean
        /**
         * keys of cells that in modify mode
         */
        isCellModify: {
            [key: string]: boolean
        }
        /**
         * Settings cells for modify
         * void 0 - changes all row
         */
        setModifyState: {
            [key: string]: React.Dispatch<React.SetStateAction<boolean>>
        }
        /**
         * Setting expand for row
         */
        setExpandComponent?: React.Dispatch<React.SetStateAction<React.ReactNode>>
        /**
         * Forcing render row
         */
        setNeedDisplay?: (forceUnmount?: boolean) => boolean
    }

    interface Ref<ROW> extends TableRef<ROW>, HTMLTableElement { }

    interface TableRef<ROW> {
        /**
         * Get table current data
         */
        getData: () => ROW[]
        /**
         * Get context for specific cell
         */
        getCellContext: (index: number, key: TableCellKey) => TableCellContext<ROW> | null
        /**
         * Get context for specific row
         */
        getTableRowContext: (index: number) => TableCellContext<ROW> | null
        /**
         * Set expanded ReactNode below row index
         * @returns true if success
         */
        setExpand: (index: number, content: React.ReactNode | null) => boolean
        /**
         * Set modify mode for specific row or cell
         * @returns true if success
         */
        setModify: (modify: boolean, index: number, key?: TableCellKey) => boolean
    }

    interface TableColumn<ROW> {
        /**
         * Unique key of row like id/name or something like that
         */
        key: TableCellKey
        /**
         * Title that will be placed at TableHead
         */
        title?: React.ReactNode
        /**
         * Specific width of column
         */
        width?: number | string
        /**
         * Custom render for a TableCell
         */
        render?: (cellContext: TableCellContext<ROW>, index: number) => React.ReactNode
        /**
         * Enables sorting for a column
         * support ASC | DESC
         */
        sort?: TableSortType | TableSortAsync
        /**
         * Draggable support
         */
        dnd?: (source: number, target: number, data: ROW[]) => void
    }

    interface RowEvents<ROW> {
        /**
         * Calls when ever row clicked
         */
        onRowClick?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
        /**
         * Calls when mouse enters row
         */
        onRowMouseEnter?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
        /**
         * Calls when mouse leaves row
         */
        onRowMouseLeave?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void

        onRowDrag?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
        onRowDragStart?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
        onRowDragEnter?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
        onRowDragLeave?: (rowCtxItem: TableRowContext<ROW>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    }

    interface RowDelegates<ROW> {
        /**
         * Delegate tells to TableRow what size it is.
         * Required when rowMountType not default
         */
        rowHeight?: (rowCtxItem: TableRowContext<ROW>) => number
        /**
         * Delegate tells TableRow render or not
         */
        rowShouldRender?: (rowCtxItem: TableRowContext<ROW>) => boolean
    }

    interface Props<ROW> extends RowEvents<ROW>, RowDelegates<ROW>, Omit<SystemTypes.AllProps<HTMLDivElement, Styles>, 'onChange'> {
        ref?: any
        /**
         * Array of any data objects can be provided
         */
        data: Array<ROW>
        /**
         * Settings of columns
         */
        columns: TableColumn<ROW>[]
        /**
         * Applies decoration on table
         * @default surface
         */
        decoration?: LayoutDecoration
        /**
         * Pagination settings
         */
        pagination?: TablePaginationOptions
        /**
         * React element will be placed at footer
         */
        footer?: React.ReactNode
        /**
         * How Table will render rows. 
         * any type except 'default' requires rowHeight delegate!
         * 
         * default - Render all rows at once. 
         * whenBecomeVisible - Render row only when it become visible. 
         * onlyWhenVisible - Render row when it become visible and unmount when row away from screen. 
         * 
         * @default default
         */
        rowMountType?: RowMountType
        rowDidMount?: (rowCtxItem: TableRowContext<ROW>) => void
        rowDidUnmount?: (rowCtxItem: TableRowContext<ROW>) => void
        /**
         * calls data changed by table
         */
        onChange?: (data: ROW[]) => void
    }

    interface HeadCellProps<ROW> {
        column: TableColumn<ROW>
        styles: SystemTypes.ComponentStyles<Styles>
        toggleSort: (sort: TableSortObject) => Promise<unknown>
    }

    interface CellProps<ROW> {
        rowCtxItem: TableRowContext<ROW>
        column: TableColumn<ROW>
        rowIndex: number
        styles: SystemTypes.ComponentStyles<Styles>
        getCellContext: TableRef<ROW>['getCellContext']
    }

    interface RowProps<ROW> {
        rowCtxItem: TableRowContext<ROW>
        columns: TableColumn<ROW>[]
        rowIndex: number
        styles: SystemTypes.ComponentStyles<Styles>
        getCellContext: TableRef<ROW>['getCellContext']
        events: RowEvents<ROW>
        rowDidMount?: (rowCtxItem: TableRowContext<ROW>) => void
        rowDidUnmount?: (rowCtxItem: TableRowContext<ROW>) => void
        rowMountType?: Props<ROW>['rowMountType']
        enableRenderOptimization: boolean
        delegates: {
            rowHeight?: Props<ROW>['rowHeight']
            rowShouldRender?: Props<ROW>['rowShouldRender']
        }
        dndRender: () => void
    }

    interface FootProps<ROW> {
        rowCtx: TableRowContext<ROW>[]
        columns: TableColumn<ROW>[]
        footerContent?: Props<ROW>['footer']
        pagination?: TablePaginationOptions
        onPageChange: (pageNumber: number) => void
        styles: SystemTypes.ComponentStyles<Styles>
    }

    interface Styles {
        /**
         * Root view
         */
        container: void
        /**
         * Header cell element view <th>
         */
        headCell: {
            sort: boolean
        }
        /**
         * Row view <tr>
         */
        row: {
            dragOver: boolean
        }
        /**
         * Row cell <td>
         */
        rowCell: void
        /**
         * Row cell drag anchor <div>
         */
        rowCellAnchor: void
        /**
         * Expanded row <td span>
         */
        expandContainer: void
        /**
         * Footer view of table
         */
        footer: void
    }
}

export default TableTypes