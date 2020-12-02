import { Request } from 'express'
import { EventPattern } from '@nestjs/microservices'
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common'

import { Task } from './task.schema'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    find(@Req() request: Request) {
        return this.tasksService.find(request.query)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: Partial<Task>) {
        return this.tasksService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.deleteOne(id)
    }

    @Post()
    create(@Body() body: Task) {
        return this.tasksService.create(body)
    }

    @EventPattern('UserDeleted')
    async deleteUserTasks(user: { id: string }) {
        await this.tasksService.delete(user.id)
    }
}
