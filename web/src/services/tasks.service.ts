import axios from 'axios'
import Task from '@domain/task'

type TaskList = Array<Task>
type Query = Partial<Task>

const tasksEndpoint = 'http://localhost:3030/tasks'

const find = (params: Query): Promise<TaskList> => {
    return axios.get(tasksEndpoint, { params }).then(response => response.data)
}

const update = (id: string, user: Partial<Task>): Promise<Task> => {
    return axios.patch(`${tasksEndpoint}/${id}`, user).then(response => response.data)
}

const remove = (id: string): any => {
    return axios.delete(`${tasksEndpoint}/${id}`).then(response => response.data)
}

const create = (user: Task): any => {
    return axios.post(tasksEndpoint, user).then(response => response.data)
}

export default { find, update, remove, create }
