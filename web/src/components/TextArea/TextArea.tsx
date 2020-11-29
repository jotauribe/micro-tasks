import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Typography from '../Typography'

export type HTMLInputElementProps = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'prefix'
>
export interface TextAreaProps extends HTMLInputElementProps {
    label?: string
    rows?: number
    prefix?: string | React.ReactElement
}



const InnerTextArea = styled.textarea`
    box-sizing: border-box;
    border: none;
    width: 100%;
    resize: none;

    &:focus {
        border: none;
        outline: none;
    }
`

const TextAreaWrapper = styled.div<TextAreaProps>`
    width: 100%;
    box-sizing: border-box;
    padding: 8px 0;
    border: 0px solid #bbbbbb;
    border-radius: 3px;
    display: flex;
    align-items: center;

    &:focus-within {
        outline: none;
    }
`

const TextArea: React.FC<TextAreaProps> = ({
    label,
    value,
    prefix,
    style,
    className = '',
    ...otherProps
}) => {
    return (
        <Container vertical spaced style={style} className={className}>
            {label && (
                <Typography as="label" data-testid="label">
                    {label}
                </Typography>
            )}
            <TextAreaWrapper>
                <InnerTextArea data-testid="input" value={value} {...otherProps} />
            </TextAreaWrapper>
        </Container>
    )
}

export default TextArea
