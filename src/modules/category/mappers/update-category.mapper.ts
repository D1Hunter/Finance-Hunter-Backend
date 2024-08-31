import { UpdateCategoryDto } from "../dto/update-category.dto";

class UpdateCategoryMapper {
    fromControllerToService(dto:UpdateCategoryDto):UpdateCategoryDto {
        return {
            name:dto.name
        }
    }
}

export const updateCategoryMapper = new UpdateCategoryMapper();