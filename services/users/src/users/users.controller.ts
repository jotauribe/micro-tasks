import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { User } from './user.schema'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    find() {
        return this.usersService.findAll()
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: Partial<User>) {
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

    @Post(':id')
    create(@Body() body: User) {
        return this.usersService.create(body)
    }
}
