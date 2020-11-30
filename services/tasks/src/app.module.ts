import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TasksController } from './tasks/tasks.controller'
import { TasksService } from './tasks/tasks.service'
import { Task, TaskSchema } from './tasks/task.schema'

const { MONGO_USER, MONGO_PWD } = process.env
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PWD}@tasks-database:27019/tasks-database`

@Module({
    imports: [
        MongooseModule.forRoot(mongoUrl),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class AppModule {}
