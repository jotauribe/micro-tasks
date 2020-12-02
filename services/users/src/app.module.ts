import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { User, UserSchema } from './users/user.schema'

const { MONGO_USER, MONGO_PWD } = process.env
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PWD}@users-database:27017/users-database`
const options = { urls: ['amqp://rabbitmq:5672'], queue: 'microtasks-events' }

@Module({
    imports: [
        MongooseModule.forRoot(mongoUrl),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ClientsModule.register([{ name: 'RMQ', transport: Transport.RMQ, options }])
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class AppModule {}
