# 2.1.2 How to Execute JS

**🎥 Video Resource:** [Node.js Tutorial for Beginners: What is Node.js?](https://www.youtube.com/watch?v=TlB_eWDSMt4) (Focuses on the backend runtime)

JavaScript can be executed in two primary environments relevant to a backend developer:

### 1. The Browser (Frontend Context)
* **Engine:** Executed by the browser's built-in **JavaScript engine** (e.g., V8 in Chrome, SpiderMonkey in Firefox).
* **Methods:**
    * **Inline:** `<script> console.log("Hello!"); </script>` directly in the HTML.
    * **External File:** Linking to a `.js` file via `<script src="file.js"></script>`.
* **Scope:** The code interacts with the **Document Object Model (DOM)** and the browser's window environment.

### 2. Node.js Runtime (Backend Context)
* **Engine:** Executed by the **Node.js runtime environment** (which uses the V8 engine).
* **Method:** Run directly from the command line using the `node` command.
    ```bash
    # Assuming your code is in 'app.js'
    $ node app.js
    ```
* **Scope:** The code interacts with the operating system, file system, network, and standard input/output. **This is the primary method for backend development.**