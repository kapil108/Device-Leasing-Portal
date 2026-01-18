<div align="center">

# 🚀 Device Leasing Portal

### *A Premium Platform for Corporate Device Management*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

</div>

## ✨ Overview

The **Device Leasing Portal** is a modern, full-stack web application that bridges the gap between device suppliers and corporate employees. Built with cutting-edge technologies and featuring a stunning glassmorphism UI, it provides a seamless experience for managing device inventory and marketplace operations.

## 🎯 Key Features

### 🏢 For Suppliers
- **📊 Dashboard Management** - Comprehensive view of all device listings
- **➕ Create Listings** - Add new devices with pricing and stock management
- **✏️ Edit & Delete** - Full CRUD operations on inventory
- **📈 Stock Tracking** - Real-time inventory monitoring
- **💰 Offer Management** - Flexible pricing with discounts (percentage/flat)

### 👤 For Employees
- **🛒 Marketplace** - Browse beautiful, responsive device catalog
- **🔍 Search & Filter** - Find devices quickly
- **💎 Exclusive Offers** - View special pricing and deals
- **📱 Lease Calculation** - Clear monthly payment breakdown

### 🎨 Design Highlights
- **✨ Glassmorphism UI** - Modern, translucent panels with backdrop blur
- **🌈 Vibrant Neon Gradients** - Electric Purple & Neon Cyan theming
- **🎭 Smooth Animations** - Entrance slides, floating elements, hover effects
- **📱 Fully Responsive** - Mobile-first design approach
- **🖋️ Custom Typography** - Outfit font for a premium feel

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16.1.3, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **Backend** | Next.js API Routes, RESTful architecture |
| **Database** | MongoDB with Mongoose ORM |
| **Authentication** | JWT (JSON Web Tokens), bcrypt.js |
| **Deployment** | Vercel-ready with MongoDB Atlas |

## 📁 Project Structure

```
supplier-managed-device-listings/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── devices/      # Public device endpoints
│   │   │   └── supplier/     # Supplier-specific endpoints
│   │   ├── employee/         # Employee portal
│   │   ├── supplier/         # Supplier portal
│   │   ├── marketplace/      # Public marketplace
│   │   ├── globals.css       # Global styles & animations
│   │   └── layout.tsx        # Root layout
│   ├── lib/                  # Utilities
│   │   ├── auth.ts           # JWT utilities
│   │   ├── db.ts             # MongoDB connection
│   │   └── pricing.ts        # Price calculation logic
│   └── models/               # Mongoose schemas
│       ├── User.ts
│       ├── DeviceListing.ts
│       └── StockLog.ts
└── public/                   # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kapil108/Device-Leasing-Portal.git
cd Device-Leasing-Portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
cp .env.example .env.local
```

Add your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Seed the database**
```bash
# Visit http://localhost:3000/api/auth/register after starting the server
```

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 🔐 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| **Supplier** | supplier@test.com | Supplier@123 |
| **Employee** | employee@test.com | Employee@123 |

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/0a0a0f/00f3ff?text=Landing+Page)

### Supplier Dashboard
![Supplier Dashboard](https://via.placeholder.com/800x400/0a0a0f/bc13fe?text=Supplier+Dashboard)

### Marketplace
![Marketplace](https://via.placeholder.com/800x400/0a0a0f/00f3ff?text=Marketplace)

</div>

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Seed database with test users

### Devices (Public)
- `GET /api/devices` - Get all available devices

### Supplier Endpoints
- `GET /api/supplier/devices` - Get supplier's devices
- `POST /api/supplier/devices` - Create new listing
- `PUT /api/supplier/devices/[id]` - Update listing
- `DELETE /api/supplier/devices/[id]` - Delete listing
- `POST /api/supplier/devices/[id]/stock` - Adjust stock

## 🎨 Design System

### Color Palette
```css
--primary: #bc13fe;        /* Electric Purple */
--secondary: #00f3ff;      /* Neon Cyan */
--accent: #ff0055;         /* Hot Pink */
--background: #0a0a0f;     /* Deep Dark */
```

### Key Animations
- `animate-slide-up` - Entrance animations
- `animate-floating` - Continuous floating effect
- `animate-pulse-glow` - Pulsing glow effect
- `hover-glow` - Interactive hover states

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kapil**
- GitHub: [@kapil108](https://github.com/kapil108)

## 🌟 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first styling approach

---

<div align="center">

Made with ❤️ and ☕

**[⬆ Back to Top](#-device-leasing-portal)**

</div>
