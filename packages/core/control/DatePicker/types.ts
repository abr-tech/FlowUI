import SystemTypes from '@stage-ui/system/types'
import { Moment } from 'moment'
import FieldTypes from '../../misc/hocs/Field/types'
import CalendarTypes from '@stage-ui/core/control/Calendar/types'

declare namespace DatePickerTypes {

    interface Props extends Omit<FieldTypes.Props, 'onChange'>, InputProps {
        /**
         * Type for DatePicker
         * @default day
         */
        type?: CalendarTypes.GridType
        /**
         * Property value could be a string
         * if you pass format property aswell
         * otherwise value should be instance of Date
         */
        value?: Moment | Date | string
        defaultValue?: Moment | Date | string
        /**
         * Format moment YYYY-MM-DD 
         * @default YYYY-MM-DD
         */
        format?: string
        /**
         * Min datetime that could be selected
         */
        minValue?: Moment | Date | string
        /**
         * Max datetime that could be selected
         */
        maxValue?: Moment | Date | string
        /**
         * Callback function will with Date object
         * or string if format property was passed.
         */
        onChange?: (moment: Moment, value: string) => void
        /**
         * Do not close datepicker on change
         * latest value
         */
        stayOpen?: boolean
        /**
         * Enable mask input
         */
        masked?: boolean
        /**
         * @default ru
         */
        locale?: CalendarTypes.Locale
        /**
         * Hide today button
         */
        hideToday?: boolean
    }

    interface InputProps {
        autoComplete?: string
        autoFocus?: boolean
        list?: string
        name?: string
        placeholder?: string
        pattern?: string
        readOnly?: boolean
        required?: boolean

        form?: string
        formAction?: string
        formEncType?: string
        formMethod?: string
        formNoValidate?: boolean
        formTarget?: string
    }

    interface Styles extends FieldTypes.Styles {
        /**
         * Drop view
         */
        drop: {
            isActive: boolean
        }
        /**
         * Input view
         */
        input: void
    }
}

export default DatePickerTypes