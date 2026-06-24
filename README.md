# 🛍️ Brain Store — Full Stack MERN E-Commerce Platform

A production-grade e-commerce application built with the MERN stack, featuring secure authentication, real-time cart, payments, and a full admin dashboard.

## 🚀 Live Demo
> 

## ✨ Features

### Customer
- 🔐 JWT access/refresh token auth with rotation + Redis blacklisting
- 🔑 Google OAuth 2.0 via Passport.js
- 📧 Email OTP verification & password reset
- 🛒 Cart with optimistic UI updates
- ❤️ Wishlist & product comparison
- 🔍 Instant search with suggestions & debouncing
- 💳 Razorpay payment integration
- 📦 Order tracking
- 📱 Fully responsive design

### Admin
- 📊 Analytics dashboard with Recharts
- 🏷️ Product/Category/Banner CMS
- 👥 User management (suspend, activate, roles)
- 📋 Order management & status updates

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Redux Toolkit, TailwindCSS v4, Framer Motion, MUI |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT, Passport.js (Google OAuth), bcrypt |
| Storage | Cloudinary |
| Payments | Razorpay |
| Caching | Redis |
| Validation | Zod |

## 📁 Project Structure

```
Brain Store/
├── Client/                  # React frontend
│   ├── src/
│   │   ├── api/             # Axios instance + interceptors
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/           # Route-level pages
│   │   ├── redux/           # Redux Toolkit slices + store
│   │   ├── hooks/           # Custom React hooks
│   │   └── Utils/           # Helpers
│   └── .env.example
│
└── Server/                  # Node/Express backend
    ├── Config/              # DB, Cloudinary, Passport, mail
    ├── Controllers/         # Route controllers
    ├── Middleware/          # Auth, error handler, rate limiter, validator
    ├── Models/              # Mongoose schemas
    ├── Route/               # Express routers
    ├── Utils/               # asyncHandler, tokens, cookieOptions
    ├── Validators/          # Zod schemas
    └── .env.example
```

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Cloudinary account
- Google OAuth credentials
- Razorpay account

### Backend

```bash
cd Server
cp .env.example .env     # fill in your values
npm install
npm run dev
```

### Frontend

```bash
cd Client
cp .env.example .env     # fill in your values
npm install
npm run dev
```

## 🔐 Environment Variables

See `Server/.env.example` and `Client/.env.example` for all required variables.

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/user/register | Register user |
| POST | /api/user/login | Login |
| POST | /api/user/verify-otp | Verify email OTP |
| POST | /api/user/refresh-token | Refresh access token |
| POST | /api/user/logout | Logout |
| GET | /api/product | List products |
| GET | /api/product/slug/:slug | Product detail |
| GET | /api/cart | Get cart |
| POST | /api/cart | Add/update cart item |
| GET | /api/order | Get orders |
| POST | /api/payment/create-order | Create Razorpay order |

## 📜 License
MIT
