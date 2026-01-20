# Galaxy Backend Prep

## Overview

This is a prototype backend monorepo built to explore the NestJS ecosystem. It demonstrates how to hook together various technologies for building a simple wallet management system, including user authentication, wallet creation, signing operations, and secure key storage. As stated before this project uses NestJS for the framework, Kafka for inter-service communication, SQLite for lightweight database persistence, and other tools like TypeORM for ORM, Ethers for cryptocurrency wallet generation, and JWT for authentication. This setup was created as a learning exercise to experiment with distributed systems, event-driven architecture, and secure backend practices in a controlled environment.

Key features include:
- User registration and login via API Gateway.
- Wallet creation and listing.
- Message signing using stored private keys.
- Separation of concerns across microservices.

**Note**: This is a proof-of-concept and not intended for production use. Sensitive operations (e.g., key storage) are simplified and should be hardened with proper security measures in a real app.

## Technologies Used

- **Framework**: NestJS (for building scalable Node.js server-side applications).
- **Database**: SQLite (via TypeORM for ORM and migrations).
- **Messaging**: Kafka (for asynchronous communication between services, using KafkaJS).
- **Authentication**: JWT and Passport.js.
- **Wallet Handling**: Ethers.js for generating public/private key pairs.
- **HTTP Client**: Axios for inter-service calls (e.g., to key storage).
- **Other**: Bcrypt for password hashing, Class-Validator for DTO validation.

## Prerequisites

- Node.js v18+ (with npm).
- Docker (for running Kafka and Zookeeper).
- Git (to clone the repo if needed).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Code-Milker/crypto-wallet-nest.js-prototype.git
cd galaxy
```

### 2. Install Dependencies
The project is a monorepo using npm workspaces. Install all dependencies at the root level:
```bash
npm install
```

This will install packages for all services and the shared libs.

### 3. Configure Environment Variables
Create a `.env` file in each service directory (or use a shared config if preferred). Example for `services/api-gateway/.env`:
```
JWT_SECRET=your_jwt_secret_here
AUTH_URL=http://localhost:3001/auth # Auth endpoints
WALLET_URL=http://localhost:3003/wallets
SIGN_URL=http://localhost:3004/sign
```

Repeat for other services, adjusting URLs and ports as needed. For development, use `localhost:<port>` instead of Docker service names.

### 4. Start Kafka and Zookeeper
Use Docker Compose to spin up the messaging infrastructure:
```bash
docker compose up -d
```

This starts Zookeeper on port 2181 and Kafka on 9092. Verify with:
```bash
docker ps  # Should show zookeeper and kafka containers
```

### 5. Run Database Migrations (if applicable)
If using TypeORM migrations (configured in services like auth-service or wallet-service):
```bash
# From root, or per service
npm run typeorm migration:run -w auth-service  # Example for auth-service
```

For SQLite, `synchronize: true` in TypeORM config might auto-create tables on startup.

### 6. Start the Services
You can start all services simultaneously or individually.

- **All Services** (in parallel, for development):
  ```bash
  npm run start:all
  ```

- **Individual Services**:
  ```bash
  npm run start:api-gateway
  npm run start:auth-service
  npm run start:wallet-service
  npm run start:signing-service
  npm run start:key-storage-service
  ```

Each service runs on its configured port (e.g., API Gateway on 3000). Use `--watch` for hot-reloading in dev mode.

### 7. Test the Application
- **Run E2E Tests** (from API Gateway):
  ```bash
  npm run test:e2e -w api-gateway
  ```

This tests endpoints like registration, login, wallet creation, listing, and signing.

- **Manual Testing**: Use tools like Postman or curl to hit API Gateway endpoints:
  - POST `/api/v1/auth/register` with `{ "email": "test@example.com", "password": "password123" }`.
  - POST `/api/v1/auth/login` to get JWT token.
  - POST `/api/v1/wallets` (with Bearer token) to create a wallet.
  - GET `/api/v1/wallets` to list wallets.
  - POST `/api/v1/sign/:walletId` with `{ "message": "test message" }` to sign.

## Project Structure
- **services/api-gateway**: Entry point for HTTP requests, routes to other services via Kafka or HTTP.
- **services/auth-service**: Handles user auth (register/login) with JWT.
- **services/wallet-service**: Manages wallet creation and storage (using Ethers).
- **services/signing-service**: Performs message signing with private keys.
- **services/key-storage-service**: Securely stores encrypted private keys.
- **shared/libs**: Shared entities, DTOs, and utils (e.g., User/Wallet entities, generateWallet function).

## Troubleshooting
- **Kafka Connection Issues**: Ensure Docker containers are running and brokers are accessible (e.g., `kafka:9092` in Docker network).
- **DB Errors**: Check SQLite file permissions (`database.sqlite`) or switch to in-memory for tests.
- **Dependency Conflicts**: Run `npm install --force` if workspace issues arise.
- **Logs**: Services log to console; tail them for errors.

## Future Improvements
- Migrate to a production DB (e.g., PostgreSQL).
- Add proper error handling, logging (e.g., Winston), and monitoring.
- Implement CI/CD and containerization for all services.
- Enhance security (e.g., use a real vault for keys instead of DB).

