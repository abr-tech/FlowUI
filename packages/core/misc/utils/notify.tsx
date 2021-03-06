/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Block, Flexbox, Header, Notification, Paragraph } from '@stage-ui/core'
import { Close } from '@stage-ui/core/icons'
import NotificationType from '@stage-ui/core/layout/Notification/types'
import { addElement, removeElement } from '@stage-ui/core/layout/Viewport/MountArea'
import createID from '@stage-ui/system/utils/createID'

export default (options: NotificationType.NotifyOptions) => {
    let timer
    let key = createID()
    if (options.timeout) {
        timer = setTimeout(() => removeElement(key), options.timeout)
    }

    const close = () => {
        clearInterval(timer)
        removeElement(key)
    }

    addElement(
        (
            <Notification {...options}>
                {options.render ? (
                    options.render(close)
                ) : (
                        <Flexbox p="1rem" w={'20rem'}>
                            <Block flex={1} css={{ overflow: 'hidden' }}>
                                <Header m={0} size="s" ellipsis>{options.title}</Header>
                                <Paragraph m={0}>{options.message}</Paragraph>
                            </Block>
                            <Block pl="0.5rem">
                                <Close
                                    size="1.25rem"
                                    alignSelf="flex-end"
                                    color={c => c.light}
                                    onClick={close}
                                />
                            </Block>
                        </Flexbox>
                    )}
            </Notification>
        ),
        key
    )
}