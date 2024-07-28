import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    async getAll() {
        return this.userService.getAll();
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { message: `The user ${id} has been deleted successfully` };
    }
}
