# 5.2 Non-Relational Databases (NoSQL) ⚛️

**NoSQL** (Not Only SQL) databases are a diverse group of database management systems that were developed to handle specific data models and overcome the limitations of relational databases, particularly concerning massive scale and flexible schema.

* **Key Advantage:** Offers flexible schemas, allowing developers to quickly iterate and store data without pre-defining a rigid structure.
* **Focus:** Emphasizes high availability, horizontal scaling (distributing data across multiple servers), and performance over strict ACID consistency (often using **BASE** properties).

### Four Main Types
1.  **Document Databases (e.g., MongoDB):** Stores data in flexible, semi-structured documents (usually JSON/BSON format).
2.  **Key-Value Databases (e.g., Redis):** Simple storage for key-value pairs. Extremely fast access.
3.  **Graph Databases (e.g., Neo4j):** Designed to store and traverse relationships between entities (nodes).
4.  **Column-Family Databases (e.g., Cassandra):** Stores data in columns instead of rows, optimized for wide data tables.

# 5.2.1 NoSQL Databases Intro

**🎥 Video Resource:** [SQL vs NoSQL Explained](https://www.youtube.com/watch?v=_Ss42Vb1SU4)

The rise of massive-scale web applications (like Facebook and Google) and the need to store diverse, fast-changing data led to the adoption of NoSQL.

### When to Use NoSQL
NoSQL is often the best choice when:

1.  **Schema is Flexible/Changing:** The data requirements change frequently, or data from different documents/objects does not share the same fields (e.g., user profiles, product catalogs with varying attributes).
2.  **High Scalability is Needed:** You need to distribute read/write load across many servers effortlessly (horizontal scaling).
3.  **Speed is Critical:** You need extremely fast read/write times for specific data access patterns (e.g., caching, session storage).
4.  **Relationships are Less Important:** Data can be effectively stored in an aggregated, document-centric way (**denormalization**).

# 5.2.2 NoSQL Basics (Denormalization)

### Denormalization
Unlike SQL, NoSQL often encourages **denormalization**, where related data is stored together in a single document.

* **SQL (Normalized):** A Post table has a `userId` foreign key. To get the post *and* the user name, you must use a `JOIN`.
* **NoSQL (Denormalized):** The Post document includes the full `userName` and `userId` directly. To get the post and the user name, you only need one query.

This speeds up reads (since no joins are required) but can complicate updates (since the user name must be updated in multiple Post documents).

### NoSQL CRUD Operations
Instead of a single language (SQL), operations are usually performed using API methods specific to the database and language (e.g., JavaScript).

| CRUD Operation | MongoDB Method (Conceptual) | Description |
| :--- | :--- | :--- |
| **C**reate | `db.collection.insertOne()` | Inserts a single document. |
| **R**ead | `db.collection.find({ query })` | Finds documents matching a query (e.g., `find({ status: 'active' })`). |
| **U**pdate | `db.collection.updateOne()` | Modifies one or more existing documents. |
| **D**elete | `db.collection.deleteOne()` | Removes one or more documents. |

# 5.2.3 NoSQL Database Design (Embedding vs. Referencing)

NoSQL design in document databases (like MongoDB) revolves around determining the right level of **data aggregation** within a document.

### 1. Embedding (Denormalization)
* **Concept:** Storing related data within a single document.
* **Pros:** Fast reads (one query, no joins), data is retrieved in a single request.
* **Cons:** Documents can become very large, requiring updates to multiple locations if the embedded data changes.
* **Use Case:** Small, frequently accessed related data (e.g., a list of comments for a blog post, or an address within a user record).

### 2. Referencing (Normalization)
* **Concept:** Storing a reference (the ID) to another document, similar to a Foreign Key in SQL.
* **Pros:** Smaller document size, updates to the referenced data only happen once.
* **Cons:** Requires multiple queries to retrieve related data (often called "application-level joins" in Node.js).
* **Use Case:** Large or rarely accessed related data (e.g., a separate `OrderHistory` collection referenced by a `User` document).

**The key is to design the schema around the application's most frequent queries.**

# 5.2.4 NoSQL "Tables" (Collections & Documents)

NoSQL systems use different terminology than SQL, reflecting their more flexible structure.

| SQL Term | MongoDB Term | Description | Analogous to in Programming |
| :--- | :--- | :--- | :--- |
| **Database** | **Database** | The physical container for collections. | The entire application's data store. |
| **Table** | **Collection** | A group of documents that share a similar purpose. *Does not require a predefined schema.* | An **Array** or **List** of objects. |
| **Row** | **Document** | A single record, stored as a JSON/BSON object. | An **Object** or **Struct**. |
| **Column** | **Field/Property** | A key-value pair within a document. | An **Object Property**. |

### The Document Structure
A typical MongoDB document is a flexible object:

```json
{
  "_id": "60c72b22e7a1f5001a1c8b9d", // Primary key, auto-generated
  "name": "mamadou",
  "email": "mamadou@codex.com",
  "role": "admin",
  "lastLogin": {
    "date": "2025-10-15",
    "ip": "192.168.1.1"
  },
  "tags": ["developer", "node"], // Array of values
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```
*Fields can be simple types, arrays, or nested objects, providing high flexibility.*

---

## 5.2.5/- MongoDB.md

```markdown
# 5.2.5 MongoDB

**MongoDB** is the leading document database and the most popular NoSQL choice for Node.js developers.

* **Language:** C++ (Core)
* **Data Format:** Stores data in **BSON** (Binary JSON), a binary serialization format that includes more data types than JSON (like Date and BinData).
* **Scalability:** Designed for horizontal scaling using **Sharding**, where data is partitioned across multiple servers (shards) to handle massive load.
* **Flexibility:** Its schemaless nature allows for rapid development and iteration.
* **Backend Integration:** Direct interaction is possible using the official **`mongodb`** driver, but developers almost always use **Mongoose** (see 5.2.6) as an **ODM** (Object Document Mapper) to enforce schema validation and simplify operations.

# 5.2.6 Mongoose

**Mongoose** is an **Object Data Modeling (ODM)** library for Node.js and MongoDB. It acts as an abstraction layer over the native MongoDB driver.

**🎥 Video Resource:** [Mongoose Crash Course](https://www.youtube.com/watch?v=ofme2o29ngU)

### Why Use Mongoose?
While MongoDB is schemaless, large applications need structure. Mongoose provides this structure by introducing two core concepts:

1.  **Schema:** Defines the structure of the documents within a collection. It specifies fields, their data types, default values, and validation rules. **It enforces application-level validation.**
    ```javascript
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, unique: true },
      age: Number
    });
    ```
2.  **Model:** A constructor compiled from a Schema definition. Instances of the Model represent documents that can be saved, queried, and deleted.

### Mongoose Features
* **Validation:** Ensures data conforms to the schema rules before being saved to the database.
* **Middleware (Hooks):** Functions that run before or after Mongoose operations (e.g., hashing a password *before* saving a new user).
* **Query Builders:** Provides a rich, fluent API for constructing complex queries and integrating asynchronous operations seamlessly with Promises and `async/await`.