import React from 'react'
import styled from 'styled-components'

import Container from '@components/Container'
import Task from '@components/Task'
import tasksService from '@services/tasks.service'
import useAsyncService from '@hooks/useAsyncService'
import removeItem from '@utils/removeItem'

const TaskListContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 0px 2px 32px -15px rgba(0, 0, 0, 0.25);
`

const Tasks = () => {
    const [, tasks] = useAsyncService(tasksService.getAll, { runOnMount: true })
    const [_updateTask] = useAsyncService(tasksService.update)
    const [_deleteTask] = useAsyncService(tasksService.remove)

    const updateTask = ({ id, ...task }) => _updateTask(id, task)
    const deleteTask = task => {
        _deleteTask(task.id)
        tasks.updateLocally(taskList => removeItem(task)(taskList))
    }

    return (
        <TaskListContainer padded spaced>
            {tasks.data?.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onEdit={updateTask}
                    onDelete={deleteTask}
                    onComplete={updateTask}
                />
            ))}
        </TaskListContainer>
    )
}

export default Tasks
