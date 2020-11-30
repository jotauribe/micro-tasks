import React from 'react'
import styled from 'styled-components'

import Container from '@components/Container'
import Task from '@components/Task'
import tasksService from '@services/tasks.service'
import useAsyncService from '@hooks/useAsyncService'
import removeItem from '@utils/removeItem'
import ITask from 'src/types/task'

export type TasksProps = {
    tasks: Array<ITask>
    updateTasksLocally: (updater: any) => void
}

const TaskListContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    background-color: white;

    & > * {
        margin-bottom: 15px;
    }
`

const Tasks: React.FC<TasksProps> = ({ tasks, updateTasksLocally }) => {
    const [_updateTask] = useAsyncService(tasksService.update)
    const [_deleteTask] = useAsyncService(tasksService.remove)

    const updateTask = ({ id, ...task }) => _updateTask(id, task)
    const deleteTask = task => {
        _deleteTask(task.id)
        updateTasksLocally(taskList => removeItem(task)(taskList))
    }

    return (
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
    )
}

export default Tasks
