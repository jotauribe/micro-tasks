import axios from 'axios'
import User from '@domain/user'

type UserList = Array<User>

const usersEndpoint = 'http://localhost:3020/users'

const getAll = (): Promise<UserList> => {
    return axios.get(usersEndpoint).then(response => response.data)
}

export default { getAll }
