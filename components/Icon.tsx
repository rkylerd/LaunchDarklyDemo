import { KeyboardEventHandler, DragEventHandler, FC, HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { watchButtonPress, KeyDownData } from '../utils/keyboard'

import {
    IconProp,
    SizeProp
} from '@fortawesome/fontawesome-svg-core'

type IconStyleProps = {
    hcolor?: string;
    color?: string;
} & HTMLAttributes<SVGElement>;

type props = {
    icon: IconProp;
    size?: SizeProp;
    spin?: boolean;
    tabindex?: number | undefined;
    keyDownData?: KeyDownData;
    id?: string;
    onClick?: MouseEventHandler;
    onDragStart?: DragEventHandler;
} & IconStyleProps;

const StyledIcon = styled(FontAwesomeIcon) <IconStyleProps>`
    cursor: ${({ hcolor = '', color = '' }) => hcolor === color ? 'default' : 'pointer'};
    vertical-align: ${({ style: { verticalAlign = 'middle' } = {} }) => verticalAlign};
    margin: ${({ style: { margin = '0 4px' } = {} }) => margin};
    padding-left: ${({ style: { paddingLeft = 'unset' } = {} }) => paddingLeft};
    transition: color .3s ease-out;
    z-index: 1;

    &:focus {
        outline: none;
    }

    ${({ fontSize = '' }) => fontSize && css`
            font-size: ${fontSize};
        `}

    ${({ style: { position = '' } = {} }) => position && css`
            position: ${position};
        `}
    ${({ style: { top = '' } = {} }) => top && css`
            top: ${top};
        `}
    ${({ style: { right = '' } = {} }) => right && css`
            right: ${right};
        `}
`;

export const Icon: FC<props> = ({ icon, color = 'white', keyDownData, tabindex = -1, hcolor = undefined, size = '2x', onClick = (() => null), spin = false, ...rest }) => {

    const keyboardHandler: KeyboardEventHandler<SVGSVGElement> =
        (e) => (tabindex > -1) && watchButtonPress(keyDownData || {})(e);

    return <StyledIcon tabIndex={tabindex}
        onKeyPress={keyboardHandler}
        hcolor={hcolor}
        icon={icon}
        color={color}
        size={size}
        onClick={onClick}
        spin={spin}
        {...rest} />;
};

export default Icon;