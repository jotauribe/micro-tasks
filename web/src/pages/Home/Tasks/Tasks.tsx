import React, { useState } from 'react'
import styled from 'styled-components'

import Container from '@components/Container'
import Task from '@components/Task'
import Text from '@components/Typography'
import Button from '@components/Button'
import NewTaskForm from '@components/NewTaskForm'
import useAsyncService from '@hooks/useAsyncService'
import tasksService from '@services/tasks.service'
import removeItem from '@utils/removeItem'
import ITask from 'src/types/task'
import User from '@domain/user'

export type TasksProps = {
    tasks: Array<ITask>
    owner?: string
    users?: Array<User>
    updateTasksLocally: (updater: any) => void
}

const Header = Container.as('header')

const TaskListContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    background-color: white;

    & > * {
        margin-bottom: 15px;
    }
`

const Tasks: React.FC<TasksProps> = ({ tasks, users, owner = 'All Tasks', updateTasksLocally }) => {
    const [isNewTaskFormVisible, setIsNewTaskFormVisible] = useState(false)
    const [_updateTask] = useAsyncService(tasksService.update)
    const [_deleteTask] = useAsyncService(tasksService.remove)
    const [_createTask] = useAsyncService(tasksService.create)

    const updateTask = ({ id, ...task }) => _updateTask(id, task)
    const deleteTask = task => {
        _deleteTask(task.id)
        updateTasksLocally(taskList => removeItem(task)(taskList))
    }
    const createTask = async task => {
        await _createTask(task)
        updateTasksLocally(tasks => [...tasks, task])
        setIsNewTaskFormVisible(false)
    }

    return (
        <div>
            <Header padded spaced centered>
                <Text large bold>
                    {owner}
                </Text>
                <Button onClick={() => setIsNewTaskFormVisible(true)}>Add new task</Button>
            </Header>
            <TaskListContainer padded spaced>
                {tasks?.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={updateTask}
                        onDelete={deleteTask}
                        onComplete={updateTask}
                    />
                ))}
            </TaskListContainer>
            <NewTaskForm
                open={isNewTaskFormVisible}
                users={users}
                onSave={createTask}
                onRequestClose={() => setIsNewTaskFormVisible(false)}
            />
        </div>
    )
}

export default Tasks
