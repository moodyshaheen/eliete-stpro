# EliteStore Backend API

Backend API for EliteStore E-commerce platform.

## Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ User Profile Management
- ✅ Product Management (CRUD)
- ✅ Order Management
- ✅ Category Management
- ✅ Favorites System
- ✅ Admin Panel APIs
- ✅ File Upload (Images)
- ✅ JWT Authentication
- ✅ Error Handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (Protected)

### Profile
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update profile (Protected)
- `PUT /api/profile/password` - Change password (Protected)
- `GET /api/profile/favorites` - Get favorites (Protected)
- `POST /api/profile/favorites/:productId` - Add to favorites (Protected)
- `DELETE /api/profile/favorites/:productId` - Remove from favorites (Protected)

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Categories
- `GET /api/categories` - Get all categories (Public)
- `GET /api/categories/:id` - Get single category (Public)
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/toggle` - Toggle user status

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

## Run

```bash
# Development
npm run dev

# Production
npm start
```

