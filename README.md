## 🎟️ Booking System Backend

A **scalable and production-ready backend system** for managing show bookings.

This project demonstrates how to build a **real-world booking system** with proper architecture, concurrency handling, and performance optimization.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Role-based access control (ADMIN / USER)

### 🎬 Show Management

* Create shows (Admin only)
* Fetch all shows
* Get show details

### 💺 Seat Management

* Automatic seat generation (A1 → A100)
* Seat availability tracking
* Unique seat constraints per show

### 🎟️ Booking System

* Book seats
* View user bookings
* Cancel bookings
* Booking lifecycle:

  * PENDING
  * CONFIRMED
  * CANCELLED

---

## ⚡ Advanced Backend Capabilities

* Atomic booking using MongoDB transactions
* Concurrency control to prevent double booking
* Redis caching for faster reads
* Redis locks to handle race conditions
* Idempotency for safe retries
* Rate limiting for API protection
* Queue-based processing using Bull
* Pagination & validation
* Centralized error handling

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Cache & Locks:** Redis
* **Queue:** Bull
* **Authentication:** JWT, bcrypt
* **Validation:** Joi / Zod

---

## 📂 Project Structure

```bash
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
└── index.js
```

---

## 🔥 Core APIs

### AUTH

```http
POST /auth/register
POST /auth/login
```

### SHOWS

```http
POST /shows
GET /shows
GET /shows/:id
```

### SEATS

```http
GET /shows/:id/seats
```

### BOOKINGS

```http
POST /bookings
GET /bookings/my
PATCH /bookings/:id/cancel
```

---

## ⚠️ Problems Solved

### ❌ Double Booking

Handled using:

* Database transactions
* Redis distributed locking

### 🔁 Duplicate Requests

* Idempotency keys ensure safe retries

### ⚡ High Load Handling

* Queue-based processing
* Rate limiting

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/booking-system-backend.git
cd booking-system-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
```

### 4. Run the server

```bash
npm run dev
```

---

## 📌 Status

🚧 Currently under development

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
