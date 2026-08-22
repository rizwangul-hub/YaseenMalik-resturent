# 🍗 Yaseen Malak Restaurant — Full Stack Web Application

Welcome to the official web application and CMS portal for **Yaseen Malak Restaurant** (Peshawar Ring Road).

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

## ⚡ Local Development Setup

### 1. Install Dependencies
Run from the root folder:
```bash
npm run setup
```
*(Or navigate into `frontend`, `admin`, `backend` individually and run `npm install`)*

---

### 2. Start Servers

- **Frontend Customer Site** (Port `3000`):
  ```bash
  npm run dev:frontend
  ```
  Open: [http://localhost:3000](http://localhost:3000)

- **Admin CMS Panel** (Port `3001`):
  ```bash
  npm run dev:admin
  ```
  Open: [http://localhost:3001](http://localhost:3001)

- **Backend Express API** (Port `5000`):
  ```bash
  npm run dev:backend
  ```
  API Base: `http://localhost:5000/api`

---

## 🔐 Super Admin Login Credentials

- **Email**: `admin@yaseenmalakrestaurant.com`
- **Password**: `Admin@123456`

---

## 🚀 Live Vercel Deployment Instructions

### Deploying Frontend & Admin to Vercel

1. **Push Repository to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel & GitHub deployment"
   git push origin main
   ```

2. **Deploy Customer Site to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Import your GitHub Repository.
   - Set **Root Directory**: `frontend`
   - Set **Framework Preset**: `Vite`
   - Click **Deploy**.

3. **Deploy Admin Panel to Vercel**:
   - Create a second project on Vercel from the same repository.
   - Set **Root Directory**: `admin`
   - Set **Framework Preset**: `Vite`
   - Click **Deploy**.

4. **Deploy Express Backend to Render or Vercel**:
   - Set **Root Directory**: `backend`
   - Set Environment Variables:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
