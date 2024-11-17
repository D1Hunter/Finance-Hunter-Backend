import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Budget } from './budget.model';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetRepository } from './budget.repository';

@Module({
  imports: [SequelizeModule.forFeature([Budget])],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository],
})
export class BudgetModule { }
