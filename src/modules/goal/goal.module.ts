import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';

@Module({
  imports: [SequelizeModule.forFeature([Goal])],
  providers: [GoalService],
  controllers: [GoalController],
})
export class GoalModule {}