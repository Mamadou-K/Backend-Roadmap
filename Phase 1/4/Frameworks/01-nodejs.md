# 4 Frameworks 🏗️

A **framework** is a pre-written, reusable structure that provides generic functionality for developing an application. Frameworks define the structure and flow of control, forcing developers to adhere to a specific pattern (Inversion of Control).

# 4.1 Node.js 🟩

**🎥 Video Resource:** [What is Node.js?](https://www.youtube.com/watch?v=q-xS25lsN3I)

**Node.js** is an open-source, cross-platform **JavaScript runtime environment** that executes JavaScript code outside of a web browser. It is built on Google's **V8 JavaScript engine** (the same engine used in Chrome).

### Key Characteristics
* **Event-Driven:** It uses the **Event Loop** to handle events and execute callbacks (see 2.1.3.10.6).
* **Non-Blocking I/O:** Ideal for applications that handle high volumes of concurrent connections and I/O-heavy tasks (e.g., reading from a database, file system, or network sockets).
* **Single-Threaded:** It operates on a single thread, which prevents many common concurrency issues found in multi-threaded languages.
* **Use Cases:** Building fast, scalable network applications like APIs, web servers, streaming services, and microservices.

# 4.1.1 Node.js Basics

| Concept | Description | Command/Example |
| :--- | :--- | :--- |
| **REPL** | **Read-Eval-Print Loop**. The interactive environment for testing quick JavaScript snippets. | Run `node` in your terminal. |
| **Global Object** | Similar to the browser's `window` object, but specific to Node. Contains core utilities like `process`, `__dirname`, and `module`. | `console.log(__dirname);` |
| **`process`** | A global object providing information about, and control over, the current Node.js process. | `process.exit(1);`, `process.env` |
| **`Buffer`** | A global class used to handle raw binary data (e.g., when reading files or network streams). | `const buf = Buffer.from('hello');` |
| **Streams** | Abstract interfaces for working with data in a sequential, chunk-by-chunk manner. Critical for handling large files or network traffic efficiently. | `fs.createReadStream('file.txt');` |

# 4.1.2 Filesystem (fs)

**📖 Article Resource:** [Node.js Docs: File System (fs) module](https://nodejs.org/api/fs.html)

The **`fs`** module provides an API for interacting with the file system of the operating system.

### Core Functions
All file system functions have three variants:

1.  **Synchronous (Blocking):** Ends in `Sync` (e.g., `readFileSync`). The function runs on the main thread and blocks execution until the operation is complete. **Avoid in web servers.**
2.  **Asynchronous (Callback-based):** Takes a callback function as the last argument (e.g., `readFile`). Runs non-blocking. (Older style)
3.  **Asynchronous (Promise-based):** Accessed via `require('fs').promises`. The modern, recommended way for non-blocking I/O with `async/await`.

| Task | Promise-based Function (Recommended) | Description |
| :--- | :--- | :--- |
| **Read File** | `fs.promises.readFile(path, encoding)` | Reads the entire file content into a buffer or string. |
| **Write File** | `fs.promises.writeFile(path, data)` | Writes data to a file, overwriting the file if it already exists. |
| **Append Data** | `fs.promises.appendFile(path, data)` | Appends data to a file. |
| **Check Existence** | `fs.promises.access(path)` | Checks if the user has read/write/execute permissions. |
| **Delete File** | `fs.promises.unlink(path)` | Deletes a file. |

# 4.1.3 & 4.1.4 Modules and NPM 📦

### 4.1.3 Node.js Modules
Modules are the fundamental mechanism for structuring and organizing Node.js code. They promote encapsulation and reusability.

* **CommonJS (CJS):** The original, default module system in Node.js.
    * **Export:** `module.exports = { ... }` or `exports.functionName = ...`
    * **Import:** `const moduleName = require('./path/to/module');`
* **ES Modules (ESM):** The modern, standardized module system now fully supported by Node.js (often using `.mjs` extension or `"type": "module"` in `package.json`).
    * **Export:** `export { functionName };` or `export default functionName;`
    * **Import:** `import { functionName } from './path/to/module';`

### 4.1.4 NPM (Node Package Manager)
**NPM** is the default package manager for Node.js and the largest software registry in the world.

* **Purpose:** It manages project dependencies (external libraries and packages) and facilitates sharing JavaScript code.
* **`package.json`:** The manifest file for a Node.js project. It lists metadata, scripts, and all project dependencies.
* **`node_modules`:** The directory where NPM installs all dependencies for your project.

| Command | Description |
| :--- | :--- |
| `npm init -y` | Creates a default `package.json` file. |
| `npm install [package]` | Downloads and installs a package, adding it to the `dependencies` list. |
| `npm install -D [package]` | Downloads and installs a package, adding it to `devDependencies` (for testing/building). |
| `npm uninstall [package]` | Removes a package from `node_modules` and `package.json`. |
| `npm start` | Runs the command defined under the `start` script in `package.json`. |
| `npm run [script]` | Executes a custom script defined in `package.json`. |
