import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ToNumberPipe } from 'src/pipes/to-number.pipe';
import { getTransactionsMapper } from './mappers/get-transactions.mapper';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { createTransactionMapper } from './mappers/create-transaction.mapper';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto, @Request() req) {
    dto = createTransactionMapper.fromControllerToService(dto);
    return this.transactionService.create(dto, req.user.id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('limit', ToNumberPipe) limitQ: number = 0,
    @Query('offset', ToNumberPipe) offsetQ: number = 0,
  ) {
    const { limit, offset } = getTransactionsMapper.fromControllerToService(
      limitQ,
      offsetQ,
    );
    return this.transactionService.getAll(limit, offset);
  }

  @Get('all/:categoryId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllByCategory(
    @Query('limit', ToNumberPipe) limitQ: number = 9,
    @Query('offset', ToNumberPipe) offsetQ: number = 0,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    const { limit, offset } = getTransactionsMapper.fromControllerToService(
      limitQ,
      offsetQ,
    );
    return this.transactionService.getAllByCategory(categoryId,limit,offset);
  }
  
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTransactionDto
  ){
    dto = createTransactionMapper.fromControllerToService(dto);
    return this.transactionService.update(id,dto)
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseUUIDPipe) id: string){
    return this.transactionService.delete(id);
  }
}
