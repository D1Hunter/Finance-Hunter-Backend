import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryRepository } from './category.repostitory';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository],
  exports:[CategoryService]
})
export class CategoryModule {}
