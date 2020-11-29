import React from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    id?: string
    primary?: boolean
    secondary?: boolean
    ghost?: boolean
    centered?: boolean
}

const Button = styled.button<ButtonProps>`
    display: inline-flex;
    box-sizing: border-box;
    border: 1px solid black;
    align-items: center;
    outline: none;
    padding: 8px 16px;
    border-radius: 18px;
    text-align: center;
    opacity: 0.5;

    :hover {
        opacity: 1;
    }

    & > *:not(:last-child) {
        margin-right: 8px;
    }

    ${props => props.centered && 'justify-content: center;'}

    ${({ primary }) =>
        primary &&
        css`
            background: black;
            border-color: black;
            color: white;
        `}

    ${({ secondary }) =>
        secondary &&
        css`
            background: white;
            border-color: #bbbbbb;
            color: black;
        `}

    ${({ ghost }) =>
        ghost &&
        css`
            background: white;
            border-width: none;
            border-style: none;
        `}
`

export default Button
