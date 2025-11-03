
# 7.2 Security Headers 🛡️

**Security Headers** are HTTP response headers that a server includes in its responses to instruct web browsers on how they should behave and what security policies they should enforce. These headers provide a crucial layer of defense against client-side attacks.

### Implementing in Express.js
These headers are typically set using **middleware** in your Express application (often via a dedicated library like **Helmet**).

### Essential Security Headers

| Header | Purpose | Protection Against |
| :--- | :--- | :--- |
| **`Strict-Transport-Security` (HSTS)** | Forces all future connections from the client to use HTTPS (SSL/TLS) for a specified duration. | **Man-in-the-Middle attacks**, where an attacker tries to downgrade the connection to unencrypted HTTP. |
| **`Content-Security-Policy` (CSP)** | Prevents unauthorized content from being loaded (scripts, styles, images) by defining a whitelist of trusted sources. | **Cross-Site Scripting (XSS)** and data injection attacks. |
| **`X-Content-Type-Options`** | Prevents browsers from "sniffing" the content type (trying to determine the MIME type of a resource). Forces the browser to rely on the declared `Content-Type`. | **MIME-sniffing attacks**, which can lead to XSS if a file is misinterpreted as an executable script. |
| **`X-Frame-Options`** | Controls whether a web page can be embedded in an `<iframe/>`, `<frame/>`, or `<object/>` on another site. | **Clickjacking attacks**, where an attacker overlays a transparent layer over your site to trick users into clicking hidden links. |
| **`Referrer-Policy`** | Controls how much referrer information (the page the user came from) is included in requests. | Leaking sensitive information in URLs to third-party services. |
| **`Feature-Policy` (or `Permissions-Policy`)**| Allows the developer to selectively enable or disable browser features (e.g., camera, microphone, geolocation). | Restricting an attacker's ability to use powerful browser features if XSS occurs. |