# NestJS Basic Auth

A production-oriented authentication starter built with **NestJS**, **PostgreSQL**, **TypeORM**, and **JWT**.

This project provides a secure authentication foundation with email verification, refresh token rotation, role-based authorization, profile management, and file uploads. It is designed as a reusable starting point for future NestJS applications.

---

# Features

## Authentication

- User registration
- Email OTP verification
- Login with JWT
- Refresh token rotation
- Logout (current device)
- Logout from all devices
- Password reset using OTP
- Secure password hashing using bcrypt

## Authorization

- Role-based access control (RBAC)
- Database-driven permissions
- Global authorization guard
- Public route decorator

## User Management

- Get current user
- Update profile
- Get user by ID
- Cursor-based user listing
- Search users
- Role filtering

## File Uploads

- Profile image upload
- Profile image replacement
- Profile image deletion
- Cloudinary integration
- Automatic cleanup of replaced files

## Security

- Access tokens
- Refresh tokens
- Refresh token rotation
- Refresh token revocation
- HttpOnly cookies
- Email verification
- OTP expiration
- OTP attempt limiting
- Account lock after repeated failures
- Validation using class-validator
- Request throttling

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- Bcrypt
- Cloudinary
- Resend
- Swagger

---

# Project Structure

```
src
├── common
├── config
├── modules
│   ├── auth
│   ├── authorization
│   ├── email
│   ├── file
│   ├── user
│   └── ...
├── scripts
└── main.ts
```

---

# Authentication Flow

## Registration

```
Register
      │
      ▼
Send OTP
      │
      ▼
Verify Email
      │
      ▼
Login
      │
      ▼
Access Token
Refresh Token
```

---

## Login

```
Login
    │
    ▼
Access Token
Refresh Token
```

---

## Refresh

```
Expired Access Token
          │
          ▼
Refresh Token
          │
          ▼
New Access Token
New Refresh Token
```

---

## Forgot Password

```
Send OTP
     │
     ▼
Verify OTP
     │
     ▼
Change Password
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/Harman-Bhuju/NestJs-Basic-Auth.git
```

Go into the project

```bash
cd NestJs-Basic-Auth
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
# -----------------------------------------------------------------------------
# Server
# -----------------------------------------------------------------------------
PORT=5000
COOKIE_SECURE=false
LOG_LEVEL=INFO

# Comma-separated list of allowed frontend origins
WHITELIST=http://localhost:3000

# -----------------------------------------------------------------------------
# Database
# -----------------------------------------------------------------------------
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_database_password
DB_NAME=nestjs_auth
DB_SSL=false
DB_SYNCHRONIZE=false
DB_LOGGING=false

# -----------------------------------------------------------------------------
# JWT
# -----------------------------------------------------------------------------
JWT_ACCESS_SECRET=your_long_random_access_secret
JWT_REFRESH_SECRET=your_long_random_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=30d

# -----------------------------------------------------------------------------
# Password Hashing
# -----------------------------------------------------------------------------
BCRYPT_SALT_ROUNDS=10

# -----------------------------------------------------------------------------
# Email (Resend)
# -----------------------------------------------------------------------------
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@example.com
APP_NAME=NestJS Basic Auth
APP_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# Cloudinary
# -----------------------------------------------------------------------------
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=

# -----------------------------------------------------------------------------
# File Upload
# -----------------------------------------------------------------------------
FILE_SIZE_LIMIT_MB=10
ENABLE_MULTIPART=true
```

# Running the Project

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# Swagger Documentation

After starting the server

```
http://localhost:3000/api/docs
```

OpenAPI JSON

```
http://localhost:3000/apis-json
```

---

# Main API Modules

## Auth

- Register
- Verify OTP
- Login
- Refresh Token
- Send OTP
- Change Password
- Logout
- Logout All Devices

## User

- Get current user
- Update profile
- Get user by ID
- List users

## File

- Upload profile picture
- Delete profile picture

---

# Security Features

- JWT Authentication
- Refresh Token Rotation
- Password Hashing
- Email Verification
- OTP Expiration
- OTP Attempt Limits
- Account Locking
- HttpOnly Cookies
- Request Throttling
- Role-Based Authorization

---

# Development Notes

This project uses:

- Global ValidationPipe
- Global Exception Filter
- Global Authentication Guard
- Global Authorization Guard
- DTO validation
- Repository pattern
- Service-oriented architecture

---

# License

MIT