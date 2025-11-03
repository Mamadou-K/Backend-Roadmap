const fs = require("fs");
const path = require("path");

// --- Configuration ---
const DB_FILE = "expenses.json";                     // JSON file to store expenses
const DB_PATH = path.join(process.cwd(), DB_FILE);

// --- Utility Functions ---

/**
 * Reads expenses from JSON file, creates file if not exists
 * @returns {Array} List of expenses
 */
function readExpenses() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([]), "utf8");
      return [];
    }
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading expense file:", error.message);
    return [];
  }
}

/**
 * Writes expenses array back to JSON file
 * @param {Array} expenses
 */
function writeExpenses(expenses) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(expenses, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing expense file:", error.message);
  }
}

/**
 * Generates next ID for new expense
 * @param {Array} expenses
 * @returns {number}
 */
function getNextId(expenses) {
  if (expenses.length === 0) return 1;
  return Math.max(...expenses.map(e => e.id)) + 1;
}

/**
 * Formats current date as YYYY-MM-DD
 * @returns {string}
 */
function getDate() {
  return new Date().toISOString().split("T")[0];
}

// --- Expense Class ---
class Expense {
  constructor(description, amount) {
    this.id = 0; // Will be assigned when added
    this.date = getDate();
    this.description = description;
    this.amount = amount;
  }
}

// --- Expense Tracker Class ---
class ExpenseTracker {
  constructor() {
    this.expenses = readExpenses();
  }

  /**
   * Add a new expense
   * @param {string} description
   * @param {number} amount
   */
  add(description, amount) {
    if (!description || isNaN(amount) || amount <= 0) {
      console.error("Invalid description or amount.");
      return;
    }
    const expense = new Expense(description, Number(amount));
    expense.id = getNextId(this.expenses);
    this.expenses.push(expense);
    writeExpenses(this.expenses);
    console.log(`✅ Expense added successfully (ID: ${expense.id})`);
  }

  /**
   * Update an existing expense
   * @param {number} id
   * @param {string} description
   * @param {number} amount
   */
  update(id, description, amount) {
    const index = this.expenses.findIndex(e => e.id === Number(id));
    if (index === -1) {
      console.error(`Expense with ID ${id} not found.`);
      return;
    }
    if (description) this.expenses[index].description = description;
    if (!isNaN(amount) && amount > 0) this.expenses[index].amount = Number(amount);
    writeExpenses(this.expenses);
    console.log(`✏️ Expense ${id} updated successfully.`);
  }

  /**
   * Delete an expense
   * @param {number} id
   */
  delete(id) {
    const initialLength = this.expenses.length;
    this.expenses = this.expenses.filter(e => e.id !== Number(id));
    if (this.expenses.length === initialLength) {
      console.error(`Expense with ID ${id} not found.`);
      return;
    }
    writeExpenses(this.expenses);
    console.log(`🗑️ Expense ${id} deleted successfully.`);
  }

  /**
   * List all expenses
   */
  list() {
    if (this.expenses.length === 0) {
      console.log("No expenses recorded yet.");
      return;
    }
    console.log("\nID  Date       Description        Amount");
    console.log("--  ----       -----------        ------");
    this.expenses.forEach(e => {
      console.log(
        `${e.id.toString().padEnd(2)}  ${e.date}  ${e.description.padEnd(15)}  $${e.amount}`
      );
    });
    console.log("");
  }

  /**
   * Show summary (total or monthly)
   * @param {number} month - optional (1-12)
   */
  summary(month) {
    let filtered = this.expenses;
    if (month) {
      filtered = filtered.filter(e => new Date(e.date).getMonth() + 1 === Number(month));
      console.log(
        `Total expenses for month ${month}: $${filtered.reduce((a, b) => a + b.amount, 0)}`
      );
    } else {
      console.log(`Total expenses: $${filtered.reduce((a, b) => a + b.amount, 0)}`);
    }
  }
}

// --- CLI Handling ---
function main() {
  const tracker = new ExpenseTracker();
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "add":
      const descIndex = args.indexOf("--description");
      const amountIndex = args.indexOf("--amount");
      const description = descIndex !== -1 ? args[descIndex + 1] : null;
      const amount = amountIndex !== -1 ? args[amountIndex + 1] : null;
      tracker.add(description, amount);
      break;

    case "update":
      const idIndex = args.indexOf("--id");
      const newDescIndex = args.indexOf("--description");
      const newAmountIndex = args.indexOf("--amount");
      const id = idIndex !== -1 ? args[idIndex + 1] : null;
      const newDesc = newDescIndex !== -1 ? args[newDescIndex + 1] : null;
      const newAmount = newAmountIndex !== -1 ? args[newAmountIndex + 1] : null;
      tracker.update(id, newDesc, newAmount);
      break;

    case "delete":
      const delIndex = args.indexOf("--id");
      const delId = delIndex !== -1 ? args[delIndex + 1] : null;
      tracker.delete(delId);
      break;

    case "list":
      tracker.list();
      break;

    case "summary":
      const monthIndex = args.indexOf("--month");
      const month = monthIndex !== -1 ? args[monthIndex + 1] : null;
      tracker.summary(month);
      break;

    default:
      console.log(`Commands:
add --description "desc" --amount 10
update --id 1 [--description "desc"] [--amount 10]
delete --id 1
list
summary [--month 8]`);
      break;
  }
}

main();
