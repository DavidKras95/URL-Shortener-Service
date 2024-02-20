# URL Shortener Service

## Overview

This is a URL shortening  service designed to efficiently convert long URLs into shorter, more manageable links.
The service is built using Node.js and Express for the server-side logic, Redis for caching to ensure low latency, and MongoDB to store essential data.
Nginx is used for load balancing between multiple server instances, while Docker is used for containerization, allowing for easy deployment and scalability.

## Tech Stack

- *Node.js: Server-side runtime environment for executing JavaScript code.***
- *Redis: In-memory data structure store, acting as a cache to improve response times***
- *MongoDB: NoSQL database for storing and managing URL data***
- *Nginx: Web server reverse proxy that is used for load balancing to distribute incoming traffic***
- *Docker: Containerization technology for deploying applications in isolated environments***

## Usage

- To shorten a URL, Send a POST request to /shortenUrl endpoint with the long URL in the request body.

- Navigate to http://localhost:<port>/<shortened-url> in a web browser to redirect to the original URL.
  Adjust <port> and <shortened-url> with your specific port number and the shortened URL generated by the service.

## Getting Started

### Prerequisites

- node version 20.10.0
- npm 10.2.3
- Docker 25.0.3


1. Clone this repository.

   ```bash
   git clone https://github.com/DavidKras95/URL-Shortener-Service.git
   ```

2. Create a .env file and configure the following variables

    ```env
    PORT = '3000'
    DOCKER = 'false'
    NGINX_DISPLAY_PORT = '3000'
    MONGODB_URI = URL for mongodb recived from David
    REDIS_URI = URL for Redis recived from David
    BASE_URL = 'http://localhost:'
    NUMBER_OF_UNIQUE = 7 
    ```

### Containerized Scalable Deployment

- In terminal run
    ```bash
    docker-compose up -d
    ```

- Open in browser http://localhost:8000

### Local Deployment

- Install dependencies
    ```bash
    npm install
    ```

- Deploy application
    ```bash
    npm run start
    ```
- Open in browser http://localhost:3000




## Future Improvements (if I had more time)

If additional development time were available, several key enhancements could be implemented:

1. **Scalability with Kubernetes::**
   - Utilize Kubernetes as a load balancer and orchestration tool to deploy and manage multiple instances (pods) of the URL shortening service. Kubernetes can automatically scale the number of pods based on the incoming traffic, ensuring optimal performance and availability.

2. **Enhanced Caching Logic:**
   - Implement more advanced caching strategies such as storing frequently accessed URLs or maintaining a cache of recently accessed URLs. This can further improve response times and reduce database load..

3. **Logging Server Integration:**
   - Integrate a dedicated logging server to capture and analyze logs generated by the application. Centralized logging facilitates easier monitoring, troubleshooting, and performance optimization. Tools like ELK Stack for log aggregation and analysis.

4. **Error Handling and Monitoring:**
   - Implement robust error handling mechanisms to gracefully handle unexpected failures and prevent service disruptions. Integrate monitoring solutions like Prometheus and Grafana to monitor key metrics and receive alerts in case of anomalies or performance degradation.

5. **Continuous Integration and Deployment (CI/CD):**
   -  Continuous Integration and Deployment (CI/CD).
