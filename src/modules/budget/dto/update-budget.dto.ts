import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class UpdateBudgetDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    readonly categoryId: string;

    @IsNumber({maxDecimalPlaces:2})
    @IsNotEmpty({ message: 'Amount is required' })
    @Min(0, { message: 'Amount must be greater than or equal to 0' })
    readonly amount: number;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}