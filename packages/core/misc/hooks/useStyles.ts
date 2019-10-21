import Global from "../../types";
import {css} from "@emotion/core";
import useFlow from "./useFlow";
import ThemeTypes from "../themes/types";

const createStyles = <S>(
        props, 
        componentStyles: Global.ComponentStyles<S>, 
        componentName?: keyof ThemeTypes.Overrides
    ): Global.FlowStyles<S> => {
    
    const { theme } = useFlow();
    let FlowStyles: Global.FlowStyles<S> = {} as any;

    if (typeof componentStyles === 'function') {
        componentStyles = componentStyles(props,theme)
    }

    const overrideStyles =
        componentName && 
        theme.overrides[componentName] && 
        createStyles(props, theme.overrides[componentName] as Global.ComponentStyles<string>)

    Object.keys(componentStyles).map(styleName => {

        if (typeof componentStyles[styleName] === 'function') {
            FlowStyles[styleName] = (state) => {

                const variant = (varaints) => {
                    let variantStyles: any = {};
                        for (const variantName of Object.keys(varaints)) {
                            const variantValue = state[variantName];
            
                            if (typeof variantValue === 'string') {
                                variantStyles = varaints[variantName][variantValue]
                            }
                            
                            if (typeof variantValue === 'boolean' && variantValue === true) {
                                variantStyles = varaints[variantName]
                            }

                            if (!Object.keys(state).includes(variantName)) {
                                console.warn(`Can't find value of "${variantName}" variant in "${styleName}" style. Function has been called with:`, state)
                            }
                            
                            return variantStyles
                        }
                    return variantStyles
                }
                
                if (overrideStyles && overrideStyles[styleName]) {
                    return css([componentStyles[styleName](variant), overrideStyles[styleName](state)])
                }

                return componentStyles[styleName](variant)
            }
        } else {
            FlowStyles[styleName] = overrideStyles && overrideStyles[styleName]
                ? css([componentStyles[styleName], overrideStyles[styleName]])
                : componentStyles[styleName]
        }     
    })
    
    return FlowStyles
}

export default createStyles