import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseAbstractRepository } from "../../interfaces/base.abstract.repository";
import { Goal } from "./goal.model";

@Injectable()
export class GoalRepository extends BaseAbstractRepository<Goal> {
    constructor(@InjectModel(Goal) budgetModel: typeof Goal) {
        super(budgetModel);
    }
}