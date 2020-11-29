import React from 'react'
import styled from 'styled-components'
import { BsX as CloseIcon } from 'react-icons/bs'

import Container from '../Container'
import Typography from '../Typography'
import IconButton from '../IconButton'

export type HTMLInputElementProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>
export interface InputProps extends HTMLInputElementProps {
    label?: string
    rows?: number
    variant?: 'filled' | 'outlined'
    prefix?: string | React.ReactElement
}

const InnerInput = styled.input`
    box-sizing: border-box;
    background: #ffffff;
    border: none;
    width: 100%;
    resize: none;

    &:focus {
        outline: none;
        border: none;
    }
`

const InnerInputWrapper = styled.div<InputProps>`
    width: 100%;
    height: ${props => (props.type === 'textarea' ? 'auto' : '46px')};
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #bbbbbb;
    border-top-width: ${props => (props.variant === 'outlined' ? '1px' : '0')};
    border-right-width: ${props => (props.variant === 'outlined' ? '1px' : '0')};
    border-left-width: ${props => (props.variant === 'outlined' ? '1px' : '0')};
    border-bottom-width: ${props => (props.type === 'textarea' ? '0' : '1px')};
    border-radius: 3px;
    display: flex;
    align-items: center;

    &:focus-within {
        outline: none;
    }
`

const Input: React.FC<InputProps> = ({
    label,
    value,
    type,
    variant,
    prefix,
    style,
    className = '',
    ...otherProps
}) => {
    const isSearchType = type === 'search'
    const component = type === 'textarea' ? 'textarea' : 'input'

    return (
        <Container vertical spaced style={style} className={className}>
            {label && (
                <Typography as="label" data-testid="label">
                    {label}
                </Typography>
            )}
            <InnerInputWrapper variant={variant} type={type}>
                {Boolean(prefix) && prefix}
                <InnerInput
                    as={component}
                    data-testid="input"
                    value={value}
                    {...otherProps}
                />
                {isSearchType && value && (
                    <IconButton>
                        <CloseIcon size="1.5em" color="#5f6368" />
                    </IconButton>
                )}
            </InnerInputWrapper>
        </Container>
    )
}

export default Input
