import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Transaction } from "../transaction/transaction.model";
import { Budget } from "../budget/budget.model";

@Table
export class Category extends Model {
    @PrimaryKey
    @Unique
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id:string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    name:string;

    @HasMany(()=>Transaction)
    transactions:Transaction[];

    @HasMany(()=>Budget)
    budgets:Budget[];
}