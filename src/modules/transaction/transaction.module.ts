import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { TransactionRepository } from './transaction.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [SequelizeModule.forFeature([Transaction]),CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService,TransactionRepository],
})
export class TransactionModule {}
