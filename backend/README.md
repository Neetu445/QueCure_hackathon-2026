# Queue Cure  
### Smart Real-Time Clinic Queue Management System

**Queue Cure** is a high-performance, full-stack MERN application designed to eliminate clinic waiting room chaos. 
It provides a unified, real-time dashboard for clinic staff and patients.

---

##  Key Features
- **Unified Dashboard:** A single interface for adding patients, managing the queue, and viewing live statistics.
- **Real-Time Updates:** Powered by **Socket.io**. Every action updates all connected screens instantly.
- **Priority Management:** Flag patients as **Normal** or **Urgent** with visual color-coded badges.
- **Live Statistics:** Instant feedback via Stat Cards tracking Waiting, Avg Wait, Serving, and Completed patients.

---

##  Tech Stack
- **Frontend:** React.js, Vite, Lucide-React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Real-Time:** Socket.io (WebSockets)

---

##  Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Add `MONGO_URI` to a `.env` file.
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

##  Socket.io Architecture
The system uses a broadcast event listener:
1. **Trigger:** Staff performs an action (Add/Call/Complete).
2. **Event:** Server emits `queueUpdated`.
3. **Action:** All frontends catch the event and refresh their data state automatically.
