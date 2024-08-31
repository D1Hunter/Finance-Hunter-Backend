import { CreateTransactionDto } from "../dto/create-transaction.dto";

class CreateTransactionMapper {
    fromControllerToService(dto:CreateTransactionDto):CreateTransactionDto {
        return {
            ammount:dto.ammount,
            categoryId:dto.categoryId,
            type:dto.type,
            description:dto.description
        }
    }
}

export const createTransactionMapper = new CreateTransactionMapper();