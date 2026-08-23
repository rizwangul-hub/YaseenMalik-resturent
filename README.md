# 🍗 Yaseen Malak Restaurant — Full Stack Web Application & CMS

Official web application, executive CMS portal, and REST API for **Yaseen Malak Restaurant** (Peshawar Ring Road).

---

## 🌐 Live Production Deployments (Vercel)

- 🌐 **Public Website**: [https://yaseen-malik-resturent.vercel.app](https://yaseen-malik-resturent.vercel.app)
- 🔐 **Admin CMS Panel**: [https://yaseen-malik-resturent-e9pd.vercel.app](https://yaseen-malik-resturent-e9pd.vercel.app)
- ⚙️ **Backend REST API**: [https://yaseen-malik-resturent-bqfm.vercel.app](https://yaseen-malik-resturent-bqfm.vercel.app)

---

## 📁 Repository Structure

```
yaseen-malak-restaurant/
├── frontend/             # Customer Public Web Application (Vite + React + Tailwind)
├── admin/                # Executive CMS Admin Panel (Vite + React + Tailwind)
├── backend/              # Node.js + Express + TypeScript API Server (MongoDB & Cloudinary)
├── package.json          # Root Monorepo Scripts
├── .gitignore            # Git exclusion settings
└── README.md             # Project documentation
```

---

## 🔑 Admin Login Credentials

- **Email**: `admin@yaseenmalakrestaurant.com`
- **Password**: `Admin@123456`

---

## ⚙️ Environment Variables Setup

### 1. Frontend (`frontend/.env`)
```env
VITE_API_URL=https://yaseen-malik-resturent-bqfm.vercel.app/api
```

### 2. Admin Panel (`admin/.env`)
```env
VITE_API_URL=https://yaseen-malik-resturent-bqfm.vercel.app/api
```

### 3. Backend API (`backend/.env` & Vercel Dashboard)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://rizwangul535_db_user:LYGTNebZbKQQ0csd@cluster0.wun93hu.mongodb.net/yaseen_malak_db
JWT_SECRET=yaseen_malak_super_secret_jwt_key_2026
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## ⚡ Local Development Commands

- **Start Customer Site**: `npm run dev:frontend` (Port 3000)
- **Start Admin Panel**: `npm run dev:admin` (Port 3001)
- **Start Backend API**: `npm run dev:backend` (Port 5000)
