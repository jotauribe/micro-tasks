import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: User) {
        return this.userModel.create(user)
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async update(id: string, body: Partial<User>): Promise<User> {
        return this.userModel.updateOne({ id }, body)
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ id })
    }
}
