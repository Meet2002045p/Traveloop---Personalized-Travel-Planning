# 🌍 Traveloop - Intelligent Multi-City Planner

Traveloop is a professional **Full-Stack MERN Application** designed for precision travel planning. It combines a stunning, modern UI with a powerful Node.js backend and MongoDB database to provide a seamless itinerary and budget management experience.

---

## 🚀 Key Features

### 🔐 Secure Authentication
* **JWT-Based Security:** Industry-standard JSON Web Tokens for secure session management.
* **Password Hashing:** Passwords are never stored in plain text; they are hashed using `bcryptjs`.
* **Private Data:** Every user has their own private space. Your trips and budgets are invisible to everyone else.
* **Protected Routes:** Advanced middleware prevents unauthorized access to any part of the app.

### 📅 Trip & Itinerary Management
* **Cloud Storage:** Create trips that are instantly saved to MongoDB.
* **Smart Builder:** Build detailed daily plans with locations, times, and categories.
* **Personalized Dashboard:** A high-end greeting system that welcomes you by name and shows real-time stats from the database.

### 💰 Budget Tracking
* **Live Expense Sync:** Add expenses in real-time and see them instantly reflected in your database.
* **Progress Tracking:** Interactive progress bars show exactly how much of your budget remains.
* **Category Breakdown:** Visualize your spending across Transport, Food, Activities, and more.

### 🛡️ Backend Security
* **Helmet.js:** Hardened HTTP headers to prevent XSS and Clickjacking.
* **Rate Limiting:** Prevents brute-force attacks on the API.
* **CORS Enabled:** Seamless and secure communication between the Frontend and Backend.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, Tailwind CSS (Modern UI), Vanilla JavaScript (Modular ES6).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (using Mongoose ODM).
* **Security:** JWT, Bcryptjs, Helmet, Express-Rate-Limit.

---

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### 1. Prerequisites
* [Node.js](https://nodejs.org/) installed.
* [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally (or a MongoDB Atlas URI).

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/traveloop
   JWT_SECRET=your_super_secret_key_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a **new** terminal in the main project directory.
2. Start a local server (e.g., using Python):
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to:
   👉 `http://localhost:8000/pages/login_signup.html`

---

## 📂 Project Structure

```text
├── backend/
│   ├── middleware/    # Auth & Security logic
│   ├── models/        # MongoDB Schemas (User, Trip, etc.)
│   ├── routes/        # API Endpoints
│   ├── server.js      # Main entry point
│   └── .env           # Private environment variables
├── pages/             # Frontend HTML pages
├── js/                # Shared frontend scripts (Auth Guard, etc.)
├── css/               # Styling
└── README.md          # Project documentation
```

---

## 📝 License
This project is for educational and portfolio purposes. Feel free to use and modify it!

---
**Plan your next adventure with precision. Plan with Traveloop.**
