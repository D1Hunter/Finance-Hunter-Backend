import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ToNumberPipe } from '../../pipes/to-number.pipe';
import { getCategoriesMapper } from './mappers/get-categories.mapper';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { createCategoryMapper } from './mappers/create-category.mapper';
import { updateCategoryMapper } from './mappers/update-category.mapper';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('limit', ToNumberPipe) limitQ: number = 9,
    @Query('offset', ToNumberPipe) offsetQ: number = 0,
  ) {
    const { limit, offset } = getCategoriesMapper.fromControllerToService(
      limitQ,
      offsetQ,
    );
    return this.categoryService.getAll(limit, offset);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCategoryDto) {
    dto = createCategoryMapper.fromControllerToService(dto);
    return this.categoryService.create(dto);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    dto = updateCategoryMapper.fromControllerToService(dto);
    return this.categoryService.update(id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.delete(id);
  }
}