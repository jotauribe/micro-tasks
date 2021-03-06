import { Request } from 'express'
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common'

import { Task } from './task.schema'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly usersService: TasksService) {}

    @Get()
    find(@Req() request: Request) {
        return this.usersService.find(request.query)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: Partial<Task>) {
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

    @Post()
    create(@Body() body: Task) {
        return this.usersService.create(body)
    }
}
