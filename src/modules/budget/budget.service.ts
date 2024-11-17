import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BudgetRepository } from "./budget.repository";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { Budget } from "./budget.model";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Injectable()
export class BudgetService {
    constructor(private readonly budgetRepository: BudgetRepository) { }

    async create(dto: CreateBudgetDto, userId: string): Promise<Budget> {
        return await this.budgetRepository.create({ ...dto, userId });
    }

    async getAll(userId: string): Promise<Budget[]> {
        return await this.budgetRepository.findMany({ where: { userId } });
    }

    async getOneById(id: string): Promise<Budget> {
        const budget = await this.budgetRepository.findOneById(id);
        if (!budget) {
            throw new NotFoundException('Budget with this id not found');
        }
        return budget;
    }

    async update(id: string, dto: UpdateBudgetDto): Promise<Budget> {
        const budget = await this.getOneById(id);
        return await this.budgetRepository.update(budget, { ...dto });
    }

    async delete(id: string) {
        const budget = await this.getOneById(id);
        await this.budgetRepository.delete(id);
        return { message: 'The budget has been deleted successfully.' };
    }
}