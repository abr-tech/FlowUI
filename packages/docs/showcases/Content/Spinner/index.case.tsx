import basic from './basic.raw'
import another from './another.raw'

export const title = 'Spinner'
export const glyph = require(`./Spinner.svg`)
export const ns = 'SpinnerTypes'
export const cases = [
  { label: 'Basic', basic },
  { label: 'Spin anything', code: another },
]