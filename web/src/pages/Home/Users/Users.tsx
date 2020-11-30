import React, { useState } from 'react'
import styled from 'styled-components'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import Text from '@components/Typography'
import Container from '@components/Container'
import SearchBox from '@components/SearchBox'
import Button from '@components/Button'
import User from '@components/User'
import SingleFieldForm from '@components/SingleFieldForm'
import usersService from '@services/users.service'
import useAsyncService from '@hooks/useAsyncService'
import removeItem from '@utils/removeItem'
import id from '@utils/uid'
import IUser from '@domain/user'

export type UsersProps = {
    users: Array<IUser>
    onSelectUser: (user: IUser) => void
    updateUsersLocally: (updater: any) => void
}

const Header = styled(Container.as('header'))`
    min-width: 300px;
    justify-content: space-between;
`

const PlusIcon = styled(BsFillPlusCircleFill)`
    padding: 5px;
    border-radius: 50%;
    background-color: rgb(222, 224, 229);
`

const UserListContainer = styled(Container)`
    background-color: white;
    box-shadow: 0px 2px 32px -15px rgba(0, 0, 0, 0.25);
`

const Users: React.FC<UsersProps> = ({ users = [], onSelectUser, updateUsersLocally }) => {
    const [isNewUserFormVisible, setIsNewUserFormVisible] = useState(false)
    const [selectedUser, selectUser] = useState<IUser | null>()
    const [_updateUser] = useAsyncService(usersService.update)
    const [_deleteUser] = useAsyncService(usersService.remove)
    const [_createUser] = useAsyncService(usersService.create)

    const addToList = user => updateUsersLocally([user, ...(users || [])])
    const updateUser = user => _updateUser(user?.id, user)
    const createUser = name => {
        const newUser = { id: id(), name }
        _createUser(newUser).then(() => addToList(newUser))
    }
    const deleteUser = user => {
        _deleteUser(user.id)
        updateUsersLocally(userList => removeItem(user)(userList))
    }
    const handleUserSelection = user => {
        selectUser(user)
        onSelectUser(user)
    }

    return (
        <UserListContainer vertical padded childrenSpacedBy="12px">
            <Header centered>
                <Text large>My Users</Text>
            </Header>
            <SearchBox placeholder="Type here to look for users..." style={{ width: '100%' }} />
            {isNewUserFormVisible ? (
                <SingleFieldForm
                    onSubmit={createUser}
                    onCancel={() => setIsNewUserFormVisible(false)}
                />
            ) : (
                <Button ghost style={{ padding: 0 }} onClick={() => setIsNewUserFormVisible(true)}>
                    <PlusIcon size="2.5em" color="rgb(128, 138, 153)" />
                    <Text as="span">Add New User</Text>
                </Button>
            )}
            {users.map(user => (
                <User
                    key={user.id}
                    user={user}
                    selected={selectedUser?.id === user.id}
                    onEdit={updateUser}
                    onDelete={deleteUser}
                    onClick={handleUserSelection}
                />
            ))}
        </UserListContainer>
    )
}

export default Users
