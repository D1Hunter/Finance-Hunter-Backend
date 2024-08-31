import { CreateCategoryDto } from "../dto/create-category.dto";

class CreateCategoryMapper {
    fromControllerToService(dto:CreateCategoryDto):CreateCategoryDto {
        return {
            name:dto.name
        }
    }
}

export const createCategoryMapper = new CreateCategoryMapper();