# MyStore — MERN Stack E-Commerce Platform

A full-stack e-commerce application built with MongoDB, Express, Next.js, and Node.js. Includes product browsing, cart management, secure checkout, order tracking, and a complete admin dashboard — all wrapped in a custom dark glassmorphism UI.

## Features

**Customer**
- Browse products with category and image display
- Product detail pages with live stock tracking
- Persistent shopping cart (add, update quantity, remove items)
- Secure checkout with shipping address collection
- Order history and order confirmation pages

**Admin**
- Add, edit, and delete products
- View all customer orders across the platform
- Update order status (pending → processing → shipped → delivered → cancelled)
- Role-based access control — admin routes are protected on both frontend and backend

**Auth & Security**
- JWT authentication stored in HTTP-only cookies (not localStorage — protects against XSS)
- Passwords hashed with bcrypt, never stored or returned in plain text
- Role-based middleware protecting sensitive API routes
- Frontend route guarding redirects unauthorized users away from admin pages

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- Tailwind CSS
- Axios for API requests
- React Context for global auth state

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing

**Database**
- MongoDB Atlas (cloud-hosted)

## Project Structure

**Backend** (`backend/`)
- `config/` — Database connection
- `controllers/` — Route logic (products, auth, cart, orders)
- `middleware/` — JWT auth + admin protection
- `models/` — Mongoose schemas
- `routes/` — API route definitions
- `utils/` — JWT token generation
- `server.js` — App entry point

**Frontend** (`frontend/`)
- `app/` — Next.js App Router pages
  - `admin/` — Admin product & order management
  - `cart/`, `checkout/`, `login/`, `register/`, `orders/`, `products/`
- `components/` — Navbar, AdminRoute guard
- `context/` — AuthContext (global user state)
- `lib/` — Axios API client

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd mern-ecommerce
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run the frontend:
```bash
npm run dev
```

### 4. Open the app
Visit `http://localhost:3000`

## API Overview

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Create account | Public |
| POST | `/api/auth/login` | Log in | Public |
| POST | `/api/auth/logout` | Log out | Public |
| GET | `/api/auth/me` | Get current user | Logged in |
| GET | `/api/products` | List products | Public |
| POST | `/api/products` | Create product | Admin |
| PUT/DELETE | `/api/products/:id` | Edit/delete product | Admin |
| GET/POST | `/api/cart` | View/add to cart | Logged in |
| PUT/DELETE | `/api/cart/:productId` | Update/remove cart item | Logged in |
| POST | `/api/orders` | Place order (checkout) | Logged in |
| GET | `/api/orders/myorders` | Own order history | Logged in |
| GET | `/api/orders` | All orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

## Notes

This project was built as a learning exercise following a MERN stack curriculum, with a focus on understanding authentication flows, role-based authorization, and full-stack data flow between MongoDB, Express, and Next.js.

## License

MIT