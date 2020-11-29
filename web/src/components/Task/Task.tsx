import React, { useState } from 'react'
import styled from 'styled-components'
import { BsCheckCircle, BsTrash, BsPencil } from 'react-icons/bs'

import Text from '@components/Typography'
import Container from '@components/Container'
import SingleFieldForm from '@components/SingleFieldForm'
import IconButton from '@components/IconButton'
import TaskModel from '@domain/task'

type TaskProps = {
    task: TaskModel
    onComplete: (task: TaskModel) => void
    onDelete: (task: TaskModel) => void
    onEdit: (task: TaskModel) => void
}

const ContainerWithHoverEffect = styled(Container)`
    &:not(:hover) > .task__actions {
        display: none;
    }
`

const Task: React.FC<TaskProps> = ({ task, onEdit, onComplete, onDelete }) => {
    const [description, setDescription] = useState(task.description)
    const [isInEditMode, setIsInEditMode] = useState(false)

    const changeTaskDescription = description => {
        if (task.description !== description) onEdit({ ...task, description })
        setIsInEditMode(false)
    }

    return (
        <ContainerWithHoverEffect vertical padded bordered height="200px" width="200px">
            <header>{task.state.toUpperCase()}</header>
            {isInEditMode ? (
                <SingleFieldForm
                    type="textarea"
                    rows={6}
                    value={description}
                    onSubmit={changeTaskDescription}
                    onChange={event => setDescription(event.target.value)}
                    onCancel={() => setIsInEditMode(false)}
                />
            ) : (
                <>
                    <Text bold large as="p">
                        {description}
                    </Text>
                    <Text small>Create by Jota Uribe</Text>
                </>
            )}
            {!isInEditMode && (
                <div className="task__actions" style={{ marginTop: 'auto' }}>
                    <IconButton>
                        <BsTrash size="1em" />
                    </IconButton>
                    <IconButton>
                        <BsCheckCircle size="1em" />
                    </IconButton>
                    <IconButton>
                        <BsPencil size="1em" onClick={() => setIsInEditMode(true)} />
                    </IconButton>
                </div>
            )}
        </ContainerWithHoverEffect>
    )
}

export default Task
