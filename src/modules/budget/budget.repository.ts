import { Injectable } from "@nestjs/common";
import { Budget } from "./budget.model";
import { BaseAbstractRepository } from "../../interfaces/base.abstract.repository";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class BudgetRepository extends BaseAbstractRepository<Budget> {
    constructor(@InjectModel(Budget) budgetModel: typeof Budget) {
        super(budgetModel);
    }
}