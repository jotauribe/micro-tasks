export type Task = {
    id: string
    description: string
    state: string & ('todo' | 'done')
    ownerId: string
}

export default Task
