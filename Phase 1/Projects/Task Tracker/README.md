# 🗂️ Task Tracker CLI

A simple **Command Line Interface (CLI)** app built with **Node.js** to track and manage your tasks.

You can **add**, **update**, **delete**, and **mark tasks** as **todo**, **in-progress**, or **done** — all from the terminal.

---

## ⚙️ How to Create the Project

1. **Create the project folder**
```bash
   mkdir task-tracker
   cd task-tracker
```

2. **Create the main file**
```bash
   touch task-cli.js
```

3. **Copy the provided code** into `task-cli.js`.

4. **Check Node.js is installed**
```bash
   node -v
```
5. **Run the app**
```bash
   node task-cli.js <command> [arguments]
```

6. A file named `tasks.json` will be created automatically to store your tasks.

## 💡 Tips
* Use quotes `" "` for task descriptions with spaces.

* Check that you are in the correct folder when running commands.

* Open `tasks.json` to see saved tasks.

* Each task has:

    * `id` → unique number

    * `description` → task text

    * `status` → `todo`, `in-progress`, `done`

    * `createdAt` & `updatedAt` → timestamps

## 🧩 Commands

| Action                 | Command                         | Example                                                     |
| ---------------------- | ------------------------------- | ----------------------------------------------------------- |
| Add a task             | `add "description"`             | `node task-cli.js add "Learn JS Basics"`                    |
| Update a task          | `update <id> "new description"` | `node task-cli.js update 1 "Learn JS Basics and async/sync"`|
| Delete a task          | `delete <id>`                   | `node task-cli.js delete 1`                                 |
| Mark in-progress       | `mark-in-progress <id>`         | `node task-cli.js mark-in-progress 2`                       |
| Mark done              | `mark-done <id>`                | `node task-cli.js mark-done 2`                              |
| List all tasks         | `list`                          | `node task-cli.js list`                                     |
| List done tasks        | `list done`                     | `node task-cli.js list done`                                |
| List todo tasks        | `list todo`                     | `node task-cli.js list todo`                                |
| List in-progress tasks | `list in-progress`              | `node task-cli.js list in-progress`                         |

## 📥 Example Input / Output

```bash 
# Add a task
node task-cli.js add "Finish homework"

# Output
✅ Task added successfully (ID: 1)
```

```bash 
    # List tasks
node task-cli.js list

# Output
📋 Task List:
#1 [todo] - Finish homework (updated: 2025-10-19T19:10:00.000Z)
```

## 🧰 Learning Outcomes

By building this project, you will learn to:

* Create a CLI tool using Node.js
* Read and write data in JSON files
* Handle command-line arguments
* Implement basic CRUD operations
* Manage task states (todo, in-progress, done)
* Work with timestamps (createdAt, updatedAt)

## 🏁 Next Steps / Ideas

* Add task priorities or due dates
* Implement search or filtering by keyword
* Convert to an Express.js REST API project
* Add unit tests for learning testing basics