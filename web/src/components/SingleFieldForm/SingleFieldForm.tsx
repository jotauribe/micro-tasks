import React, { useState } from 'react'
import { BsX, BsCheck } from 'react-icons/bs'

import IconButton from '@components/IconButton'
import Input from '@components/Input'
import TextArea from '@components/TextArea'
import Container from '@components/Container'

type SingleFieldFormProps = {
    value?: string
    type?: 'input' | 'textarea'
    rows?: number
    placeholder?: string
    onSubmit: (value: any) => void
    onCancel: (value: any) => void
    onChange?: (value: any) => void
}

const SingleFieldForm: React.FC<SingleFieldFormProps> = ({
    type,
    rows,
    value: initialValue = '',
    placeholder,
    onChange,
    onSubmit,
    onCancel
}) => {
    const [value, setValue] = useState(initialValue)
    const InputComponent = type === 'textarea' ? TextArea : Input

    const handleChange = event => {
        if (onChange) onChange(event)
        setValue(event.target.value)
    }
    const handleSubmit = () => {
        if (onSubmit && value) onSubmit(value)
        setValue('')
    }

    return (
        <Container vertical={type === 'textarea'}>
            <InputComponent
                autoFocus
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
            <div>
                <IconButton onClick={handleSubmit}>
                    <BsCheck size="1.5em" color="#5f6368" />
                </IconButton>
                <IconButton onClick={onCancel}>
                    <BsX size="1.5em" color="#5f6368" />
                </IconButton>
            </div>
        </Container>
    )
}

export default SingleFieldForm
