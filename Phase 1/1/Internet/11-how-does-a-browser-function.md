# 1.4.1 How Does a Browser Function?

A browser functions by executing a series of complex steps to translate raw data from a server into an interactive visual experience.

### The Basic Flow (Parsing and Rendering)

1.  **Input & Request:** The user types a URL. The browser starts the **DNS lookup** and **TCP handshake** to establish a connection with the server.
2.  **Response & Parsing:** The browser receives the server's HTTP response, which contains the website's HTML, CSS, and JavaScript.
    * **HTML Parsing:** The browser's rendering engine reads the HTML and constructs the **Document Object Model (DOM)**—a tree structure representing the document's content.
3.  **CSS and Layout:** The browser fetches and parses the CSS, constructing the **CSS Object Model (CSSOM)**. It then combines the DOM and CSSOM to determine the layout of all elements on the page (the **Render Tree**).
4.  **JavaScript Execution:** The **JavaScript Engine** (like V8 in Chrome) executes the JavaScript code. Since JavaScript can modify the DOM and CSSOM, its execution is often **blocking** (pauses rendering) unless explicitly loaded asynchronously.
5.  **Painting & Display:** The browser paints the elements onto the screen based on the render tree, applying styles and positioning.
6.  **Interactivity:** The browser listens for user actions (**Events**) and executes associated JavaScript handlers to update the page without needing a full reload (a key feature of modern web apps).