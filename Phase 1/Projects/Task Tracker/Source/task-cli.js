const fs = require('fs');
const path = require('path');

// --- Configuration ---
const DB_FILE = 'tasks.json';
const DB_PATH = path.join(process.cwd(), DB_FILE);
const STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
};

// --- Utility Functions ---

/**
 * Reads tasks from the JSON file. Creates the file if it doesn't exist.
 * @returns {Array} List of tasks.
 */
function readTasks() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            // Create the file with an empty array if it doesn't exist
            fs.writeFileSync(DB_PATH, JSON.stringify([]), 'utf8');
            return [];
        }
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading or parsing the task file:", error.message);
        // Return an empty array to allow the program to continue gracefully
        return [];
    }
}

/**
 * Writes the list of tasks back to the JSON file.
 * @param {Array} tasks - The list of tasks to write.
 */
function writeTasks(tasks) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing to the task file:", error.message);
    }
}

/**
 * Finds the next available unique ID.
 * @param {Array} tasks - The current list of tasks.
 * @returns {number} The next ID.
 */
function getNextId(tasks) {
    if (tasks.length === 0) {
        return 1;
    }
    // Get the highest current ID and add 1
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    return maxId + 1;
}

/**
 * Helper to format date for createdAt/updatedAt properties.
 * @returns {string} Formatted date/time string.
 */
function getTimestamp() {
    return new Date().toISOString();
}

// --- CLI Handlers ---

/**
 * Handles the 'add' command.
 * @param {string} description - The description of the new task.
 */
function handleAdd(description) {
    if (!description) {
        console.error("Error: Task description is required for the 'add' command.");
        return;
    }

    const tasks = readTasks();
    const newId = getNextId(tasks);
    const now = getTimestamp();

    const newTask = {
        id: newId,
        description: description,
        status: STATUS.TODO,
        createdAt: now,
        updatedAt: now,
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`✅ Task added successfully (ID: ${newId})`);
}

/**
 * Handles the 'update' command.
 * @param {number} id - The ID of the task to update.
 * @param {string} newDescription - The new description for the task.
 */
function handleUpdate(id, newDescription) {
    if (!id || !newDescription) {
        console.error("Error: Task ID and new description are required for the 'update' command.");
        return;
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = getTimestamp();

    writeTasks(tasks);
    console.log(`✏️ Task ${id} updated successfully.`);
}

/**
 * Handles the 'delete' command.
 * @param {number} id - The ID of the task to delete.
 */
function handleDelete(id) {
    if (!id) {
        console.error("Error: Task ID is required for the 'delete' command.");
        return;
    }

    const tasks = readTasks();
    const initialLength = tasks.length;
    
    const newTasks = tasks.filter(task => task.id !== Number(id));

    if (newTasks.length === initialLength) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }

    writeTasks(newTasks);
    console.log(`🗑️ Task ${id} deleted successfully.`);
}

/**
 * Handles 'mark-in-progress' and 'mark-done' commands.
 * @param {number} id - The ID of the task.
 * @param {string} newStatus - The new status (STATUS.IN_PROGRESS or STATUS.DONE).
 */
function handleMarkStatus(id, newStatus) {
    if (!id) {
        console.error(`Error: Task ID is required for the '${newStatus.replace('-', ' ')}' command.`);
        return;
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].status = newStatus;
    tasks[taskIndex].updatedAt = getTimestamp();

    writeTasks(tasks);
    
    const action = newStatus === STATUS.DONE ? 'completed' : 'set to in-progress';
    console.log(`🌟 Task ${id} ${action} successfully.`);
}

/**
 * Handles the 'list' command.
 * @param {string} filterStatus - Optional status to filter by (todo, in-progress, done).
 */
