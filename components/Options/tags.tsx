
import styled, { css } from 'styled-components'
import { HTMLAttributes } from 'react'
import Icon from '../Icon';

export type Styles = {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    width?: string;
    padding?: string;
    margin?: string;
} & HTMLAttributes<HTMLDivElement>;

export const OptionsIcon = styled(Icon)`
    margin: auto;
    align-self: center;
`;

export const OptionsWrapper = styled.div<Styles>`
    display: flex;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    list-style: none;
    :hover,:active,:focus {
        background-color: lightgray;
    }
`;

export const OptionsList = styled.div<Styles & HTMLAttributes<HTMLDivElement>>`
    z-index: 20;
    text-align: left;
    position: absolute;
    background-color: white;
    top: ${props => props.top || '0'}px;
    ${props => (props.left && css`
        left: ${props.left}px;
    `) || (props.right && css`
        right: ${props.right}px;
    `)};
    
    border: 1px solid black;
    border-radius: 3px;
    box-shadow: black 0px 0px 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    li {
        padding: ${({ padding = "2px" }) => padding};
        list-style: none;
        font-size: 12px;
        cursor: pointer;
        border-bottom: 1px solid black;
        & :hover {
            color: white;
            background-color: #292b2c;
        }
    }
`;
