import colorResolver from '@stage-ui/system/props/color'
import sizeResolver from '@stage-ui/system/props/size'
import { CreateClasses } from '@stage-ui/system/hooks/useSystem'
import breakpointResolver from '@stage-ui/system/props/breakpoint'
import Types from './types'

const createClasses: CreateClasses<Types.Styles, Types.PrivateProps> = (theme, props, styleProps) => {
  return {
    container: [
      props.ellipsis && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
      },
      breakpointResolver(props.size, theme, (currentValue) =>
        sizeResolver(currentValue || 'm', theme.assets.typography[props.sizesOf], (value) => ({
          fontSize: value,
          lineHeight: 1.5,
        })),
      ),
      breakpointResolver(props.lineHeight, theme, (currentValue) => ({ lineHeight: currentValue })),
      breakpointResolver(props.weight, theme, (currentValue) => ({ fontWeight: currentValue })),
      breakpointResolver(props.transform, theme, (currentValue) => ({ textTransform: currentValue })),
      breakpointResolver(props.align, theme, (currentValue) => ({ textAlign: currentValue })),
      breakpointResolver(props.color, theme, (currentValue) => ({ color: colorResolver(currentValue, theme)?.hex() })),
      breakpointResolver(props.backgroundColor, theme, (currentValue) => ({
        background: colorResolver(currentValue, theme)?.hex(),
      })),
      styleProps.all,
    ],
  }
}

export default createClasses