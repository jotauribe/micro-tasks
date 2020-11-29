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
import Task from '@components/Task'
import usersService from '@services/users.service'
import useAsyncService from '@hooks/useAsyncService'
import id from '@utils/uid'
import TaskModel from '@domain/task'

const Header = styled(Container.as('header'))`
    min-width: 300px;
    justify-content: space-between;
`

const PlusIcon = styled(BsFillPlusCircleFill)`
    padding: 5px;
    border-radius: 50%;
    background-color: rgb(222, 224, 229);
`

const ContainerWithHoverEffect = styled(Container)`
    &:not(:hover) > .task__actions {
        display: none;
    }
`

const TaskListContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 0px 2px 32px -15px rgba(0, 0, 0, 0.25);
`

const Tasks = ({
    tasks = [
        {
            id: '123456',
            description: 'Sacar al perro a la calle',
            state: 'todo',
            ownerId: '12345671'
        },
        {
            id: '123457',
            description: 'Estudiar programacion funcional',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123458',
            description: 'Sacar al perro a la calle',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123459',
            description: 'Desplegar la aplicacion de payroll',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123460',
            description: 'Pintar la casa del vecino',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123457',
            description: 'Estudiar programacion funcional',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123458',
            description: 'Sacar al perro a la calle',
            state: 'todo',
            ownerId: '12345671'
        },
        {
            id: '123459',
            description: 'Desplegar la aplicacion de payroll',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123460',
            description: 'Pintar la casa del vecino',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123460',
            description: 'Pintar la casa del vecino',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123457',
            description: 'Estudiar programacion funcional',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123458',
            description: 'Sacar al perro a la calle',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123459',
            description: 'Desplegar la aplicacion de payroll',
            state: 'done',
            ownerId: '12345671'
        },
        {
            id: '123460',
            description: 'Pintar la casa del vecino',
            state: 'done',
            ownerId: '12345671'
        }
    ]
}) => {
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
        <TaskListContainer padded spaced>
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task as TaskModel}
                    onEdit={console.log}
                    onComplete={console.log}
                    onDelete={console.log}
                />
            ))}
        </TaskListContainer>
    )
}

export default Tasks
