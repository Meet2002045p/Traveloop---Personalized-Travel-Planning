# 🌍 Traveloop - Intelligent Multi-City Planner

Traveloop is a professional **Full-Stack MERN Application** designed for precision travel planning. It combines a stunning, modern UI with a powerful Node.js backend and MongoDB database to provide a seamless itinerary and budget management experience.

---

## 🚀 Key Features

### 🔐 Secure Authentication & Personalization
* **JWT-Based Security:** Industry-standard JSON Web Tokens for secure session management.
* **Password Hashing:** Passwords are never stored in plain text; they are hashed using `bcryptjs`.
* **Private Data:** Every user has their own private space. Your trips and budgets are completely isolated and secure.
* **Protected Routes:** Advanced middleware prevents unauthorized access to any part of the app.
* **Dynamic Avatars:** Automatically generates customized user avatars based on profile names using the UI Avatars API.

### 📅 Advanced Trip Management
* **Cloud Storage:** Create trips with detailed descriptions and dates that instantly save to MongoDB.
* **Custom Image Uploads:** Upload your own cover photos for your trips. Includes smart client-side image compression to optimize database payload sizes.
* **Dynamic Modals:** Beautiful, responsive UI popups for viewing trip overviews, budgets, and quick actions.
* **Smart Itinerary Builder:** Build detailed daily plans with locations, times, and categories mapped to specific trips.

### 💰 Real-Time Budget Tracking
* **Live Expense Sync:** Add expenses in real-time and see them instantly reflected in your database.
* **Progress Tracking:** Interactive progress bars automatically calculate and display exactly how much of your allocated trip budget remains.
* **Category Breakdown:** Visualize your spending dynamically across categories like Transport, Food, and Activities.

### 🤖 AI-Powered Travel Assistant
* **Interactive AI Chat:** A floating, responsive AI assistant embedded in the application.
* **Backend Integration:** Communicates with a dedicated `/api/ai/generate` backend route to provide travel suggestions, insights, and assistance.

### 🛡️ Backend Security
* **Helmet.js:** Hardened HTTP headers to prevent XSS and Clickjacking.
* **Rate Limiting:** Prevents brute-force attacks on the API authentication endpoints.
* **CORS Enabled:** Strict and secure cross-origin communication between the frontend and backend.

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
│   ├── models/        # MongoDB Schemas (User, Trip, Activity, Expense)
│   ├── routes/        # API Endpoints (auth, trips, itinerary, budget, ai)
│   ├── server.js      # Main Express application
│   └── .env           # Private environment variables
├── pages/             # Frontend HTML pages
├── js/                # Shared frontend scripts (auth-guard.js, UI transitions)
├── css/               # Global styling
└── README.md          # Project documentation
```

---

## 📝 Future Implementations
* **Socket.io:** Real-time collaborative itinerary editing.
* **Leaflet.js Map Integration:** Visualize saved trip locations on an interactive map.
* **PDF Export:** Allow users to export completed itineraries and budgets via jsPDF.

---

**Plan your next adventure with precision. Plan with Traveloop.**
