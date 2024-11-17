import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { GoalRepository } from "./goal.repository";
import { Goal } from "./goal.model";
import { UpdateGoalDto } from "./dto/update-goal.dto";

@Injectable()
export class GoalService{
    constructor(private readonly goalRepository:GoalRepository) { }

    async create(dto:CreateGoalDto): Promise<Goal> {
        return this.goalRepository.create({...dto});
    }

    async getAll(userId: string): Promise<Goal[]> {
        return this.goalRepository.findMany({ where: { userId } });
    }

    async getOneById(id:string): Promise<Goal> {
        const goal = await this.goalRepository.findOneById(id);
        if (!goal) {
            throw new NotFoundException('Goal with this id not found');
        }
        return goal;
    }

    async update(id:string, dto:UpdateGoalDto){
        const goal = await this.getOneById(id);
        return this.goalRepository.update(goal, dto);
    }

    async delete(id:string){
        const goal = await this.getOneById(id);
        await this.goalRepository.delete(id);
        return { message: 'The goal has been deleted successfully.' };
    }
}