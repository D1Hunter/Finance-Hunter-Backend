import { IsOptional, IsNumber, IsString, Min, IsDateString } from 'class-validator';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly targetAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly savedAmount?: number;

  @IsDateString()
  @IsOptional()
  readonly dueDate?: Date;
}