import React, { FC, forwardRef, RefObject } from 'react';
import Icon from '../../content/Icon';
import Block from '../../layout/Block';
import Check from '../../misc/hocs/Check';
import createStyles from './styles';
import RadioTypes from './types';

const Radio: FC<RadioTypes.Props> = (props, ref: RefObject<HTMLDivElement>) => {
    return (
        <Check
            {...props}
            tabIndex={props.tabIndex || 0}
            onFocus={(e) => {
                props.onFocus && props.onFocus(e)
                e.stopPropagation()
            }}
            onBlur={(e) => {
                props.onBlur && props.onBlur(e)
                e.stopPropagation()
            }}
            /**
             * Radio use
             */
            type="checkbox"
            children={(checked, focus) => {
                const styles = createStyles(props, checked, focus);
                return (
                    <Block css={styles.check}>
                        <div css={styles.radio} />
                    </Block>
                )
            }}
        />
    );
}

export default forwardRef(Radio);