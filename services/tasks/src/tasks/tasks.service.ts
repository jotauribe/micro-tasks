import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Task, TaskDocument } from './task.schema'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async create(user: Task) {
        return this.taskModel.create(user)
    }

    async find(query: Partial<Task>): Promise<Task[]> {
        return this.taskModel.find(query).exec()
    }

    async update(id: string, body: Partial<Task>): Promise<Task> {
        return this.taskModel.updateOne({ id }, body)
    }

    async delete(id: string) {
        return this.taskModel.deleteOne({ id })
    }
}
