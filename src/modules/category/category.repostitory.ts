import { BaseAbstractRepository } from '../../interfaces/base.abstract.repository';
import { Category } from './category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

@Injectable()
export class CategoryRepository extends BaseAbstractRepository<Category> {
  constructor(@InjectModel(Category) categoryModel: typeof Category) {
    super(categoryModel);
  }
  findOneByName(name: string): Promise<Category> {
    return this.findOne({ where: { name } });
  }
}