function handleList(filterStatus) {
    const tasks = readTasks();
    let filteredTasks = tasks;
    let title = "ALL TASKS";
    
    // Validate and apply filter
    if (filterStatus) {
        const statusKey = filterStatus.toUpperCase().replace('-', '_');
        if (STATUS[statusKey]) {
            filteredTasks = tasks.filter(task => task.status === STATUS[statusKey]);
            title = `${STATUS[statusKey].toUpperCase().replace('-', ' ')} TASKS`;
        } else if (filterStatus === STATUS.TODO) {
            filteredTasks = tasks.filter(task => task.status === STATUS.TODO);
            title = "TO DO TASKS";
        } else {
            console.error(`Error: Invalid status filter '${filterStatus}'. Use 'done', 'todo', or 'in-progress'.`);
            return;
        }
    }

    if (filteredTasks.length === 0) {
        console.log(`\n-- No ${title.toLowerCase()} found. --\n`);
        return;
    }

    console.log(`\n--- ${title} (${filteredTasks.length}) ---\n`);
    
    // Determine max width for table-like output
    const idWidth = Math.max(2, ...filteredTasks.map(t => String(t.id).length));
    const statusWidth = Math.max(12, ...Object.values(STATUS).map(s => s.length));

    filteredTasks.forEach(task => {
        const idStr = String(task.id).padStart(idWidth, ' ');
        const statusStr = task.status.padEnd(statusWidth, ' ');
        
        let statusDisplay = `[${statusStr}]`;
        
        // Simple color/symbol coding for status
        if (task.status === STATUS.DONE) {
            statusDisplay = `\x1b[32m[${statusStr}]\x1b[0m`; // Green for Done
        } else if (task.status === STATUS.IN_PROGRESS) {
            statusDisplay = `\x1b[33m[${statusStr}]\x1b[0m`; // Yellow for In-Progress
        } else {
            statusDisplay = `\x1b[36m[${statusStr}]\x1b[0m`; // Cyan for Todo
        }

        console.log(`${idStr}. ${statusDisplay} - ${task.description}`);
        // Optional detail line (can be uncommented for more info)
        // console.log(`   Created: ${new Date(task.createdAt).toLocaleDateString()} | Updated: ${new Date(task.updatedAt).toLocaleDateString()}`);
    });
    console.log(`\n--------------------------------------\n`);
}

/**
 * Displays the help message.
 */
function displayHelp() {
    const usage = `
Task Tracker CLI Usage:

General Commands:
  task-cli <command> [arguments...]

Available Commands:
  add "<description>"            Add a new task.
  update <id> "<new description>" Update a task's description.
  delete <id>                    Delete a task by ID.
  mark-in-progress <id>          Set a task's status to 'in-progress'.
  mark-done <id>                 Set a task's status to 'done'.
  list [status_filter]           List all tasks or filter by status.
  help                           Display this help message.

Status Filters for 'list':
  list todo
  list in-progress
  list done

Example Usage:
  task-cli add "Submit project report"
  task-cli mark-in-progress 1
  task-cli list in-progress
  task-cli update 1 "Submit final project report"
  task-cli delete 1
    `;
    console.log(usage);
}


// --- Main Execution Logic ---

function main() {
    // process.argv is [node_path, script_path, command, arg1, arg2, ...]
    const args = process.argv.slice(2);
    const command = args[0];
    const arg1 = args[1];
    const arg2 = args[2];

    if (!command || command === 'help') {
        displayHelp();
        return;
    }
    
    // Validate ID where expected
    if (['update', 'delete', 'mark-in-progress', 'mark-done'].includes(command) && isNaN(Number(arg1))) {
        console.error(`Error: The second argument for '${command}' must be a valid Task ID (a number).`);
        return;
    }

    // Command Dispatcher
    switch (command) {
        case 'add':
            handleAdd(arg1);
            break;
        case 'update':
            handleUpdate(arg1, arg2);
            break;
        case 'delete':
            handleDelete(arg1);
            break;
        case 'mark-in-progress':
            handleMarkStatus(arg1, STATUS.IN_PROGRESS);
            break;
        case 'mark-done':
            handleMarkStatus(arg1, STATUS.DONE);
            break;
        case 'list':
            handleList(arg1); // arg1 is the optional filter
            break;
        default:
            console.error(`Error: Unknown command '${command}'. Use 'task-cli help' for usage.`);
            break;
    }
}

main();