import { AllowNull, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from '../user/user.model';
import { Category } from "../category/category.model";

@Table
export class Budget extends Model {
    @PrimaryKey
    @Unique
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10,2))
    ammount:number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL(10,2))
    spent: number;

    @ForeignKey(()=>User)
    userId:User;

    @ForeignKey(()=>Category)
    categoryId: Category;
}