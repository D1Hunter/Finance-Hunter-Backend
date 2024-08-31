import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "../../interfaces/base.abstract.repository";
import { Transaction } from "./transaction.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TransactionRepository extends BaseAbstractRepository<Transaction> {
    constructor(@InjectModel(Transaction) transactionModel: typeof Transaction) {
        super(transactionModel);
    }
}