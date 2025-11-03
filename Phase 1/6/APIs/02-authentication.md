# 6.2 Authentication 🔑

**Authentication** is the process of verifying a user's identity—proving that a user is who they claim to be. It is the first critical step in securing any backend application.

* **Authorization:** (Distinct from Authentication) Determines **what** an authenticated user is *allowed* to do (e.g., an admin can delete a user, but a regular user cannot).

# 6.2.1 Authentication Basics

### The Process
1.  **Client provides Credentials:** The user submits a username/email and a password (or other proof).
2.  **Server Verification:** The server hashes the submitted password and compares it to the securely stored hash in the database.
3.  **Identity Confirmed:** If the hashes match, the user is authenticated.
4.  **Issuance of Identity Proof:** The server issues a credential (e.g., a session cookie or a token) that the client must use in all subsequent requests to prove their identity without logging in again.

### Password Hashing
* **NEVER** store plain-text passwords.
* **Hashing:** Use a strong, one-way, slow hashing algorithm (like **bcrypt** in Node.js) to convert the password into an irreversible, fixed-length string.
* **Salting:** Add a unique, random string (**salt**) to the password before hashing. This prevents attackers from using pre-computed hash tables (rainbow tables).

# 6.2.2 Session-Based Authentication

**Session-Based Authentication** is the traditional method, often used in older web applications and server-rendered applications.

### How It Works
1.  **Login:** User logs in successfully.
2.  **Server Creates Session:** The server generates a unique **Session ID** and stores it (along with the user's ID and permissions) in a server-side storage (e.g., memory, database, or **Redis**).
3.  **Cookie Sent:** The Session ID is sent back to the client inside an HTTP cookie.
4.  **Subsequent Requests:** The client's browser automatically sends the cookie (containing the Session ID) with every subsequent request.
5.  **Server Lookup:** The server receives the cookie, looks up the Session ID in its storage, and retrieves the user's identity.

### Pros and Cons
| Aspect | Session-Based Authentication |
| :--- | :--- |
| **Pros** | Easy to implement; state is secure on the server; easy to revoke a session (by deleting the ID). |
| **Cons** | **Not Scalable (Stateful):** Requires a central store (Redis/DB) for session data, complicating horizontal scaling across many servers. |
| **Use Case** | Traditional websites, monoliths, or applications with high revocation requirements. |

# 6.2.3 Token Authentication

**Token Authentication** is the modern standard for APIs, forming the basis of approaches like JWT and OAuth.

### How It Works (The Core Concept)
Instead of the server storing session state, the server generates a cryptographically signed **Token** that contains all necessary user identification data.

1.  **Login:** User logs in successfully.
2.  **Token Generation:** Server generates a token.
3.  **Token Sent:** The token is sent to the client.
4.  **Subsequent Requests:** The client stores the token (usually in local storage) and manually attaches it to the request, typically in the **`Authorization` header** (e.g., `Authorization: Bearer <token>`).
5.  **Server Verification (Stateless):** The server receives the token and **cryptographically verifies its signature**. If valid, the user's identity is read directly from the token payload, requiring **no database lookup**.

### The Advantage: Statelessness
Because the server doesn't need to look up a session ID in a database, the server is **stateless** (it holds no session memory), allowing the API to scale easily across many server instances.

# 6.2.4 JWT (JSON Web Tokens)

**🎥 Video Resource:** [JWT (JSON Web Token) Explained](https://www.youtube.com/watch?v=Y2H3DXDeS3Q)

**JWT** is the specific, compact, and secure format most commonly used for implementing token authentication.

### Structure
A JWT is a single string with three parts, separated by dots: `Header.Payload.Signature`.

1.  **Header (Metadata):** Specifies the token type (JWT) and the signing algorithm (e.g., HMAC, RSA).
2.  **Payload (The Claims):** Contains the actual user data (**claims**), such as the user ID, username, and expiry time (`exp`).
3.  **Signature (Verification):** Created by taking the Base64-encoded Header, the Base64-encoded Payload, and a secret key known only to the server, and running them through the algorithm specified in the header.

### Key Points
* **Signed, NOT Encrypted:** The payload is easily viewable (Base64-encoded, not encrypted). **NEVER store sensitive data** (like passwords) in the payload.
* **Verification:** The server validates the token by re-calculating the signature using its secret key. If the calculated signature matches the token's signature, the token is deemed authentic and untampered.
* **Revocation:** Tokens are difficult to revoke before they naturally expire (`exp` claim). Solutions often involve blacklisting tokens in a central store (compromising statelessness) or keeping token lifespans very short.

# 6.2.5 OAuth (Open Authorization)

**📖 Article Resource:** [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)

**OAuth 2.0** is an **authorization framework** that allows a third-party application to obtain limited access to an HTTP service (e.g., Facebook, Google, GitHub) on behalf of a resource owner (the user).

### The Goal
OAuth allows you to "Sign in with Google" without the third-party application ever seeing your Google password.

### Key Actors
1.  **Resource Owner (User):** The person who owns the data (e.g., you).
2.  **Client (Third-Party App):** The application requesting access (e.g., Spotify, which wants access to your Facebook profile).
3.  **Authorization Server:** The service that authenticates the user and issues tokens (e.g., Google's authentication server).
4.  **Resource Server:** The service that hosts the protected user data (e.g., Google's main data API).

### The Flow (Simplified)
1.  The **Client** redirects the **User** to the **Authorization Server** login page.
2.  The **User** logs in and grants permission (**Authorization**).
3.  The **Authorization Server** sends the **Client** a temporary **Authorization Code**.
4.  The **Client** exchanges the **Authorization Code** for an **Access Token** with the **Authorization Server** (this exchange is server-to-server and secure).
5.  The **Client** uses the **Access Token** to request data from the **Resource Server**.

**OAuth does not handle Authentication itself; it delegates it** to a trusted third party and provides a secure mechanism for **Authorization** via the Access Token. (Protocols like OpenID Connect build on OAuth to handle both Authentication and Authorization.)