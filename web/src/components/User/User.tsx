import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { BsPencil, BsTrash, BsX, BsCheck } from 'react-icons/bs'

import Avatar from '@components/Avatar'
import Text from '@components/Typography'
import IconButton from '@components/IconButton'
import Input from '@components/Input'
import Container from '@components/Container'
import UserModel from '@domain/user'

export type UserProps = {
    user: UserModel
    onEdit: (UserModel) => void
    onDelete?: (UserModel) => void
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
    const changeUserName = () => onEdit({ ...user, name })

    return (
        <ContainerWithHoverEffect centered spaced hoverable={!isEditMode}>
            <Avatar name={user.name} />
            {isEditMode ? (
                <Container>
                    <Input
                        autoFocus
                        value={name}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <IconButton onClick={changeUserName}>
                        <BsCheck size="1.5em" color="#5f6368" />
                    </IconButton>
                    <IconButton onClick={switchToReadOnlyMode}>
                        <BsX size="1.5em" color="#5f6368" />
                    </IconButton>
                </Container>
            ) : (
                <>
                    <Text>{user.name}</Text>
                    <Actions className="user__actions">
                        <IconButton onClick={switchToEditMode}>
                            <BsPencil />
                        </IconButton>
                        <IconButton onClick={onDelete}>
                            <BsTrash />
                        </IconButton>
                    </Actions>
                </>
            )}
        </ContainerWithHoverEffect>
    )
}

export default User
