# 5 Databases 💾

A **Database** is an organized collection of structured information, or data, typically stored electronically in a computer system. It is the persistent storage layer for any application, allowing data to survive server restarts.

### Database Management System (DBMS)
A **DBMS** (like MySQL, PostgreSQL, or MongoDB) is the software that interacts with the user, the application, and the database itself to define, manipulate, and manage data.

### Two Major Paradigms
Backend developers must be familiar with the two main types of databases:

1.  **Relational Databases (SQL):** Structured data using tables, rows, and columns, emphasizing consistency and clear relationships.
2.  **Non-Relational Databases (NoSQL):** Diverse data models (Document, Key-Value, Graph) built for flexibility, high scalability, and handling large volumes of unstructured data.

# 5.1 Relational Databases (SQL) 📊

**Relational Databases** are based on the relational model, which stores data in tables and uses predefined schemas to enforce strict data types and relationships.

* **Key Language:** **SQL** (Structured Query Language) is the standard language used for managing and manipulating relational data.
* **ACID Properties:** Relational databases are designed to adhere to **ACID** properties, ensuring data integrity:
    * **A**tomicity: Transactions are all-or-nothing.
    * **C**onsistency: Transactions only bring the database from one valid state to another.
    * **I**solation: Concurrent transactions execute independently.
    * **D**urability: Once a transaction is committed, it remains committed, even in the event of system failure.

# 5.1.1 Relational Databases Intro

**🎥 Video Resource:** [Relational Databases and SQL Explained](https://www.youtube.com/watch?v=zsjvFFKOm3c)

Relational databases structure data using the mathematical concept of a **relation**, which is implemented as a **table**.

### When to Use SQL
SQL is the best choice when:

1.  **Data Structure is Fixed:** The data schema is clearly defined and unlikely to change frequently (e.g., user records, financial transactions).
2.  **Relationships are Complex:** You have many-to-many or one-to-many relationships that need to be enforced and queried easily.
3.  **Data Integrity is Critical:** You need strict adherence to the ACID properties (e.g., banking, healthcare, inventory).

# 5.1.2 SQL Basics (CRUD Operations)

**SQL** is the core language for interacting with relational databases. It primarily consists of four types of statements that map to the **CRUD** (Create, Read, Update, Delete) paradigm.

| CRUD Operation | SQL Command | Description | Example |
| :--- | :--- | :--- | :--- |
| **C**reate | **`INSERT`** | Adds new rows of data into a table. | `INSERT INTO Users (name) VALUES ('Alice');` |
| **R**ead | **`SELECT`** | Retrieves data from one or more tables. | `SELECT name, email FROM Users WHERE id = 1;` |
| **U**pdate | **`UPDATE`** | Modifies existing data within a table. | `UPDATE Users SET email = 'a@test.com' WHERE name = 'Alice';` |
| **D**elete | **`DELETE`** | Removes rows from a table. | `DELETE FROM Users WHERE id = 1;` |

### Key Concepts
* **`FROM`:** Specifies the table(s) to query.
* **`WHERE`:** Filters the records based on a specified condition.
* **`JOIN`:** Combines rows from two or more tables based on a related column between them (e.g., `INNER JOIN`, `LEFT JOIN`).

# 5.1.3 Relational Database Design (Normalization)

**📖 Article Resource:** [What is Database Normalization?](https://www.geeksforgeeks.org/introduction-of-dbms-normalization/)

Relational database design focuses on **Normalization**—organizing data efficiently to eliminate redundancy and inconsistency. This is achieved by adhering to **Normal Forms** (1NF, 2NF, 3NF).

### Primary Keys and Foreign Keys
* **Primary Key (PK):** A column (or set of columns) whose values uniquely identify every row in a table. *Cannot be NULL*.
* **Foreign Key (FK):** A column in one table that uniquely identifies a row of another table. FKs establish the **relationship** between two tables.

### Types of Relationships
FKs define how tables relate:

| Relationship | Description | Example |
| :--- | :--- | :--- |
| **One-to-One** | One record in Table A relates to one record in Table B. | A User has one Profile. |
| **One-to-Many** | One record in Table A relates to multiple records in Table B. | A User can have many Posts. (The Post table holds the User's FK). |
| **Many-to-Many** | Records in Table A relate to multiple records in Table B, and vice-versa. | Users can join many Groups, and Groups have many Users. (Requires an intermediate **Junction Table**). |

# 5.1.4 Relational Tables (Schema)

A **Table** is the core component of a relational database, composed of rows and columns. The structure of the table is defined by its **Schema**.

| Term | Definition | Analogous to in Programming |
| :--- | :--- | :--- |
| **Table** | A collection of related data organized in columns and rows. | A **Class** or **Object Type** (e.g., `User`). |
| **Column** | A vertical entity that defines a specific attribute and data type for all records. | An **Object Property** or **Field** (e.g., `name`, `email`). |
| **Row** | A horizontal entity that represents a single, complete record in the table. | An **Instance** of a Class or an **Object** (e.g., one specific user). |
| **Data Type** | A constraint placed on a column defining the type of data it can hold. | A variable's explicit type (e.g., `VARCHAR`, `INT`, `BOOLEAN`). |

### Common Data Types
* **`INT`:** Whole numbers (e.g., IDs, counts).
* **`VARCHAR(n)`:** Variable-length string data up to *n* characters (e.g., names, short text).
* **`TEXT`:** Longer text data (e.g., blog body).
* **`DATE`/`TIMESTAMP`:** Date and time values.
* **`BOOLEAN`:** True or False values.

# 5.1.5 MySQL

**MySQL** is one of the most popular open-source relational database management systems (RDBMS).

* **Inventor:** Oracle Corporation
* **Characteristics:** Known for its speed, reliability, and ease of use, particularly in web development. It is a core part of the classic **LAMP** (Linux, Apache, MySQL, PHP/Python/Perl) stack.
* **Backend Integration:** In Node.js, libraries like **`mysql2`** or **Knex.js** (a query builder) are used to establish connections, manage connection pools, and execute SQL queries asynchronously.

### Example Node.js Interaction (Conceptual)
```javascript
// Assuming a connection pool is set up
const [rows] = await pool.query('SELECT * FROM Products WHERE price > ?', [100]);
// rows is an array of product objects
```

---

## 5.1.6/- PostgreSQL.md

```markdown
# 5.1.6 PostgreSQL

**PostgreSQL (or Postgres)** is a powerful, open-source object-relational database system known for its robust feature set, high standards compliance, and data integrity.

* **Characteristics:** Often chosen over MySQL for large-scale enterprise applications where data reliability and complex features are paramount. It supports advanced concepts like stored procedures, user-defined functions, and transactional integrity.
* **Feature:** Includes robust native support for advanced data types, notably the **JSONB** type, which allows it to store and index JSON data natively within a relational structure. This bridges the gap between SQL and NoSQL.
* **Backend Integration:** The official **`pg`** library is commonly used for Node.js, often wrapped by ORMs (Object-Relational Mappers) like **Sequelize** or **Prisma** to manage schemas and queries using JavaScript objects instead of raw SQL strings.
