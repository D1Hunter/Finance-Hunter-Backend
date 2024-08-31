import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getUsersMapper } from './mappers/get-users.mapper';
import { ToNumberPipe } from '../../pipes/to-number.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAll(
    @Query('limit',ToNumberPipe) limitQ: number = 9,
    @Query('offset',ToNumberPipe) offsetQ: number = 0,
  ) {
    const { limit, offset } = getUsersMapper.fromFrontToController(
      limitQ,
      offsetQ,
    );
    return this.userService.getAll(limit, offset);
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
