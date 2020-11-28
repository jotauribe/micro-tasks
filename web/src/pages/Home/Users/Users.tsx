import React from 'react'
import styled from 'styled-components'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import Text from '@components/Typography'
import Container from '@components/Container'
import SearchBox from '@components/SearchBox'
import Input from '@components/Input'
import Button from '@components/Button'
import IconButton from '@components/IconButton'
import User from 'src/components/User'

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

const ContainerWithHover = styled(Container)`
    :hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`

const Users = ({
    users = [
        { name: 'Juan Eduardo', id: '12345678' },
        { name: 'Daniel Martinez', id: '12345678' },
        { name: 'Maria Fernandez', id: '12345678' },
        { name: 'Alberto Diaz', id: '12345678' },
        { name: 'Jose Martinez', id: '12345678' },
        { name: 'Jhessica Fernandez', id: '12345678' },
        { name: 'Juan Eduardo', id: '12345678' },
        { name: 'Daniel Martinez', id: '12345678' },
        { name: 'Maria Fernandez', id: '12345678' },
        { name: 'Alberto Diaz', id: '12345678' },
        { name: 'Jose Martinez', id: '12345678' },
        { name: 'Jhessica Fernandez', id: '12345678' },
        { name: 'Juan Eduardo', id: '12345678' },
        { name: 'Daniel Martinez', id: '12345678' },
        { name: 'Maria Martinez', id: '12345678' }
    ]
}) => {
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
            {users.map(user => (
                <User user={user} onEdit={console.log} />
            ))}
        </UserListContainer>
    )
}

export default Users
