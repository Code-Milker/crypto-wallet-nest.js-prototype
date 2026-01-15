# Node.js and TypeScript Notes

## Question 1: Explain the Node.js Event Loop

The Node.js event loop is a single-threaded process that executes code line by line. For asynchronous tasks, a call is removed from the call stack and placed in a queue. Once the call stack is empty, the event loop checks the queue for resolved or terminated items. If resolved, it moves them back to the call stack for execution.

Common examples where the event loop is involved include:
- I/O operations like file reading or writing
- API calls
- Timeouts
- Callbacks or promises

## Question 2: What is the Difference Between an Interface and a Type?

Interfaces can be extended or merged, allowing multiple declarations to combine into one.

```typescript
interface User { name: string }
interface User { age: number }
// User is now { name: string, age: number }
```

Types use unions and intersections with `&` or `|`.

```typescript
type UserType = 'admin' | 'retail';
```

## Question 3: Why Use Generics?

Generics allow you to reuse code while providing type safety.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
identity(42);
```

## Question 4: What is the structure of a NestJS application?

Built around modules (@Module decorator groups controllers,provider). Controllers handle routes (@Get, @Post), services hold business logic (@Injectable). App bootsrapped via NestFactory.create(AppModule). Example: Root module imports feature modules for separation of concerns. 


## Question 5: How is dependency injection handled in a NestJS application?

Uses loC container. Providers (services, respositories) are injected via constructors. Decorators like @Inject() for custom providers.

 
## Question 6: Explain pipes, guards, and interceptors in NestJS appliction?

pipes: Transform/validate input e.g query params
guards: Authorization checks (e.g rolesguard to check user roles)
interceptors: wraps request/response (for logging, caching, or transforming responses)


# Project crypto wallet micro service app using NEST.JS

this app will allow for the creation of wallets and signing of messages. it should support distributed deployment, high throughput (via async queues, caching) high availability (load balancing, service discovery), and ACID compliance (transactional db ops)

1. microservices design: 
- api gateway service: central entry point for consumer api. this will handle things like routing, auth, rate limiting
- auth service: manges user authentication and authorization (jwt based) wallet service: core for wallet creation and management 
- wallet service: core wallet creation and management.
- signing service: isolated for signing operations to minimize key exposure.
- key storage service: secure vault for private keys (integrates with external hsm/vault)

2. distributed system features:
- high throughput: async processing with queues (rabbitmq/kafka), caching (reddis)
- acid compliance: use sql lite and some orm 
- scalability: circuit breaker (via nestjs interceptors), retries, monitoring
- deployment: pm2 for multiple local instances 


3. Workflows

Create Wallet:
API Gateway receives POST /wallets (with JWT).
Validates user via Auth Service (sync HTTP call for simplicity).
Forwards to Wallet Service via queue.
Wallet Service generates key pair (ethers.Wallet.createRandom()).
Encrypts private key, stores in Key Storage Service.
Saves wallet metadata to DB (transactional).
Returns public address to gateway.

Sign Message:
API Gateway receives POST /sign/:walletId.
Auth check.
Forwards to Signing Service via queue.
Signing Service retrieves encrypted key from Key Storage (decrypts in-memory only).
Signs message (ethers.utils.signMessage).
Discards key immediately after signing.
Logs audit trail, returns signature.

Security Best Practices:
Keys never leave secure service; use zero-knowledge proofs if extending.
Encrypt at rest/transit (HTTPS, DB encryption).
Audit logs for all ops.
Input sanitization to prevent injection.


5. Implementation Steps (High-Level Build Plan)

Set up monorepo with NestJS (one workspace for all services, e.g., using Nx or yarn workspaces for simplicity).
Create shared libs (e.g., for DTOs, entities).
Implement each service as a separate Nest app/module.
Configure microservices transport (e.g., RabbitMQ client in Wallet/Signing, or HTTP clients).
Add DB setup with TypeORM (configure SQLite in app.module.ts).
Integrate crypto libs and secure storage.
Add tests (unit/integration) with Jest.
Run locally: Start each service with separate terminals or a script (e.g., concurrently npm package).


# what is rabbit mq?
its a open source message broker that facilitates communication between applications in distributed systems. it acts as an intermediary, which allows producers (senders) to publish messages to queues, and consumers (receivers) to subscribe and process those messages asynchronously. 

