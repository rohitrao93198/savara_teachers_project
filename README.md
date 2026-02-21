# 📊 Teacher Activity Dashboard

A full-stack analytics dashboard built with **React + Node.js + MongoDB** to track and visualize teacher activities such as lesson plans, quizzes, and question papers.

---

## 🚀 Tech Stack

**Frontend**

- React.js
- Tailwind CSS
- Recharts

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 🏗️ Project Architecture

```
client/
  ├── components/
  ├── pages/
  ├── services/
  └── App.jsx

server/
  ├── controllers/
  ├── models/
  ├── routes/
  └── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repository

```bash
git clone <repo-url>
cd project
```

---

### 2️⃣ Backend setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Frontend setup

```bash
cd client
npm install
npm run dev
```

App runs at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📡 API Endpoints

### Insights

| Method | Endpoint                 | Description     |
| ------ | ------------------------ | --------------- |
| GET    | `/api/insights/overview` | Overall stats   |
| GET    | `/api/insights/weekly`   | Weekly activity |

---

### Teachers

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/api/teachers`            | Teachers list         |
| GET    | `/api/teachers/:teacherId` | Per teacher analytics |

---

## 🧠 Architecture Decisions

### 1️⃣ Modular Backend Structure

**Decision:** MVC-like separation (routes → controllers → models)

**Why:**

- Improves maintainability
- Easy to scale features
- Clean responsibility separation

---

### 2️⃣ MongoDB Aggregation for Analytics

**Decision:** Heavy use of aggregation pipelines.

**Why:**

- Performs calculations at database level
- Reduces frontend processing
- Faster for analytics queries
- Scales better with large datasets

---

### 3️⃣ Recharts for Visualization

**Decision:** Used Recharts instead of Chart.js.

**Why:**

- React-native
- Highly composable
- Easy responsive charts
- Lightweight for dashboards

---

### 4️⃣ Tailwind CSS for Styling

**Decision:** Utility-first styling.

**Why:**

- Rapid UI development
- Consistent design system
- No separate CSS maintenance
- Production-ready responsiveness

---

### 5️⃣ Frontend Data Aggregation (Selective)

**Decision:** Subject/grade summaries derived on frontend from recent activities.

**Why:**

- Avoid extra API calls
- Faster assignment delivery
- Keeps backend simple

_(In production, this should move to backend aggregation.)_

---

## 📈 Current Features

✅ Dashboard overview
✅ Weekly activity trends
✅ Per-teacher analytics
✅ Activity breakdown charts
✅ Subject distribution
✅ Grade distribution
✅ Recent activity feed
✅ Responsive UI

---

## 🔮 Future Scalability Improvements

### 🚀 Backend Improvements

**1. Database Index Optimization**

Add compound indexes:

```js
{ teacher_id: 1, created_at: -1 }
{ activity_type: 1, created_at: -1 }
```

**Benefit:** Faster analytics on large datasets.

---

**2. Move Subject/Grade Aggregation to Backend**

Currently computed on frontend.

**Future:**

- Dedicated aggregation pipelines
- Cached analytics responses
- Reduced payload size

---

**3. Add Redis Caching**

Cache heavy endpoints:

- `/insights/overview`
- `/insights/weekly`
- `/teachers/:id`

**Benefit:**
⚡ Faster response
📉 Lower DB load

---

**4. Pagination for Activities**

If data grows large:

- Add cursor-based pagination
- Infinite scroll in UI

---

**5. Background Jobs**

Use queue (BullMQ / RabbitMQ) for:

- Precomputing analytics
- Nightly aggregations
- Report generation

---

### 🎨 Frontend Improvements

**1. Skeleton Loaders**

Replace text loaders with shimmer UI.

---

**2. Chart Lazy Loading**

Load charts only when visible to improve performance.

---

**3. State Management**

If app grows:

- Zustand / Redux Toolkit
- React Query for caching

---

**4. Role-Based Access**

Future roles:

- Admin
- School Head
- Teacher

---

### ☁️ Production Readiness

- Docker containerization
- Nginx reverse proxy
- Environment-based configs
- CI/CD pipeline
- Error monitoring (Sentry)
- Logging (Winston)

---

## 🧪 Assumptions Made

- Teacher IDs are unique strings
- Activity types are limited to 3 enums
- Weekly analytics uses server timezone
- Recent activity limited to latest 5 records

---

## 👨‍💻 Author

Rohit - Full-stack developer
Built as part of a technical assignment demonstrating:

- Full-stack development
- Data aggregation
- Analytics dashboards
- Clean architecture

---

**Ready for review ✅**
