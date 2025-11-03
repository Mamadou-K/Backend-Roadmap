# 7 Web Security 🔒

**Web Security** involves the practice of protecting web applications from threats that exploit vulnerabilities in the application code, server configuration, or underlying infrastructure. For a backend developer, security is a core concern, particularly around data storage, user authentication, and API response handling.

* **Defense in Depth:** Security is a layered approach. Relying on a single defense mechanism is insufficient.
* **Top Threats:** The most critical backend security risks are tracked by organizations like the **OWASP Foundation** (e.g., SQL Injection, Cross-Site Scripting, Broken Authentication).

# 7.1 Hashing

**🎥 Video Resource:** [What is Hashing? (Password Hashing Explained)](https://www.youtube.com/watch?v=--tnZMuoK3E)

**Hashing** is a fundamental cryptographic process where an input (of any length, like a password or a file) is transformed into a fixed-size, unique string of characters called a **hash value**, **hash code**, or **digest**.

### Key Characteristics of Secure Hashing
1.  **One-Way Function:** It is computationally infeasible to reverse the process—you cannot derive the original input (the password) from the hash.
2.  **Deterministic:** The same input will *always* produce the same hash output.
3.  **Collision Resistance:** It is highly improbable for two different inputs to produce the same hash output.
4.  **Avalanche Effect:** A tiny change in the input (e.g., changing one letter of a password) results in a drastically different output hash.

### Cryptographic Use Cases

| Use Case | Hashing Algorithm/Mechanism | Description |
| :--- | :--- | :--- |
| **Password Storage** | **bcrypt, Argon2, scrypt** | Slow, iterative, and salted algorithms designed to resist brute-force attacks by making the hashing process intentionally expensive. **The standard for backend password storage.** |
| **Data Integrity** | **SHA-256** (Secure Hash Algorithm) | Used to verify if a file or data chunk has been tampered with. If the data changes, the hash changes. |
| **Digital Signatures** | **SHA-256** | Used as part of JWTs (see 6.2.4) and SSL/TLS certificates to verify the authenticity of the sender. |

### Salting
**Salting** is crucial for password hashing. A unique, random value (**salt**) is generated for each user and concatenated with the password *before* hashing. This prevents attackers from using pre-computed hash tables (**Rainbow Tables**) to quickly crack passwords. The salt must be stored alongside the resulting hash in the database.