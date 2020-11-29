import axios from 'axios'
import User from '@domain/user'

type UserList = Array<User>

const usersEndpoint = 'http://localhost:3020/users'

const getAll = (): Promise<UserList> => {
    return axios.get(usersEndpoint).then(response => response.data)
}

const update = (id: string, user: Partial<User>): Promise<User> => {
    return axios.patch(`${usersEndpoint}/${id}`, user).then(response => response.data)
}

const remove = (id: string): any => {
    return axios.delete(`${usersEndpoint}/${id}`).then(response => response.data)
}

export default { getAll, update, remove }
