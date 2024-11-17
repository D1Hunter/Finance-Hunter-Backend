import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ParseUUIDPipe, UseGuards, Request, Query } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto, UpdateGoalDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ToNumberPipe } from 'src/pipes/to-number.pipe';

@Controller('goals')
export class GoalController {
    constructor(private readonly goalService: GoalService) { }

    @Post()
    async createGoal(@Body() createGoalDto: CreateGoalDto) {
        return await this.goalService.create(createGoalDto);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAll(
        @Query('limit', ToNumberPipe) limitQ: number = 9,
        @Query('offset', ToNumberPipe) offsetQ: number = 0,
        @Request() req) {
        return await this.goalService.getAll(req.user.id);
    }

    @Get(':id')
    async getGoalById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.goalService.getOneById(id);
    }

    @Put(':id')
    async updateGoal(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateGoalDto: UpdateGoalDto,
    ) {
        return this.goalService.update(id, updateGoalDto);
    }

    @Delete(':id')
    async deleteGoal(@Param('id', ParseUUIDPipe) id: string) {
        return this.goalService.delete(id);
    }
}