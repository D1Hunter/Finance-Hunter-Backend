import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repostitory';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  getOneByName(name: string): Promise<Category> {
    return this.categoryRepository.findOneByName(name);
  }

  getOneById(id: string): Promise<Category> {
    return this.categoryRepository.findOneById(id);
  }

  getAll(limit: number, offset: number): Promise<Category[]> {
    return this.categoryRepository.findMany({
      limit,
      offset,
      attributes: ['id', 'name'],
    });
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = await this.getOneByName(dto.name);
    if (category) {
      throw new HttpException(
        'This name is already in use.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryRepository.create({ ...dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneById(id);
    if (!category) {
      throw new NotFoundException('Category with this id not found');
    }
    const categoryExist = await this.categoryRepository.findOneByName(dto.name);
    if (categoryExist) {
      throw new HttpException(
        'This name is already in use.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryRepository.update(category, { ...dto });
  }

  async delete(id: string) {
    const category = await this.categoryRepository.findOneById(id);
    if (!category) {
      throw new NotFoundException('Category with this id not found');
    }
    await this.categoryRepository.delete(id);
    return { message: 'The category has been deleted successfully.' };
  }
}
