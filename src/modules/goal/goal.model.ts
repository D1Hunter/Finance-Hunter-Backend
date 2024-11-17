import { AllowNull, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

@Table
export class Goal extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  targetAmount: number;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  savedAmount: number;

  @AllowNull(true)
  @Column(DataType.DATE)
  dueDate: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;
}