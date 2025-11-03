# 6 APIs (Application Programming Interfaces) 🔗

An **API** (Application Programming Interface) is a set of rules and protocols that allows different software components to communicate with each other. In web development, APIs primarily define the methods and data formats that client applications (like a frontend website or a mobile app) can use to interact with a backend service.

* **Contract:** An API acts as a **contract** between the client and the server, specifying what data can be requested and how.
* **Abstraction:** It hides the complexity of the server's internal logic, databases, and configuration, exposing only the necessary functionality.

# 6.1 What's an API?

**🎥 Video Resource:** [APIs for Beginners - How to use an API (Full Course)](https://www.youtube.com/watch?v=WXsD0ZgxjRw)

### Definition
An API is essentially a messenger that takes requests from a system, translates them into actions the server can perform, and then returns the server's response back to the client.

### Key Components of a Web API
1.  **URL (Endpoint):** The specific address where the resource can be accessed (e.g., `https://api.myapp.com/users/1`).
2.  **HTTP Method:** The action to be performed on the resource (**GET**, **POST**, **PUT**, **DELETE**).
3.  **Headers:** Metadata used for things like authentication, content type, and caching.
4.  **Body (Payload):** The data sent with the request (used primarily for POST and PUT).

# 6.1.1 REST (Representational State Transfer)

**📖 Article Resource:** [Rest API Concepts Explained](https://www.geeksforgeeks.org/node-js/rest-api-introduction/)

**REST** is a set of architectural constraints for designing networked applications, forming the basis of nearly all modern web APIs. An API that adheres to these constraints is called a **RESTful API**.

### Key REST Constraints
1.  **Client-Server Architecture:** Separation of concerns, allowing clients and servers to evolve independently.
2.  **Statelessness:** The server must not store any client context between requests. Every request from the client must contain all the information needed to process the request. (This is fundamental for scalability).
3.  **Cacheability:** Responses must explicitly define whether they can be cached by the client or an intermediary.
4.  **Uniform Interface:** The primary constraint, dictating how interactions should occur:
    * **Resource Identification:** Individual resources are identified in requests (e.g., `/users/1`).
    * **Manipulation via Representations:** Clients modify resources by sending representations (e.g., JSON payload) of the new state.
    * **Self-Descriptive Messages:** Messages include metadata to explain how to process them (e.g., HTTP status codes).

### HTTP Methods as Actions (CRUD Mapping)
| HTTP Method | REST Action | CRUD Equivalent | Description |
| :--- | :--- | :--- | :--- |
| **GET** | Retrieve a resource or collection. | **Read** | Safe and idempotent (multiple calls have no extra effect). |
| **POST** | Create a new resource. | **Create** | Not idempotent (multiple calls create multiple resources). |
| **PUT** | Completely replace/update an existing resource. | **Update** | Idempotent (sending the same data twice results in the same state). |
| **DELETE** | Remove a resource. | **Delete** | Idempotent. |
| **PATCH** | Partially update an existing resource. | **Update** | Not strictly required by REST but widely used. |