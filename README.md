# 🍽️ Catering Reservation System

A **modern web-based catering reservation system** that allows users to **browse, order, and manage catering services** seamlessly. Built using **Firebase (Firestore, Authentication, Hosting)** along with **HTML, CSS, and JavaScript**.

## 🚀 Features
✅ **User Authentication:** Login/Register using Firebase Auth  
✅ **Product Management:** Admin can **add, edit, delete** products  
✅ **Cart System:** Users can **add/remove items** from the cart  
✅ **Order Management:** Users can **place orders** and manage them  
✅ **Order Status Updates:** Mark orders as **Completed**  
✅ **Real-time Updates:** Orders and Products update instantly  
✅ **Free Deployment Options:** Can be hosted on **Vercel, Netlify, or Firebase Hosting**  

---

## 🛠️ Tech Stack
| **Technology** | **Usage** |
|--------------|------------|
| **HTML/CSS/JavaScript** | Frontend Design & Functionality |
| **Firebase Firestore** | Database for storing products & orders |
| **Firebase Auth** | User authentication (Login/Register) |
| **Firebase Hosting** | Free website hosting (alternative: Vercel/Netlify) |
| **Firebase Emulators** | Local testing without Blaze Plan |
| **Vercel/Netlify (Optional)** | Alternative free hosting |

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
git clone https://github.com/YOUR_USERNAME/catering-reservation-system.git
cd catering-reservation-system

2️⃣ Install Firebase CLI (if not installed)
npm install -g firebase-tools

3️⃣ Setup Firebase in Your Project
firebase login
firebase init
Select Firestore, Hosting, and Emulators (for local testing).

4️⃣ Run Firebase Locally (For Free)
firebase emulators:start
👉 This allows testing Authentication, Firestore, and Hosting without upgrading to Blaze Plan.

5️⃣ Deploy the Website (Free)
To deploy on Firebase Hosting (Free):
firebase deploy --except functions
Or use Vercel (Alternative Free Deployment):
npm install -g vercel
vercel

## 🛠️ How to Use the System
👤 User Actions
1️⃣ Sign up/Login to access the system
2️⃣ Browse products and add to cart
3️⃣ View & manage cart items
4️⃣ Place an order and check order status
5️⃣ Edit or cancel orders if needed

## 🔑 Admin Actions
1️⃣ Login as an Admin
2️⃣ Add, Edit, or Delete products
3️⃣ View all orders and mark them as "Completed"


## 📢 Contributors
💡 Developed by: Mohit Jain

🙌 Want to contribute? Feel free to fork this repository, make improvements, and submit a pull request.

## 📜 License
📝 This project is MIT Licensed. You are free to modify and distribute it.
