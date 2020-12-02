import { ClientProxy } from '@nestjs/microservices'
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common'

import { User } from './user.schema'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject('RMQ') private messageQueue: ClientProxy
    ) {}

    @Get()
    find() {
        return this.usersService.findAll()
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: Partial<User>) {
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const response = await this.usersService.delete(id)
        this.messageQueue.emit('UserDeleted', { id })
        return response
    }

    @Post()
    create(@Body() body: User) {
        return this.usersService.create(body)
    }
}
