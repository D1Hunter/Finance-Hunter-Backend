import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryService: CategoryService,
  ) {}
  async create(dto: CreateTransactionDto, userId: string) {
    const category = await this.categoryService.getOneById(dto.categoryId);
    if (!category) {
      throw new HttpException(
        'Category with this id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.transactionRepository.create({ ...dto, userId });
  }

  async getAll(limit: number, offset: number) {
    return this.transactionRepository.findMany({ limit, offset });
  }

  async getAllByCategory(categoryId: string, limit, offset) {
    const category = await this.categoryService.getOneById(categoryId);
    if (!category) {
      throw new HttpException(
        'Category with this id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.transactionRepository.findMany({
      where: { categoryId },
      limit,
      offset,
    });
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOneById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction with this id not found');
    }
    const category = await this.categoryService.getOneById(dto.categoryId);
    if (!category) {
      throw new HttpException(
        'Category with this id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.transactionRepository.update(transaction, { ...dto });
  }

  async delete(id: string) {
    const transaction = await this.transactionRepository.findOneById(id);
    if (!transaction) {
      throw new HttpException(
        'Transaction with this id is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.transactionRepository.delete(id);
    return { message: 'The transaction has been deleted successfully.' };
  }
}
