import React from 'react'
import styled from 'styled-components'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import Text from '@components/Typography'
import Container from '@components/Container'
import SearchBox from '@components/SearchBox'
import Button from '@components/Button'
import User from '@components/User'
import usersService from '@services/users.service'
import useAsyncService from '@hooks/useAsyncService'

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
    const [_, users] = useAsyncService(usersService.getAll, { runOnMount: true })

    return (
        <UserListContainer vertical padded childrenSpacedBy="12px">
            <Header centered>
                <Text large>My Users</Text>
            </Header>
            <SearchBox placeholder="Type here to look for users..." style={{ width: '100%' }} />
            <Button ghost style={{ padding: 0 }}>
                <PlusIcon size="2.5em" color="rgb(128, 138, 153)" />
                <Text as="span">Add New User</Text>
            </Button>
            {users.data?.map(user => (
                <User user={user} onEdit={console.log} />
            ))}
        </UserListContainer>
    )
}

export default Users
