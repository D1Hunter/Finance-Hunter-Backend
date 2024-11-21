import "dotenv/config";
import { randomUUID } from "node:crypto";
import { Sequelize } from 'sequelize-typescript';
import { Category } from "../modules/category/category.model";
import { Transaction } from "../modules/transaction/transaction.model";
import { Budget } from "../modules/budget/budget.model";
import { User } from "../modules/user/user.model";
import { Token } from "../modules/auth/token.model";
import { randomBytes, scrypt } from 'node:crypto';

function getRandomDateInMonth(year: number, month: number): Date {
  const day = Math.floor(Math.random() * 28) + 1; // Вибір дня між 1 і 28
  return new Date(year, month, day);
}

async function seedDatabase() {
  const sequelize = new Sequelize(
    "finance_hunter",
    "postgres",
    "sh_1885", {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    models: [Category, Transaction, Budget, Token,User],
    logging: false
  });
  try {
    const user = await User.create({
      id: randomUUID(),
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: await hashPassword('test1234'),
    });

    // Seed categories
    const categories = await Category.bulkCreate([
      { id: randomUUID(), name: "Food" },
      { id: randomUUID(), name: "Utilities" },
      { id: randomUUID(), name: "Transportation" },
      { id: randomUUID(), name: "Entertainment" },
      { id: randomUUID(), name: "Health" },
    ]);

    console.log("Categories seeded successfully!");

    // Seed transactions
    await Transaction.bulkCreate([
      {
        id: randomUUID(),
        ammount: 50.0,
        type: 'Expense',
        description: 'Groceries',
        categoryId: categories[0].id, // Food
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадкова дата в межах 2023 року
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        ammount: 100.0,
        type: 'Expense',
        description: 'Electricity Bill',
        categoryId: categories[1].id, // Utilities
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадкова дата
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        ammount: 20.0,
        type: 'Expense',
        description: 'Bus Fare',
        categoryId: categories[2].id, // Transportation
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадкова дата
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        ammount: 150.0,
        type: 'Income',
        description: 'Freelance Job',
        categoryId: categories[3].id, // Entertainment
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадкова дата
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        ammount: 200.0,
        type: 'Income',
        description: 'Salary',
        categoryId: categories[4].id, // Health
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадкова дата
        updatedAt: new Date(),
      },

      // Додаємо 45 нових транзакцій з випадковими датами по місяцях
      ...Array(450).fill(null).map((_, index) => ({
        id: randomUUID(),
        ammount: (Math.random() * 500).toFixed(2), // випадкові суми між 0 і 500
        type: index % 2 === 0 ? 'Expense' : 'Income', // Чередування Expense та Income
        description: `Transaction ${index + 6}`,
        categoryId: categories[index % categories.length].id, // Вибір категорії по циклу
        userId: user.id,
        createdAt: getRandomDateInMonth(2023, Math.floor(Math.random() * 12)), // Випадковий місяць
        updatedAt: new Date(),
      }))
    ]);


    console.log("Transactions seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

async function hashPassword(password:string):Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const keylen = 64;
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keylen, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

seedDatabase();