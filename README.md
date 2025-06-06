# 📦 Online Courier Platform

An end-to-end web-based courier management system developed using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The platform allows users to book and track couriers while providing administrators with full control to manage and monitor deliveries.

---

## 🚀 Features

### 👤 User Module:
- User Registration & Login
- Book new courier with recipient details
- Auto-calculate charges based on weight slabs
- Pickup date validation (must be after today)
- View courier history and current delivery status
- Logout functionality
- Track order by Courier ID

### 🛠️ Admin Module:
- Admin Login with dashboard overview
- View total couriers by delivery status
- Filter and update courier statuses (Pending → Delivered)
- Access detailed courier information
- Logout securely

### 📊 Dashboard Statistics:
- Total Couriers
- In Transit / Picked Up / Delivered
- Out for Delivery / Arrived at Destination

---

## 📦 Technologies Used

- **Frontend:** React.js, React Router, Axios, React Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** CSS (no external frameworks)
- **Other Tools:** Git, VS Code, Postman (for API testing)

---

## 📌 Installation & Usage

### Prerequisites:
- Node.js & npm
- MongoDB (local or MongoDB Atlas)

---

### 🔧 Backend Setup:

```bash
cd server
npm install
npm start
```

🎨 Frontend Setup:
```bash
cd client
npm install
npm start
```
📌 Note:
Make sure to update the API base URL in the frontend (.env file or directly in your code) if your backend is hosted separately.

📖 Pages Included
Home

Login / Sign-Up

User Dashboard

Admin Dashboard

Courier Booking Form

Courier Listing (filtered by status)

Quotation Page

Track Order Page

Contact Us / About Us / Services

