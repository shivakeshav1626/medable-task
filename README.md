# 🔐 User Management API – Medable Assessment

This repository contains my submission for the **Medable Round 1 – User Management API** assessment.

The task involved fixing issues in an existing Node.js codebase, improving security, implementing missing features, and solving hidden challenges, while keeping the original structure and behavior intact.

---

## 📌 Project Overview

This is a backend REST API built using Node.js and Express that provides:

- User registration and authentication
- JWT-based authorization
- Role-based access control (Admin/User)
- Secure profile and password management
- Admin-level user statistics
- Hidden endpoints and puzzles as part of the assessment

The focus of the implementation was correctness, security, and clarity without unnecessary refactoring.

---

## 🛠️ Tech Stack

- Node.js (v18+)
- Express.js
- JSON Web Tokens (JWT)
- bcrypt
- dotenv
- express-rate-limit

---

## 🚀 Setup & Run Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation & Run

```bash
npm install
npm run dev
```

The server will start on:

```
http://localhost:8888
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_secure_jwt_secret
```

---

## ✅ Implemented Features & Fixes

- JWT authentication middleware for protected routes
- Role-based access control for admin-only operations
- Secure password hashing for user creation and updates
- Prevention of sensitive data exposure in API responses
- Rate limiting to protect against brute-force attacks
- Centralized user data handling and improved error handling
- Prevention of self-account deletion
- Admin-only access for restricted endpoints

---

## 🧩 Hidden Challenges

The application includes hidden headers and endpoints as part of the assessment.  
These were identified and verified while keeping their original behavior intact.

---

## 🧪 Testing

Manual testing was performed using:
- Postman
- curl

Scenarios tested:
- Authentication and authorization
- Invalid credentials and tokens
- Role-based access restrictions
- Edge cases and error handling

---

Thank you for the opportunity.
