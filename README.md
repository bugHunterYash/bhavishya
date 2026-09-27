# Bhavishya — Unified School Experience Platform

![Bhavishya Banner](/public/login-bg.jpg)

Bhavishya is a premium, modern, and comprehensive School Management and Experience platform built for the future of education. Designed with a focus on trust, aesthetics, and operational efficiency, it bridges the gap between school administration, educators, parents, and students through a unified digital interface.

> **"A calmer way for schools and families to stay connected."**

## ✨ Key Features

Bhavishya provides a role-based architectural approach, ensuring every stakeholder gets a personalized, relevant, and secure experience:

- **👨‍👩‍👧 Parent Portal:** A narrative-driven dashboard providing real-time insights into a child's academic journey, attendance, fee status, cafeteria usage, and safe bus transit tracking.
- **🎓 Student Portal:** A digital ecosystem for students to view timetables, access their digital ID cards, submit assignments, and engage with their educational community.
- **👩‍🏫 Teacher Dashboard:** Tools to manage classes, mark attendance, log lessons, and securely communicate with parents and students.
- **👔 Principal/Admin Dashboard:** A high-level operational command center to oversee school metrics, manage users, and broadcast urgent announcements.
- **🛡️ Superadmin Control:** System-wide controls for onboarding schools, auditing logs, and managing platform-level settings.

## 🛠️ Tech Stack

Bhavishya is built with a cutting-edge, highly performant stack:

- **Frontend & Backend Framework:** [Next.js (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (Hosted on Render)
- **Styling:** Custom Token-based CSS (`--bh-colors`) for a strictly controlled, premium institutional design language without utility-class bloat.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Mapping:** React-Leaflet for live bus tracking

## 🚀 Live Demo & Credentials

The platform is deployed and live. You can log in using any of the following pre-seeded demo accounts to explore the different role-based portals.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Parent** | `parent1.school01@bhavishya.demo` | `password123` |
| **Student** | `student1.school01@bhavishya.demo` | `password123` |
| **Teacher** | `teacher1.school01@bhavishya.demo` | `password123` |
| **Principal** | `principal.school01@bhavishya.demo` | `password123` |
| **Superadmin** | `superadmin@bhavishya.demo` | `password123` |

---

## 💻 Local Development Setup

To run Bhavishya locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/bugHunterYash/bhavishya.git
cd bhavishya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://your_db_user:password@host/database_name?sslmode=require"
```

### 4. Initialize Database
Push the Prisma schema to your database and seed it with demo data:
```bash
npx prisma db push
npx prisma generate
npx prisma db seed
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## ☁️ Deployment Architecture

Bhavishya is architected for seamless deployment using a serverless infrastructure:

1. **Frontend & API Routes:** Deployed on **Vercel**. Next.js API routes and Server Components are automatically converted into Serverless Functions.
2. **Database:** Hosted on **Render** (PostgreSQL). 

### Vercel Deployment Steps:
1. Import this repository into Vercel.
2. Under **Environment Variables**, add the `DATABASE_URL` pointing to your production PostgreSQL database.
3. The build command will automatically run `prisma generate` (via the `postinstall` script in `package.json`) and then `next build`.
4. Deploy!

---
*Designed and built with ❤️ by Yash.*
