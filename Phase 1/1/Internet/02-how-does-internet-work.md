# 1.1.1 How Does the Internet Function? ⚙️

**🎥 Video Resource:** [How Does the Internet Work?](http://www.youtube.com/watch?v=x3c1ih2NJEg) (Covers packet switching and routing)

The Internet functions primarily through **Packet Switching** and the **Request-Response Cycle**.

---

## Packet Switching: The Mechanism of Data Transfer

The Internet breaks all data into small, manageable chunks called **data packets**.

1.  **Fragmentation:** A file or request is broken into packets.
2.  **Addressing:** Each packet is stamped with a header containing the **source IP address** and the **destination IP address**.
3.  **Independent Routing:** Routers direct these packets independently across the network, optimizing for the fastest available path.
4.  **Reassembly:** The destination device uses the packet headers to reorder them and reconstruct the original data.

This technique ensures the network is **robust** and **efficient**.

---

## The Request-Response Cycle in Detail

This is the standard communication loop for the web:

1.  **DNS Resolution:** The client (browser) uses **DNS** to translate a human-readable **Domain Name** (e.g., `google.com`) into a machine-readable **IP Address**.
2.  **TCP Handshake:** The client and server establish a reliable connection using the **TCP three-way handshake** (SYN, SYN-ACK, ACK).
3.  **HTTP/S Request:** The client sends the actual request using the **HTTP** protocol (e.g., a `GET` request for a webpage).
4.  **Server Processing:** The server processes the request, retrieves the resource, and packages it into an **HTTP Response**.
5.  **Data Transfer & Rendering:** The response, containing the appropriate **Status Code** (e.g., `200 OK`) and the requested content, is sent back to the client, where the browser reassembles the packets and displays the content.