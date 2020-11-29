import React, { useState } from 'react'
import styled from 'styled-components'
import { negate as not, isEqual, filter } from 'lodash/fp'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import Text from '@components/Typography'
import Container from '@components/Container'
import SearchBox from '@components/SearchBox'
import Button from '@components/Button'
import User from '@components/User'
import SingleFieldForm from '@components/SingleFieldForm'
import usersService from '@services/users.service'
import useAsyncService from '@hooks/useAsyncService'
import id from '@utils/uid'

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

const Users = ({}) => {
    const [isNewUserFormVisible, setIsNewUserFormVisible] = useState(false)
    const [_, users] = useAsyncService(usersService.getAll, { runOnMount: true })
    const [_updateUser] = useAsyncService(usersService.update)
    const [_deleteUser] = useAsyncService(usersService.remove)
    const [_createUser] = useAsyncService(usersService.create)

    const addToList = user => users.updateLocally([user, ...(users.data || [])])
    const updateUser = user => _updateUser(user?.id, user)
    const createUser = name => {
        const newUser = { id: id(), name }
        _createUser(newUser).then(() => addToList(newUser))
    }
    const deleteUser = user => {
        _deleteUser(user.id)
        users.updateLocally(filter(not(isEqual(user)), users.data))
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
            {users.data?.map(user => (
                <User key={user.id} user={user} onEdit={updateUser} onDelete={deleteUser} />
            ))}
        </UserListContainer>
    )
}

export default Users
