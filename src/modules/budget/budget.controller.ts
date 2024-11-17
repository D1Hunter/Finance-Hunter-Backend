import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get, Param, ParseUUIDPipe, Query, Put, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { BudgetService } from "./budget.service";
import { ToNumberPipe } from "src/pipes/to-number.pipe";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createBudget(@Body() createBudgetDto: CreateBudgetDto, @Request() req) {
    return this.budgetService.create(createBudgetDto, req.user.id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllBudgets(
    @Query('limit', ToNumberPipe) limitQ: number = 9,
    @Query('offset', ToNumberPipe) offsetQ: number = 0,
    @Request() req
  ) {
    return this.budgetService.getAll(req.user.id);
  }

  @Get(':id')
  async getBudgetById(@Param('id', ParseUUIDPipe) id: string) {
    return this.budgetService.getOneById(id);
  }

  @Put(':id')
  async updateBudget(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(id, dto);
  }

  @Delete(':id')
  async deleteBudget(@Param('id', ParseUUIDPipe) id:string) {
    return this.budgetService.delete(id);
  }
}