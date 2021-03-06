import SystemTypes from '@stage-ui/system/types'

declare namespace MenuGroupTypes {
    interface Props extends Omit<SystemTypes.AllProps<HTMLDivElement, Styles>, 'onChange'> {
        /**
         * Title of group
         */
        title: React.ReactNode
        children?: React.ReactNode
        /**
         * Left child at group view
         */
        leftChild?: React.ReactNode
        /**
         * Right child at group view
         */
        rightChild?: React.ReactNode
    }

    interface Styles {
        /**
         * Group view
         */
        container: void
    }
}

export default MenuGroupTypes