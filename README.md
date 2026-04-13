Booking System Backend

A scalable and production-ready backend system for managing show bookings.

This project demonstrates how to build a real-world booking system with proper architecture, concurrency handling, and performance optimization.

Features
🔐 Authentication
User registration & login
JWT-based authentication
Role-based access control (ADMIN / USER)
🎬 Show Management
Create shows (Admin only)
Fetch all shows
Get show details
💺 Seat Management
Automatic seat generation (A1 → A100)
Seat availability tracking
Unique seat constraints per show
🎟️ Booking System
Book seats
View user bookings
Cancel bookings
Booking lifecycle:
PENDING
CONFIRMED
CANCELLED
⚡ Advanced Backend Capabilities
Atomic Booking Flow using MongoDB transactions
Concurrency Control to prevent double booking
Redis Caching for faster read performance
Redis Locks to handle race conditions
Idempotency to avoid duplicate bookings
Rate Limiting for API protection
Queue-based Processing using Bull
Pagination & Validation
Centralized Error Handling
🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Cache & Locks: Redis
Queue: Bull
Authentication: JWT, bcrypt
Validation: Joi / Zod
📂 Project Structure (Module-Based)
src/
├── modules/
│   ├── auth/
│   ├── booking/
│   ├── show/
│   ├── seat/
│
├── shared/
│   ├── middleware/
│   ├── utils/
│   ├── constants/
│   ├── errors/
│
├── config/
├── index.js
Core APIs
AUTH
POST /auth/register
POST /auth/login
SHOWS
POST /shows
GET /shows
GET /shows/:id
SEATS
GET /shows/:id/seats
BOOKINGS
POST /bookings
GET /bookings/my
PATCH /bookings/:id/cancel
⚠️ Problems Solved
❌ Double Booking

Handled using:

Database transactions
Distributed locking (Redis)
Duplicate Requests
Idempotency keys ensure safe retries
⚡ High Load Handling
Queue-based processing
Rate limiting
Getting Started
1. Clone the repository
git clone https://github.com/your-username/booking-system-backend.git
cd booking-system-backend
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
4. Run the server
npm run dev
📌 Status

🚧 Currently under development

🤝 Contributing

Contributions and suggestions are welcome!

⭐ Support

If you like this project, give it a ⭐ on GitHub.
