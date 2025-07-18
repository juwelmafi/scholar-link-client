# 🎓 ScholarLink – Scholarship Management System

ScholarLink is a comprehensive, full-stack Scholarship Management System that connects students with scholarship opportunities across the globe. It offers role-based access, secure payments, and an intuitive user experience for both applicants and administrators.

> 🚀 Live Site: [scholarlink.web.app](https://scholar-link-app.web.app/)  
> 📦 Backend Server: [Render Link](https://scholar-link-server.vercel.app/)  
> 🔐 Modarator Demo: `mod@rator.com` | `Moda@rator12`  


---

## 🌟 Key Features

### 👤 **User Side**
- 🔍 Search Scholarships by University, Degree, or Title
- 📄 Apply with Pre-Filled Form + Secure Stripe Payment
- 📂 My Applications Page (status & feedback tracking)
- ⭐ Add/Edit/Delete Reviews
- 📊 Dynamic “Our Impact” section
- 🧑‍💻 Role-based access: User, Admin, Moderator

### 🧑‍⚖️ **Moderator Dashboard**
- 🛠 Manage Scholarships (Edit/Delete/View)
- 📋 All Applied Scholarships (give feedback, cancel)
- 💬 Manage All Reviews (delete inappropriate)

### 🛡 **Admin Dashboard**
- 👥 Manage All Users (change roles, delete)
- 📊 Analytics Page
  - 📈 Daily Applications Chart
  - 🧮 Category-wise Applications
  - 🧑‍🎓 User Role Distribution

---

## 🧰 Tech Stack

### 🔵 Frontend
- React (Vite)
- Tailwind CSS + DaisyUI
- React Router DOM
- Axios
- Swiper.js (Testimonial slider)
- SweetAlert2 (Beautiful alerts)
- React Hook Form + Zod (form validation)
- Chart.js + react-chartjs-2

### 🟢 Backend
- Node.js + Express.js
- MongoDB (with Mongoose)
- Firebase Admin SDK (Auth & Role management)
- Stripe (Payment Integration)
- JWT (planned for enhancement)
- CORS, Dotenv, Helmet

---


<!-- ---

## ⚙️ How to Run Locally

### ✅ Prerequisites:
- Node.js
- MongoDB
- Stripe account (test keys)
- Firebase project (for auth)
- Your Firebase Admin SDK JSON file

---

### 🔹 Clone the Project

`git clone https://github.com/your-username/scholarlink.git`
`cd scholarlink`

### 🔹 Setup Backend

`cd server`
`npm install`

### 🔐 Create .env file inside server

`PORT=5000
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
FIREBASE_ADMIN_SDK=your_base64_encoded_firebase_admin_key`


## You can encode your Firebase key using:

`
const fs = require("fs");
const key = fs.readFileSync("./firebase-admin.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);

`

### ▶️ Run Backend
`nodemon index.js`

### 🔹 Setup Frontend

`
cd client
npm install

`

## 🔐 Create .env in /client

`
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key

`

### ▶️ Run Frontend

`npm run dev` -->