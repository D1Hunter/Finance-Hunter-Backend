import { IsNotEmpty, IsNumber, IsString, Min, IsDateString, IsOptional } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @Min(0)
  readonly targetAmount: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly savedAmount?: number;

  @IsDateString()
  @IsOptional()
  readonly dueDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}