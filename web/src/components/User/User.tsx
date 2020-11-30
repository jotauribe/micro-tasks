import React, { useState } from 'react'
import styled from 'styled-components'
import { BsPencil, BsTrash } from 'react-icons/bs'

import Avatar from '@components/Avatar'
import Text from '@components/Typography'
import IconButton from '@components/IconButton'
import SingleFieldForm from '@components/SingleFieldForm'
import Container from '@components/Container'
import UserModel from '@domain/user'

export type UserProps = {
    user: UserModel
    onEdit: (user: UserModel) => void
    onDelete: (user: UserModel) => void
}

const Actions = styled(Container)`
    margin-left: auto;
`

const ContainerWithHoverEffect = styled(Container)`
    &:not(:hover) > .user__actions {
        display: none;
    }
`

const User: React.FC<UserProps> = ({ user, onEdit, onDelete }) => {
    const [name, setUsername] = useState(user.name)
    const [isEditMode, setIsEditMode] = useState(false)

    const switchToEditMode = () => setIsEditMode(true)
    const switchToReadOnlyMode = () => setIsEditMode(false)
    const changeUserName = () => {
        if (user.name !== name) onEdit({ ...user, name })
        switchToReadOnlyMode()
    }

    return (
        <ContainerWithHoverEffect centered spaced hoverable={!isEditMode}>
            <Avatar name={name} />
            {isEditMode ? (
                <SingleFieldForm
                    value={name}
                    onSubmit={changeUserName}
                    onCancel={switchToReadOnlyMode}
                    onChange={event => setUsername(event.target.value)}
                />
            ) : (
                <>
                    <Text>{name}</Text>
                    <Actions className="user__actions">
                        <IconButton onClick={switchToEditMode}>
                            <BsPencil />
                        </IconButton>
                        <IconButton onClick={() => onDelete(user)}>
                            <BsTrash />
                        </IconButton>
                    </Actions>
                </>
            )}
        </ContainerWithHoverEffect>
    )
}

export default User
