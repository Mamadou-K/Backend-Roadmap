# 💰 Expense Tracker CLI

A Command Line Interface (CLI) app built with Node.js to manage your expenses.

You can add, update, delete, view expenses, and show summaries — all from the terminal.

---

## ⚙️ How to Create the Project

1. **Create the project folder**
```bash
   mkdir expense-tracker
   cd expense-tracker
```

2. **Create the main file**
```bash
   touch expense-tracker.js
```

3. **Copy the provided code** into `expense-tracker.js`.

4. **Check Node.js is installed**
```bash
   node -v
```
5. **Run the app**
```bash
   node expense-tracker.js <command> [arguments]
```
6. A file named `tasks.json` will be created automatically to store your tasks.

## 💡 Tips
* Use quotes `" "` for task descriptions with spaces.
* Use **positive numbers** for amounts.
* Check you are in the correct folder when running commands.
* Open `expenses.json` to see saved expenses.
* Each expense has:

    * `id` → unique number
    * `description` → expenses description
    * `amount` → expense amount
    * `date` → timestamp

## 🧩 Commands
The game is fully interactive via CLI:

| Action               | Prompt / Input       
| -----------------    | --------------------------------------------         |
| Add an expense       | add --description "desc" --amount 10                 |
| Update an expense    | update --id 1 [--description "desc"] [--amount 10]   |
| Delete an expense    | delete --id 1                                        |
| List all expenses    | list                                                 |
| Show summary         | summary                                              |
| Show monthly summary | summary --month 8                                    |


## 📥 Example Input / Output

```bash 
node expense-tracker.js add --description "Lunch" --amount 20
# Output
✅ Expense added successfully (ID: 1)

node expense-tracker.js summary
# Output
Total expenses: $20

```

## 🧰 Learning Outcomes

By building this project, you will learn to:

* Create a CLI tool using Node.js
* Read and write JSON files
* Handle command-line arguments
* Implement basic CRUD operations
* Track and summarize data

## 🏁 Next Steps / Ideas

* Add a timer to track how long each round takes
* Implement a hint system (e.g., "number is even")
* Track high scores (fewest attempts per difficulty)
* Add colorful CLI output for fun
* Convert the game into a web-based version with HTML/CSS/JS