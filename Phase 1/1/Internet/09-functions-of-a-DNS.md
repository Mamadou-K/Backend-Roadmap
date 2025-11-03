# 1.3.3 Functions of a DNS

The primary function of DNS is translation, but it involves a complex, decentralized lookup process:

1.  **Resolution:** Translating a Domain Name into an IP address. This process involves four specialized servers:
    * **DNS Resolver:** Your computer/ISP cache server.
    * **Root Name Server:** Directs the query to the correct TLD server.
    * **TLD Name Server:** Directs the query to the authoritative server.
    * **Authoritative Name Server:** Holds the actual record mapping the domain name to the IP address.
2.  **Traffic Control:** DNS can point different subdomains (e.g., `mail.example.com`, `api.example.com`) to different IP addresses, effectively directing specific types of traffic to specialized servers.
3.  **Load Balancing & Redundancy:** By having multiple IP addresses for a single domain name, DNS can distribute traffic across several servers (basic load balancing) and provide failover if one server goes down.