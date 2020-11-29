import React, { useState } from 'react'
import { BsX, BsCheck } from 'react-icons/bs'

import IconButton from '@components/IconButton'
import Input from '@components/Input'
import Container from '@components/Container'

export type SingleFieldFormProps = {
    value?: string
    placeholder?: string
    onChange?: (value: any) => void
    onSubmit: (value: any) => void
    onCancel: (value: any) => void
}

const SingleFieldForm: React.FC<SingleFieldFormProps> = ({
    value: initialValue = '',
    placeholder,
    onChange,
    onSubmit,
    onCancel
}) => {
    const [value, setValue] = useState(initialValue)
    const handleChange = event => {
        if (onChange) onChange(event)
        setValue(event.target.value)
    }
    const handleSubmit = () => {
        if (onSubmit && value) onSubmit(value)
        setValue('')
    }

    return (
        <Container>
            <Input autoFocus value={value} placeholder={placeholder} onChange={handleChange} />
            <IconButton onClick={handleSubmit}>
                <BsCheck size="1.5em" color="#5f6368" />
            </IconButton>
            <IconButton onClick={onCancel}>
                <BsX size="1.5em" color="#5f6368" />
            </IconButton>
        </Container>
    )
}

export default SingleFieldForm
