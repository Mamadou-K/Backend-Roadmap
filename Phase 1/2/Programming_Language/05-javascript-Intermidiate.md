# 2.1.4 JavaScript Intermediate 🛠️

This section covers data structures, organization, and concurrency patterns necessary for building real-world backend applications.

# 2.1.4.1 Data Structures

**📖 Article Resource:** [MDN: JavaScript Data Structures (Map, Set)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)

JavaScript uses objects and arrays as its fundamental building blocks, but it also provides specialized data structures for common programming needs.

| Structure | Description | Use Case |
| :--- | :--- | :--- |
| **Array** | An ordered, indexed list of values. Allows duplicates. | Storing lists of users, products, or log entries. |
| **Object** | A collection of key-value pairs (properties). Keys are unique strings (or Symbols). | Representing complex entities like a user profile or a configuration file. |
| **Map** | A collection of key-value pairs where the keys can be **any data type** (not just strings). Maintains key insertion order. | Storing mappings where keys are complex objects or functions. |
| **Set** | A collection of unique values. Duplicates are automatically removed. | Checking for the existence of an item or eliminating duplicates from a list. |
| **Stack/Queue** | Implemented using Arrays. Stacks are LIFO (Last-In, First-Out), Queues are FIFO (First-In, First-Out). | Managing function calls (Stack) or managing tasks in the Event Loop (Queue). |

# 2.1.4.2 Object-Oriented Programming (OOP)

**🎥 Video Resource:** [Object-Oriented Programming, Simplified](https://www.youtube.com/watch?v=pTB0EiLXUC8)

**Object-Oriented Programming (OOP)** is a paradigm centered around objects, which contain both data (properties) and methods (functions).

### Classes (ES6+)
JavaScript uses **Prototypal Inheritance** under the hood, but the **`class`** keyword (introduced in ES6) provides familiar, syntactic sugar for OOP.

```javascript
// Defining a Class
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // A method
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
```
### Key OOP Concepts 
* **Encapsulation:** Bundling data (properties) and the methods that operate on that data into a single unit (the class/object). Closures are often used to achieve data privacy.

* **Inheritance:** Creating new classes based on existing ones, inheriting their properties and methods.
```javascript 
class Admin extends User { // 'extends' keyword
    // ...
}
```
* **Polymorphism:** The ability of an object to take on many forms, often achieved through method overriding.

---

## 2.1.4.3/- Asynchronous JavaScript.md (Updated)

```markdown
# 2.1.4.3 Asynchronous JavaScript ⏳

**🎥 Video Resource (Async/Await):** [Async Await JavaScript Tutorial For Beginners](https://www.youtube.com/watch?v=670f71LTWpM)

**Asynchronous programming** is fundamental to Node.js backend development, as it allows your server to handle thousands of requests without blocking the main thread.

### 1. Callbacks (The Old Way)
Functions passed as arguments to other functions, to be executed when the asynchronous operation completes.
* **Problem:** Led to "Callback Hell" (deeply nested, unreadable code).

### 2. Promises (The Standard)
An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
* **States:** A Promise can be **Pending**, **Fulfilled** (resolved), or **Rejected**.
* **Methods:** `then()` handles success, `catch()` handles failure, and `finally()` runs regardless.
* **Chainability:** Promises can be chained together using `.then()`, leading to cleaner sequential logic.

### 3. Async/Await (The Modern Way)
Syntactic sugar built on top of Promises, allowing asynchronous code to be written and read as if it were synchronous.
* **`async` keyword:** Declares a function that returns a Promise.
* **`await` keyword:** Pauses the execution of the `async` function until the Promise it precedes is resolved.

```javascript
async function fetchUserData(id) {
    try {
        // The await pauses the function until the promise resolves
        const response = await fetch(`user/${id}`);
        const user = await response.json();
        return user;
    } catch (error) {
        // Handles rejections from any await in the block
        console.error("Fetch failed:", error);
    }
}
```