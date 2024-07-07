import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

export class UserRepository {
    constructor(@InjectModel(User) private readonly UserModel: typeof User) { }
    create(dto: Object): Promise<User> {
        return this.UserModel.create({ ...dto });
    }
}