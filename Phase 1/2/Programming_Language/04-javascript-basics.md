# 2.1.3 JavaScript Basics 🧠

This section covers the fundamental building blocks of the JavaScript language. Mastery here is essential before moving to application development.

# 2.1.3.1 Variables & Data Types

**📖 Article Resource:** [MDN: JavaScript Data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

### Variables
Variables are symbolic names for values. In modern JavaScript, use the following keywords:
* **`let`:** Used for variables that can be **reassigned** (changed). Has **block scope**.
* **`const`:** Used for variables that should **not be reassigned**. Also has **block scope**. The preferred default for backend development to ensure immutability.
* **`var`:** The older keyword; generally avoided due to confusing **function scope** and hoisting behavior.

### Data Types
JavaScript has seven **Primitive Data Types** and one **Reference Data Type**:

| Type | Description | Example |
| :--- | :--- | :--- |
| **string** | Textual data, must be enclosed in quotes. | `"Hello World"`, `'Node.js'` |
| **number** | Integers and floating-point numbers. | `10`, `3.14` |
| **boolean** | Logical entity, either `true` or `false`. | `true`, `false` |
| **null** | Intentional absence of any object value (primitive). | `let x = null;` |
| **undefined** | A variable has been declared but has not yet been assigned a value. | `let y;` |
| **symbol** | Used for creating unique identifiers. | `Symbol("id")` |
| **bigint** | Used for integers larger than can be represented by `number`. | `12345678901234567890n` |
| **Object** | **Non-primitive** type, used for complex data structures (Arrays, Functions, Dates, and plain Objects). | `{ key: 'value' }`, `[1, 2, 3]` |

# 2.1.3.2 Statements

A **Statement** is a piece of code that expresses a single action or command.

* **Semicolons:** Most statements in JavaScript are optionally terminated by a semicolon (`;`). While the language uses **Automatic Semicolon Insertion (ASI)**, it is considered best practice to end statements with a semicolon to avoid ambiguity.
    ```javascript
    let greeting = "Hello"; // Statement 1
    console.log(greeting);   // Statement 2
    ```
* **Blocks:** Statements can be grouped together into a block using curly braces (`{}`). This is common in functions, loops, and conditional statements.
    ```javascript
    if (isReady) {
        // This is a block of statements
        let message = "Ready.";
        console.log(message);
    }
    ```

# 2.1.3.3 "use strict"

**📖 Article Resource:** [MDN: Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

The **`"use strict"`** directive is a way to opt into a **restricted variant of JavaScript** (or "strict mode").

### Why Use Strict Mode?

1.  **Eliminates "Bad" Syntax:** It prevents the use of some poorly-designed, confusing, or "unsafe" language features that can lead to subtle bugs.
    * *Example:* It forbids creating global variables by accident (e.g., forgetting `let` or `const`).
2.  **Throws Errors:** It changes silent errors into explicit thrown errors, making bugs easier to find and fix.
3.  **Future Proofing:** It prepares your code for future versions of JavaScript that might otherwise break old "sloppy mode" code.

### Usage
* **File-level:** Placing it at the very top of a script enables strict mode for the entire file.
* **Function-level:** Placing it at the beginning of a function enables strict mode only within that function.
* **Modern JS:** Code inside **ES Modules** and **Classes** is automatically in strict mode, making the explicit declaration less common but still vital for older codebases or standalone scripts.

# 2.1.3.4 Operators ➕

**📖 Article Resource:** [MDN: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

**Operators** are symbols used to perform operations on values and variables.

| Category | Operator | Description | Example |
| :--- | :--- | :--- | :--- |
| **Assignment** | `=`, `+=`, `-=` | Assigns a value to a variable. | `x = 5;`, `y += 2;` |
| **Arithmetic** | `+`, `-`, `*`, `/`, `%` | Performs mathematical calculations. | `5 + 3` (Addition), `10 % 3` (Modulo) |
| **Comparison** | `>`, `<`, `>=`, `<=` | Compares two values and returns a boolean. | `5 > 3` (Greater than) |
| **Logical** | `&&` (AND), `||` (OR), `!` (NOT) | Combines boolean expressions. | `a && b` |
| **Equality** | **`==` (Loose)**: Compares values after type conversion. **(Avoid in production)**. | `1 == '1'` is `true` |
| **Strict Equality** | **`===` (Strict)**: Compares values **without** type conversion (best practice). | `1 === '1'` is `false` |
| **Ternary** | `condition ? val1 : val2` | A conditional operator (shorthand for `if-else`). | `x > 0 ? "Pos" : "Neg"` |

# 2.1.3.5 Type Conversion

**🎥 Video Resource:** [JavaScript Type Coercion Explained](https://www.youtube.com/watch?v=jLRnuVHwHKk)

**Type Conversion** (or Type Casting) is the process of changing a value from one data type to another, such as converting a string to a number.

### 1. Explicit Conversion (Manual)
The developer consciously performs the conversion using built-in functions:

| Target Type | Method | Example |
| :--- | :--- | :--- |
| **String** | `String(value)` or `value.toString()` | `String(123)` -> `"123"` |
| **Number** | `Number(value)` or `parseInt(string)` | `Number("123")` -> `123` |
| **Boolean** | `Boolean(value)` | `Boolean(1)` -> `true`, `Boolean(0)` -> `false` |

### 2. Implicit Conversion (Coercion)
The JavaScript engine automatically converts types during certain operations. This is a common source of bugs:

* **Addition (`+`):** If one operand is a string, the other is converted to a string (concatenation).
    ```javascript
    console.log("5" + 2); // Output: "52" (Coercion to string)
    ```
* **Other Arithmetic Operators (`-`, `*`, `/`):** Convert the operands to numbers.
    ```javascript
    console.log("5" - 2); // Output: 3 (Coercion to number)
    ```
* **Loose Equality (`==`):** Converts the operands to a common type before comparison.
    ```javascript
    console.log(0 == false); // Output: true (Coercion to number)
    ```
**Best Practice:** Use **Explicit Conversion** and **Strict Equality (`===`)** to avoid unpredictable implicit type coercion.

# 2.1.3.6 Scope 📦

**🎥 Video Resource:** [Scope in JavaScript (Global, Function, Block)](https://www.youtube.com/watch?v=KyqmbIkZGIo)

**Scope** defines the accessibility of variables, objects, and functions within different parts of your code. It dictates where a variable can be seen and used.

### 1. Global Scope
* Variables declared outside any function or block.
* Accessible from anywhere in the program (discouraged in modern development).

### 2. Function Scope
* Variables declared with **`var`** inside a function are accessible anywhere within that function, but not outside it.

### 3. Block Scope
* Variables declared with **`let`** and **`const`** inside a pair of curly braces (`{...}`) (like in an `if` block or `for` loop) are only accessible within that block.
* **Modern Best Practice:** `let` and `const` enable true block scoping, leading to cleaner and more predictable code.

### Lexical Scope
JavaScript uses **Lexical (or Static) Scope**. This means the scope of a variable is determined by **where it is defined** (written in the code), not where it is called. This is the foundation for **Closures** (see 2.1.3.10.4). 

# 2.1.3.7 Conditional Statements

**📖 Article Resource:** [MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)

**Conditional Statements** allow your program to make decisions and execute different code based on whether a condition is `true` or `false`.

### 1. `if...else if...else`
The most common decision structure.
```javascript
let temp = 25;

if (temp > 30) {
    console.log("It's hot.");
} else if (temp > 20) {
    console.log("It's warm.");
} else {
    console.log("It's cool.");
}
```
A shorthand for a simple if...else structure, ideal for assigning a value based on a condition.

```javascript
let isAuthenticated = true;
let userStatus = isAuthenticated ? "Logged in" : "Guest";
// userStatus will be "Logged in"
```
Truthy and Falsy Values
In JavaScript, any value can be evaluated as a boolean in a conditional context:

**Falsy Values:** `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN` (Not a Number).

**Truthy Values:** Any value that is not Falsy, including `"0"`, `"false"`, `[]` (empty array), and `{}` (empty object).

---

## 2.1.3.8/- Consoles.md 

# 2.1.3.8 Consoles 💬

**📖 Article Resource:** [MDN: Console](https://developer.mozilla.org/en-US/docs/Web/API/console)

The **Console API** provides a way to interact with the JavaScript runtime environment for debugging and outputting information. This is one of the most vital tools for backend development.

* **`console.log(data)`:** The primary function. Outputs a general message to the console. Excellent for inspecting variable values.
* **`console.error(data)`:** Outputs an error message. Often styled distinctly (e.g., red text) and is used to signal a problem.
* **`console.warn(data)`:** Outputs a warning message. Used for non-critical issues that should be reviewed.
* **`console.table(arrayOrObject)`:** Displays tabular data in a structured format, which is very useful for inspecting array contents or complex object properties.
* **`console.time(label)` / `console.timeEnd(label)`:** Starts and stops a timer, logging the duration to the console. Useful for basic **performance testing** (benchmarking).

# 2.1.3.9 Switches & Loops

**📖 Article Resource:** [MDN: Iteration (Loops)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

### Switch Statement
A **`switch`** statement is used to execute one block of code among many alternatives based on the value of a single expression. It's often cleaner than long `if...else if` chains.
```javascript
let day = 3;
switch (day) {
    case 1:
        console.log("Sunday");
        break; // Crucial: stops execution in the switch block
    case 3:
        console.log("Tuesday");
        break;
    default:
        console.log("Weekend or Invalid");
}
```

### Loops 
Loops execute a block of code repeatedly until a specific condition is met.

| Loop Type | Purpose | Syntax Example |
| :--- | :--- | :--- |
| `for` | Executes code a fixed number of times. | `for (let i = 0; i < 5; i++) { ... }` |
| `while `| Executes code as long as a condition is true. | `while (count < 10) { count++; }` |
| `do...while` | Executes code at least once, then checks the condition. | `do { i++; } while (i < 5)` |
| `for...of` | Iterates over the values of an iterable object (like Arrays). | `for (const item of myList) { ... }` |
| `for...in` | Iterates over the enumerable property names (keys) of an object. | `for (const key in myObject) { ... }` |

---

## 2.1.3.10/- Functions & Events.md

# 2.1.3.10 Functions & Events ✨

Functions and the event model are central to all JavaScript programming, especially backend where functions handle requests and the event loop manages concurrency.

# 2.1.3.10.1 Functions

**📖 Article Resource:** [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

A **Function** is a block of code designed to perform a particular task. It allows code to be organized, reusable, and modular.

### Function Declarations
The traditional way to define a named function.
```javascript
function calculateSum(a, b) {
    return a + b;
}
```

### Function Expressions
Defining a function and assigning it to a variable.
```javascript
const multiply = function(a, b) {
    return a * b;
};
```
### Arrow Functions (ES6+)
A concise syntax that is syntactically shorter and does not bind its own `this` value. This is the modern standard for anonymous (callback) functions.
```javascript
const square = (x) => x * x; // Concise single-expression return
```

### Arrow Functions (ES6+)
* **Parameters:** The names listed in the function definition (a and b in calculateSum).
* **Arguments:** The real values passed to the function when it is called (5 and 10 when calling calculateSum(5, 10)).

---

## 2.1.3.10.2/- Functions binding.md 

# 2.1.3.10.2 Function Binding

**🎥 Video Resource:** [JavaScript This Keyword, Call, Apply, and Bind](https://www.youtube.com/watch?v=rZc7_2YXbP8)

**Function binding** refers to explicitly setting the value of the keyword **`this`** for a function, especially when the function is passed around as a callback or method.

In JavaScript, **`this`** is dynamic and context-dependent. Its value typically changes based on *how* a function is called, not *where* it is defined.

### Methods for Explicit Binding (Call, Apply, Bind)

| Method | Description | Use Case |
| :--- | :--- | :--- |
| **`call()`** | Calls the function immediately, setting `this` and taking arguments individually. | Immediate execution with specific context. |
| **`apply()`** | Calls the function immediately, setting `this` and taking arguments as an **array**. | Immediate execution with arguments from an array. |
| **`bind()`** | Returns a **new function** permanently bound to the specified `this` value. **Does not execute immediately.** | Setting up methods to be called later (e.g., event handlers, scheduled tasks). |

### Arrow Functions and `this`
Arrow functions do not have their own `this`. They inherit the `this` value from their **surrounding (lexical) scope**. This makes them predictable and often eliminates the need for `bind()`.

# 2.1.3.10.3 Hoisting 🏗️

**🎥 Video Resource:** [What is Hoisting in JavaScript?](https://www.youtube.com/watch?v=EvfRXyKa_GI)

**Hoisting** is JavaScript's behavior of moving declarations to the top of their containing scope (either global or function scope) during the compile phase, *before* code execution.

* **Only Declarations are Hoisted:** The variable or function name is hoisted, but the **assignment (initialization) is not**.

### 1. Function Hoisting
**Function Declarations** are hoisted completely: you can call them before they are defined in the code.
```javascript
sayHello(); // Output: "Hello!" (Works due to hoisting)

function sayHello() {
    console.log("Hello!");
}
```
### 2. Variable Hoisting
Variables declared with `var` are hoisted, but they are initialized with the value `undefined`.
```javascript
console.log(x); // Output: undefined (x is hoisted, but not initialized)
var x = 10;
```

### 3. `let` and `const` Hoisting
Variables declared with `let` and `const` **are also hoisted**, but unlike `var`, they are not initialized. Attempting to access them before the declaration results in a **ReferenceError**. This period is called the **Temporal Dead Zone (TDZ)**.
* **Best Practice:** The TDZ makes `let` and `const` behavior safer and is another reason to avoid `var`.

---

## 2.1.3.10.4/- Closures.md 

# 2.1.3.10.4 Closures 🔒

**🎥 Video Resource:** [JavaScript Closures Explained](https://www.youtube.com/watch?v=vKJpN5FAeF4)

A **Closure** is the combination of a function and the lexical environment within which that function was declared.

* **Simply Put:** A closure allows a function to **access variables from an outer scope** even after the outer function has finished executing and its execution context has been closed.

### How Closures Work
When an inner function is defined, it "remembers" its surrounding scope (its "lexical environment"). If that inner function is returned, it maintains a reference to the outer scope's variables.

```javascript
function createCounter() {
    let count = 0; // Outer function variable (lexical environment)

    return function() { // The returned function forms the closure
        count += 1; // It still has access to 'count'
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2 (The state 'count' is preserved)
```
### Importance for Backend
Closures are crucial for **module patterns**, **data privacy (encapsulation)**, and creating functions that maintain state over time, a fundamental pattern in complex server-side logic.

---

## 2.1.3.10.5/- Events.md

# 2.1.3.10.5 Events

**📖 Article Resource:** [Node.js Documentation: Events](https://nodejs.org/api/events.html)

An **Event** is an action or occurrence that happens in the system being programmed, which the system can recognize and respond to.

### In the Browser (Frontend)
Events are typically triggered by user interactions (e.g., `click`, `mouseover`, `keypress`) or browser activities (e.g., `load`, `scroll`).

### In Node.js (Backend)
Backend events are crucial for handling I/O operations and concurrency:
* **System Events:** File system events (e.g., file opened, file closed).
* **Network Events:** Incoming data on a socket, a connection being closed.
* **The `EventEmitter` Module:** A core Node.js pattern that allows custom objects to emit named events and allows other objects to listen for and react to them asynchronously. This is the foundation of Node's event-driven architecture.

# 2.1.3.10.6 Event Loop 🔄

**🎥 Video Resource (MUST WATCH):** [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

The **Event Loop** is the mechanism that allows JavaScript, despite being **single-threaded**, to perform non-blocking I/O operations, making it suitable for high-concurrency backend tasks.

### The Problem
JavaScript executes code sequentially (single-threaded). If a long operation (like reading a large file or waiting for a network request) blocks the thread, the entire application freezes.

### The Solution: The Event Loop Model
1.  **Call Stack:** Where synchronous code is executed.
2.  **Web/Node.js APIs:** Browser or Node.js runtime handles asynchronous tasks (Timers, I/O, Network requests) outside the Call Stack.
3.  **Callback Queue (Task Queue):** When an asynchronous task completes (e.g., the file is read, the network request returns), its associated **callback function** is placed here.
4.  **The Loop:** The Event Loop is a continuous process that constantly checks two things:
    * Is the **Call Stack** empty?
    * Is there a **callback** in the Queue?
5.  **Execution:** If the Call Stack is empty, the Event Loop takes the first callback from the Queue and pushes it onto the Call Stack for execution.

This process ensures that I/O-heavy operations are performed off-thread, and callbacks are only run when the main thread is free.

# 2.1.3.10.7 Event Bubbling

**📖 Article Resource:** [MDN: Event bubbling and capturing](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capturing)

**Event Bubbling** is a concept primarily relevant to the DOM (Document Object Model) in the browser, but understanding it is key to handling events efficiently.

* **Definition:** When an event occurs on an element (e.g., a button click), the browser first triggers the handler on that element, then triggers the handler on its immediate parent, then the parent's parent, and so on, "bubbling up" the DOM tree until it reaches the `document` object.
* **Propagation:** The event is said to **propagate** from the target element up to the root.

### Event Capturing (The Opposite)
Before bubbling, there is a **capturing** phase, where the event travels *down* the DOM tree from the `document` to the target element.

### Event Delegation
Bubbling enables **Event Delegation**, a powerful pattern where a single event listener is placed on a high-level parent element to manage events for all its descendant elements. This is highly performant as it minimizes the number of listeners required.

# 2.1.3.10.8 Event Handling

**Event Handling** is the act of registering code (a function) to be executed when a specific event occurs.

### Event Handler (Callback Function)
The function that runs when the event fires is called the **event handler** or **callback function**. It is often passed an **Event Object** (`e` or `event`) containing details about the event.

### Methods of Handling

1.  **Standard `addEventListener` (Browser):**
    ```javascript
    myElement.addEventListener('click', (event) => {
        // Code to run on click
    });
    ```
2.  **Node.js `EventEmitter` (Backend):**
    ```javascript
    const EventEmitter = require('events');
    const myEmitter = new EventEmitter();

    // Registering the handler
    myEmitter.on('userLoggedIn', (userId) => {
        console.log(`User ${userId} is now logged in.`);
    });

    // Emitting the event
    myEmitter.emit('userLoggedIn', 42);
    ```

### Preventing Default Behavior
Inside an event handler, you can call **`event.preventDefault()`** to stop the browser's default action (e.g., stopping a link from navigating or a form from submitting).

### Stopping Propagation
You can call **`event.stopPropagation()`** to prevent the event from continuing the **bubbling** (or capturing) process to its parent elements.