import WhaleTypes from '@flow-ui/whale/types'
import Types from './types'

const styles: WhaleTypes.CreateStyles<Types.Overrides, Types.Props> = (props, theme) => {

    const attachTheme = {
        background: theme.color.background.rgb().string(),
        color: theme.color.onBackground.rgb().string(),
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        'p': theme.typography.paragraph,
        'h1': theme.typography.header.l,
        'h2': theme.typography.header.m,
        'h3': theme.typography.header.s,
        'h4': theme.typography.header.xs,
        ...theme.typography.text.m 
    }

    const reset = 
        `
            html, body, div, span, applet, object, iframe,
            blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                vertical-align: baseline;
            },
            * {
                padding: 0;
                margin: 0;
            }
            ::-webkit-scrollbar {
                display: none
            }
        `

    return {
        container: [
            reset,
            props.wrapper 
                ? attachTheme
                : { 'html': attachTheme },
            props.global
        ]
    }
}

export default styles