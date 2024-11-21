import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { TransactionType } from "./transaction.type";
import { User } from "../user/user.model";
import { Category } from "../category/category.model";

@Table
export class Transaction extends Model {
    @PrimaryKey
    @Unique
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    ammount: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(TransactionType)))
    type: TransactionType

    @Column(DataType.STRING)
    description: string;

    @ForeignKey(() => User)
    userId: User;

    @ForeignKey(() => Category)
    categoryId: Category;

    @BelongsTo(() => Category)
    category: Category;
}