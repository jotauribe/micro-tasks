import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { map } from 'lodash/fp'

import Container from '@components/Container'
import Text from '@components/Typography'
import TextArea from '@components/TextArea'
import Button from '@components/Button'
import { modalStyles, formStyles } from './styles'
import id from '@utils/uid'
import User from '@domain/user'
import Task from 'src/types/task'

export type NewTaskFormProps = {
    open: boolean
    users?: Array<User>
    onSave: (task: Task) => void
    onRequestClose?: (a: any) => void
}

Modal.setAppElement('#root')

const mapToOptions = map((user: User) => ({ label: user.name, value: user.id }))

const Form = Container.as('form')

const NewTaskForm: React.FC<NewTaskFormProps> = ({
    open,
    users,
    onSave,
    onRequestClose,
    ...otherProps
}) => {
    const [ownerId, setOwnerId] = useState<string>('')
    const [description, setDescription] = useState('')

    const saveTask = (e: React.MouseEvent) => {
        e.preventDefault()
        if (ownerId && description) onSave({ id: id(), description, ownerId, state: 'todo' })
    }

    return (
        <Modal isOpen={open} style={modalStyles} {...otherProps}>
            <Form vertical padded spaced style={formStyles}>
                <Text as="label">Assigned to</Text>
                <Select
                    options={mapToOptions(users)}
                    onChange={o => setOwnerId((o as any)?.value)}
                />
                <TextArea
                    rows={5}
                    label="Description"
                    placeholder="Describe your task here..."
                    onChange={e => setDescription(e.target.value)}
                    style={{ backgroundColor: 'white', padding: '8px' }}
                />
                <Container spaced>
                    <Button primary onClick={saveTask}>
                        Save
                    </Button>
                    <Button ghost onClick={onRequestClose}>
                        Cancel
                    </Button>
                </Container>
            </Form>
        </Modal>
    )
}

export default NewTaskForm
