# 1.2.3 What HTTP Does

HTTP is the language of the web. Its primary function is to enable the communication required to access web resources.

### Core Functions

1.  **Defines Communication Structure:** It specifies the format for the messages exchanged between a client and a server.
    * **Request Message:** Includes a **Method** (e.g., GET, POST), a **URL**, **Headers**, and sometimes a **Body**.
    * **Response Message:** Includes a **Status Code** (e.g., 200, 404), **Headers**, and a **Body** (the requested content).
2.  **Resource Identification:** It uses **Uniform Resource Locators (URLs)** to pinpoint the exact resource the client wants.
3.  **Action Specification:** It defines various **Methods** (or verbs) that indicate the desired action to be performed on the identified resource (e.g., retrieving data, submitting data, deleting data).
4.  **Status Reporting:** It provides **Status Codes** to tell the client the outcome of its request (e.g., success, error, redirection).