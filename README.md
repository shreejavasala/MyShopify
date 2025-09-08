# MyShopify - E-commerce Web Application

**MyShopify** is a full-stack e-commerce web application built using **MERN stack** (MongoDB, Express.js, React, Node.js). Users can browse items, filter by categories and price, add & remove products from their cart, and manage their account. The application supports authentication and CRUD operations for items (admin).

---

## Live Demo

- Frontend: [MyShopify Frontend](https://my-shopify-clvx.vercel.app)  
- Backend API: [MyShopify Backend](https://my-shopify-blond.vercel.app)

---

## Features

- **User Authentication**: Signup, Login, and Logout functionality with JWT tokens.
- **Product Browsing**: View all items with pagination.
- **Filtering**: Filter items by category and price range.
- **Cart Management**: Add & remove items to the cart (requires login) and view cart.
- **Admin Functions**: Add, update, and delete items (requires admin token).
- **Responsive Design**: Works seamlessly on mobile and desktop devices.
- **Cloudinary Integration**: All product images are uploaded to Cloudinary for hosting.
---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, React Toastify  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT (JSON Web Tokens)  
- **File Uploads**: Cloudinary  
- **Deployment**: Vercel (Frontend & Backend)  
---

##  Cloudinary

**Cloudinary** is a cloud-based media management platform that enables developers to upload, store, transform, optimize, and deliver images and videos at scale via powerful APIs. It offers dynamic transformations—such as resizing, cropping, format conversion, and AI-powered enhancements—and uses a global CDN for fast delivery, improving performance and user experience. 

[Check out Cloudinary](https://cloudinary.com)  

---

## 📂 Folder Structure
```bash
myShopify/
├── backend/
│   ├── Assets/
│   │   └── Images/
│   ├── config/
│   │   ├── allowedOrigins.js
│   │   └── dbConn.js
    ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── item.controller.js
│   │   └── cart.controller.js
│   ├── models/
│   │   ├── auth.model.js
│   │   ├── item.model.js
│   │   └── cart.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── item.route.js
│   │   └── cart.route.js
|   ├── .env
│   ├── server.js
│   └── package.json
│   └── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
│
└── README.md

```
---

## 🔗 API Endpoints

### Auth Routes (`/api/auth`)
- **POST** `/signup` → Register a new user  
- **POST** `/login` → Login and receive JWT token  
- **GET** `/profile` → Get logged-in user profile (requires token)  

### Item Routes (`/api/items`)
- **GET** `/` → Fetch all items (with pagination & filters)  
- **GET** `/:id` → Fetch a single item by ID  
- **POST** `/` → Add a new item (Admin only)  
- **PUT** `/:id` → Update item by ID (Admin only)  
- **DELETE** `/:id` → Delete item by ID (Admin only)  

### Cart Routes (`/api/cart`)
- **GET** `/` → Get user cart  
- **POST** `/add` → Add an item to cart  
- **PUT** `/update` → Update item quantity in cart  
- **DELETE** `/remove/` → Remove an item from cart  
- **DELETE** `/clear` → Clear the entire cart  
---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/myshopify.git
cd myshopify
```
### 2. Backend Setup
```bash

cd backend
npm install
```
### Create a .env file

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```
### Start the server

```bash
npm run dev
```
### 3. Frontend Setup

```bash
cd frontend
npm install
```
### Create a .env file

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

### Start the frontend
```bash
npm run dev
```
### 4. Deployment

- Backend: Deploy to Vercel
- Frontend: Deploy to Vercel and update VITE_API_BASE_URL with backend URL in frontend env.

- ## 👩‍💻 Author

**Shreeja Vasala**  

- [GitHub](https://github.com/shreejavasala)  
- [LinkedIn](https://www.linkedin.com/in/shreeja-vasala/)

  ---

## 🙏 Thank You

Thank you for checking out **MyShopify** 🛒  


