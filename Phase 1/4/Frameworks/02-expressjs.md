# 4.2 Express.js 🛣️

**🎥 Video Resource:** [Express.js Crash Course](https://www.youtube.com/watch?v=SccSCuHhOw0)

**Express.js** is a minimal, flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.

* **Unopinionated:** Unlike full-stack frameworks, Express provides minimal structure, giving developers freedom to design the application how they see fit (e.g., choosing their own database, templating engine, etc.).
* **Layered on HTTP:** It simplifies the raw Node.js HTTP module, offering easy-to-use methods for routing, middleware, and request/response handling.
* **Middleware Centric:** The core mechanism of Express.js is a chain of middleware functions that process the incoming HTTP request before it reaches the final route handler.

# 4.2.1 Express.js First Steps

### 1. Setup
1.  Initialize project: `npm init -y`
2.  Install Express: `npm install express`
3.  Create `server.js` (or `app.js`).

### 2. Basic Server
The minimal code needed to start an Express server:
```javascript
const express = require('express');
const app = express(); // The application object
const port = 3000;

// Define a basic route handler
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```
### 3. Running the Server
* Execute the file: `node server.js`
* Open the URL in a browser: `http://localhost:3000/`

---

## 4.2.2/- Functions.md

```markdown
# 4.2.2 Express.js Functions

| Function | Context | Description |
| :--- | :--- | :--- |
| **`express()`** | Global | The top-level function exported by the Express module. Creates an application object (`app`). |
| **`app.listen()`** | Application | Binds and listens for connections on the specified host and port. Starts the server. |
| **`app.use()`** | Application | Mounts middleware functions at a specified path. Used for logging, body parsing, security checks, etc. |
| **`app.get()`, `app.post()`, etc.**| Application | Routing methods that map an HTTP verb (GET, POST, PUT, DELETE) to a path and a handler function. |
| **`req.params`** | Request | An object containing URL parameters (captured by route segments). |
| **`res.send()`** | Response | Sends an HTTP response. Can be a string, object, array, or buffer. Automatically sets the `Content-Type` header. |
| **`res.json()`** | Response | Sends a JSON response. The preferred way to send data back from a backend API. |
| **`next()`** | Middleware | A function that, when called, executes the next middleware function in the application's stack. |

# 4.2.3 Express.js Properties

| Property | Context | Description | Example |
| :--- | :--- | :--- | :--- |
| **`req.body`** | Request | Contains key-value pairs of data submitted in the request body (e.g., from a POST request form). **Requires middleware like `express.json()` to populate.** | `const data = req.body;` |
| **`req.query`** | Request | Contains key-value pairs of the URL's query string (e.g., everything after `?`). | `GET /search?q=nodejs` -> `req.query.q` is `'nodejs'` |
| **`req.headers`** | Request | An object containing the request headers. Useful for checking authorization tokens or content types. | `req.headers.authorization` |
| **`res.status()`** | Response | A function used to set the HTTP status code for the response. | `res.status(201).json({ success: true });` |
| **`app.locals`** | Application | An object containing application-level variables, accessible by all routes. | `app.locals.siteName = 'My API';` |

# 4.2.4 Requests and Responses (req, res)

The final step in a route is handled by a callback function that receives two key objects:

### 1. The Request Object (`req`)
The `req` object represents the incoming HTTP request and contains properties and methods for accessing the request line, headers, and body.

| Feature | `req` Property | Use Case |
| :--- | :--- | :--- |
| **URL Parameters**| `req.params` | Extracting IDs from the path (`/users/:id`). |
| **Query String** | `req.query` | Retrieving optional filters/sorting (`/products?limit=10`). |
| **Request Body** | `req.body` | Reading data from POST/PUT requests (JSON payload). |
| **HTTP Method** | `req.method` | The HTTP verb used (GET, POST, etc.). |

### 2. The Response Object (`res`)
The `res` object represents the HTTP response that the server sends back to the client.

| Feature | `res` Method | Use Case |
| :--- | :--- | :--- |
| **Send JSON** | `res.json(data)` | Standard way to return API data. |
| **Set Status** | `res.status(code)` | Set the HTTP status code (e.g., 200, 404, 500). |
| **Redirect** | `res.redirect(url)` | Sends a redirect response (e.g., 302). |
| **Set Header** | `res.set('key', 'value')` | Manually setting HTTP headers. |

**The Pattern:** A backend API handler generally reads data from `req` (params, body, query), performs logic, and writes data to `res` (status, headers, JSON body).

# 4.2.5 & 4.2.6 Routers and Advanced Express Features

### 4.2.5 Express Router
As an application grows, defining all routes in a single file becomes unmanageable. The **`express.Router()`** class provides a solution by creating modular, mountable route handlers.

1.  **Create a Router File (`users.js`):**
    ```javascript
    const express = require('express');
    const router = express.Router();

    // Define routes relative to the router's mounting path
    router.get('/', (req, res) => {
        res.json({ message: 'List of users' });
    });

    router.post('/', (req, res) => {
        res.status(201).send('User created');
    });

    module.exports = router;
    ```
2.  **Mount the Router (`app.js`):**
    ```javascript
    const usersRouter = require('./users');
    // All routes defined in usersRouter will now be prefixed with '/api/users'
    app.use('/api/users', usersRouter);
    ```

### 4.2.6 Advanced Express Features

| Feature | Description | Use Case |
| :--- | :--- | :--- |
| **Middleware Chain** | A series of functions that execute sequentially. The first functions handle logging, authentication, etc., before the final handler runs. | Global logging, rate limiting, and authenticating requests. |
| **Error Handling Middleware**| A special type of middleware defined with four arguments (`(err, req, res, next)`). Express automatically forwards errors here. | Centralized logging of errors and formatting a standardized error response for the client. |
| **Template Engines** | Express supports template engines (like EJS, Handlebars) to dynamically render HTML server-side. | Required for full-stack apps that render web pages rather than just sending JSON data. |
| **CORS** | **Cross-Origin Resource Sharing**. A mechanism that allows resources on a web page to be requested from another domain outside the domain from which the first resource was served. | Essential for APIs to allow frontend applications (running on a different domain/port) to access the API server. |