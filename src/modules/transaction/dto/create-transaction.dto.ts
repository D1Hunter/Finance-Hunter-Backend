import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { TransactionType } from "../transaction.type";

export class CreateTransactionDto {
    @IsNumber({maxDecimalPlaces:2})
    @IsNotEmpty({ message: 'Amount is required' })
    @Min(0, { message: 'Amount must be greater than or equal to 0' })
    readonly ammount: number;

    @IsEnum(TransactionType)
    readonly type: TransactionType

    @IsOptional()
    @IsString({message:'The description must be a string.'})
    @Length(10, 255, { message: 'The description can contain: 10 min and 255 max characters.' })
    readonly description?:string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    readonly categoryId:string
}
