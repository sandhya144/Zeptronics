<div align="center">

# ⚡ Zeptronics

> *🛒 "A specialized full-stack electronics marketplace — not just another generic store."*

<br/>

<div align="center">

<!-- Frontend -->
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Shadcn_UI-000000?style=flat&logo=shadcnui&logoColor=white">


<!-- Backend -->
<img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-404D59?style=flat">
<img src="https://img.shields.io/badge/Multer-FF6F00?style=flat">
<img src="https://img.shields.io/badge/Nodemailer-30B980?style=flat">

<!-- Database & Auth -->
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white">
<img src="https://img.shields.io/badge/bcrypt-3382CC?style=flat">
<img src="https://img.shields.io/badge/OTP-FF9800?style=flat">

<!-- Services -->
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white">
<img src="https://img.shields.io/badge/Razorpay-0D6EFD?style=flat&logo=razorpay&logoColor=white">

</div>

<br/>

**[🚀 Get Started](#-installation)** · **[✨ Features](#-features)** · **[🏗️ Architecture](#%EF%B8%8F-architecture)** · **[📡 API Reference](#-api-reference)** · **[🤝 Contributing](#-contributing)**


</div>


---

## 😤 The Problem

Generic e-commerce platforms force electronics shoppers to wade through irrelevant categories and clunky product comparisons. 
Finding the right laptop, headphone, or smart device by brand, spec, or price shouldn't feel like a scavenger hunt. 

Zeptronics is built specifically for electronics — the filtering, the categories, the admin tools — so nothing gets in the way of buying or selling the right gadget.

---
## 📖 About

Zeptronics is a full-stack MERN e-commerce platform built exclusively for buying and selling electronic gadgets and accessories. It was developed to create a **specialized electronics marketplace**, where users can easily discover, compare, and purchase products instead of using a generic online store.

The platform offers a complete online shopping experience with secure authentication, advanced product search and filtering, shopping cart management, Razorpay payment integration, and order tracking. It also features dedicated **User** and **Admin** panels, enabling customers to shop seamlessly while allowing administrators to efficiently manage products, users, orders, and overall store operations.


---

## ✨ Features

| ✅ Feature | 📝 Description |
|---|---|
| 🔍 Product Search & Filtering | Filter by brand, category, and price range |
| 🔐 Secure Authentication | JWT-based login, email verification, and password reset via OTP |
| 🌐 Google OAuth | Sign in with Google using Passport.js |
| 🛒 Cart Management | Add, update, and remove items from a persistent cart |
| 💳 Razorpay Payments | Secure checkout with signature verification and order saving |
| 📦 Order Tracking | Users can view purchase history and order status |
| ☁️ Cloudinary Image Hosting | Product images uploaded and served via Cloudinary |
| 🛠️ Admin Dashboard | Manage products, categories, users, and orders in one place |
| 📧 Email Notifications | Nodemailer-powered verification and OTP emails via Gmail SMTP |
| ⚙️ Redux State Management | Redux Toolkit + Redux Persist for reliable frontend state |

---

## 🏗️ System Architecture

```mermaid
graph LR

subgraph Frontend
    UI[React UI]
    Router[React Router]
    Store[Redux Toolkit]
    Client[Axios Client]
    UI --> Router --> Store --> Client
end

subgraph Backend
    UserRoute[api/user]
    ProductRoute[api/product]
    OrderRoute[api/order]
    Auth[JWT Middleware]
    Upload[Multer Middleware]
    AuthCtrl[Auth Controller]
    ProductCtrl[Product Controller]
    OrderCtrl[Order Controller]
    CartCtrl[Cart Controller]
end

subgraph Database
    Mongo[MongoDB Atlas]
end

subgraph External
    Cloudinary[Cloudinary]
    Razorpay[Razorpay]
    Mail[Nodemailer]
end

Client --> UserRoute --> Auth --> AuthCtrl
Client --> ProductRoute --> Upload --> ProductCtrl
Client --> OrderRoute --> Auth --> OrderCtrl
Auth --> CartCtrl

AuthCtrl --> Mongo
ProductCtrl --> Mongo
OrderCtrl --> Mongo
CartCtrl --> Mongo

ProductCtrl --> Cloudinary
OrderCtrl --> Razorpay
AuthCtrl --> Mail
```



---

## 🧰 Tech Stack

| 🔧 Layer | 💡 Technology |
|---|---|
| 🖥️ Frontend | React 19, Vite, react-router-dom, Axios |
| 🗂️ State | Redux Toolkit, Redux Persist |
| 🎨 UI | Tailwind CSS 4, shadcn/ui components, lucide-react, sonner |
| ⚙️ Backend | Node.js, Express 5 |
| 🗄️ Database | MongoDB Atlas, Mongoose |
| 🔐 Authentication | JWT, bcryptjs, Passport, passport-google-oauth20 |
| 📁 File Upload | Multer, Cloudinary |
| 💳 Payments | Razorpay |
| 📧 Email | Nodemailer (Gmail SMTP) |

---

## ⚙️ How It Works

### 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant React
    participant Express
    participant MongoDB
    participant Nodemailer

    User->>React: Fill signup form
    React->>Express: POST /api/user/register
    Express->>MongoDB: Save user - isVerified false
    Express->>Nodemailer: Send verification email with JWT link
    Nodemailer-->>User: Email with verify link

    User->>React: Click verify link
    React->>Express: POST /api/user/verify - JWT in header
    Express->>MongoDB: Set isVerified to true

    User->>React: Submit login form
    React->>Express: POST /api/user/login
    Express->>MongoDB: Check password with bcrypt
    Express-->>React: accessToken and refreshToken
```

### 💳 Payment Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Razorpay
    participant MongoDB

    User->>Frontend: Click Checkout
    Frontend->>Backend: Request order creation
    Backend->>Razorpay: Create order ID
    Razorpay-->>Backend: Return order ID
    Backend-->>Frontend: Send order ID and key
    Frontend->>User: Open Razorpay payment modal
    User->>Razorpay: Provide payment details
    Razorpay->>Backend: Webhook with payment result
    Backend->>Backend: Verify signature
    Backend->>MongoDB: Save order details
    Backend-->>Frontend: Success response
```

---

## 📸 Screenshots

```
![Homepage](docs/screenshots/homepage.png)
![Product Listing](docs/screenshots/products.png)
![Admin Dashboard](docs/screenshots/admin.png)
```

---

## 🚀 Installation

### 📋 Prerequisites

- ✅ Node.js 18+
- ✅ MongoDB Atlas account
- ✅ Cloudinary account
- ✅ Razorpay account
- ✅ Google Cloud project with OAuth 2.0 credentials
- ✅ Gmail account for Nodemailer

### 🖥️ Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zeptronics.git
   cd zeptronics
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create `backend/.env`:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
   SECRET_KEY=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MAIL_USER=your_gmail@gmail.com
   MAIL_PASS=your_gmail_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the backend:
   ```bash
   npm start
   ```

### 🌐 Frontend

5. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend:
   ```bash
   npm run dev
   ```

🎉 The app runs at `http://localhost:5173`, with the API at `http://localhost:8000`.

---

## 📁 Project Structure

```text
zeptronics/
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   └── usercontroller.js
│   ├── database/
│   │   └── db.js
│   ├── emailVerify/
│   │   ├── sendOTPMail.js
│   │   └── verifyEmail.js
│   ├── middleware/
│   │   └── isAuthenticated.js
│   ├── models/
│   │   ├── sessionmodel.js
│   │   └── usermodel.js
│   └── routes/
│       ├── authRoutes.js
│       └── userRoutes.js
└── frontend/
    ├── public/
    └── src/
        ├── App.jsx
        ├── assets/
        ├── components/
        │   ├── Hero.jsx
        │   ├── Navbar.jsx
        │   └── ui/
        ├── lib/
        │   └── utils.js
        └── pages/
            ├── AuthSuccess.jsx
            ├── Home.jsx
            ├── Login.jsx
            ├── Signup.jsx
            ├── Verify.jsx
            └── VerifyEmail.jsx
```

---

## 📡 API Reference

### 📝 POST `/api/v1/user/register`

```json
// Request
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secret123"
}

// Response
{
  "success": true,
  "message": "User registered Successfully",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isVerified": false,
    "isLoggedIn": false
  }
}
```

### ✅ POST `/api/v1/user/verify`

```json
// Header: Authorization: Bearer <registration-token>

// Response
{
  "success": true,
  "message": "Email verified successfully"
}
```

### 🔑 POST `/api/v1/user/login`

```json
// Request
{
  "email": "john@example.com",
  "password": "secret123"
}

// Response
{
  "success": true,
  "message": "Welcome back John",
  "user": { "firstName": "John", "isVerified": true, "isLoggedIn": true },
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>"
}
```

### 🔓 POST `/api/v1/user/forgot-password`

```json
// Request
{ "email": "john@example.com" }

// Response
{ "success": true, "message": "OTP sent to email successfully." }
```

### 🔢 POST `/api/v1/user/verify-otp/:email`

```json
// Request
{ "otp": "123456" }

// Response
{ "success": true, "message": "OTP verified Successfully" }
```

### 🔄 POST `/api/v1/user/change-password/:email`

```json
// Request
{ "newPassword": "new-secret-123", "confirmPassword": "new-secret-123" }

// Response
{ "success": true, "message": "Password changed successfully" }
```

### 🌐 GET `/auth/google`

Initiates Google OAuth flow. No request body required. Passport redirects the user to Google's consent screen.

### 👤 GET `/auth/me`

```json
// Header: Authorization: Bearer <access-token>

// Response
{ "success": true, "user": { ... } }
```

---

## 🛠️ Troubleshooting

```mermaid
flowchart TD
    Start[Setup fails - where?]

    Start --> A{MongoDB connect error?}
    A -- Yes --> A1[Check MONGO_URI in backend/.env]
    A1 --> A2[Format must be: mongodb+srv://user:pass@cluster.mongodb.net]
    A2 --> A3[db.js appends /zeptronics - do not include DB name in URI]

    Start --> B{Email not sent?}
    B -- Yes --> B1[Check MAIL_USER and MAIL_PASS in backend/.env]
    B1 --> B2[Use a Gmail App Password, not your account password]
    B2 --> B3[Enable 2FA in Google account first, then generate App Password]

    Start --> C{Google login fails?}
    C -- Yes --> C1[Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET]
    C1 --> C2[Check callback URL in Google Cloud Console]
    C2 --> C3[Must be exactly: http://localhost:8000/auth/google/callback]
```

<details>
<summary>🍃 MongoDB never connects</summary>

Set `MONGO_URI` to a valid MongoDB Atlas connection string in `backend/.env`. The app appends `/zeptronics` to it in `backend/database/db.js`, so do not include a database name in the base URI. A correct value looks like:

```
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net
```

</details>

<details>
<summary>📧 Verification or password reset email is not delivered</summary>

Set `MAIL_USER` and `MAIL_PASS` in `backend/.env`. `MAIL_PASS` must be a **Gmail App Password**, not your regular Gmail password. To generate one: enable 2-Step Verification on your Google account, then go to Google Account > Security > App Passwords and generate a password for "Mail".

</details>

<details>
<summary>🌐 Google OAuth redirects back with an error or loops</summary>

Confirm `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `CLIENT_URL=http://localhost:5173` are set in `backend/.env`. In Google Cloud Console, the authorized redirect URI must be exactly `http://localhost:8000/auth/google/callback` — this must match the callback registered in `backend/config/passport.js`.

</details>

---

## 🗺️ Roadmap

- [ ] 🔒 Add protected frontend routes for authenticated pages
- [ ] 🌍 Replace hardcoded `localhost` API URLs with a shared env-based client config
- [ ] 💬 Improve password reset and auth error handling in the UI
- [ ] 👤 Standardize the user profile and admin access flow
- [ ] 🧪 Add automated tests for controllers and middleware

---

## 🤝 Contributing

```bash
# 1. Fork the repo and create your branch
git checkout -b feature/your-change

# 2. Make your changes, then stage them
git add .

# 3. Commit with a clear message
git commit -m "Describe your change"

# 4. Push and open a pull request
git push origin feature/your-change
```

💡 Please keep PRs focused on a single concern and describe what you changed and why.

---

## 📄 License & 📬 Contact

**License:** ISC — see `backend/package.json`.

No maintainer contact is listed in the repository. Open an issue for questions or bug reports.

---

[🔝 Back to top](#-zeptronics)