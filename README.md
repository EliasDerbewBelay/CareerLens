# 🚀 CareerLens

**CareerLens** is a full-stack web application that helps users analyze how well their resume matches a specific job description using **AI-powered semantic embeddings** and **skill gap analysis**.

It allows users to upload resumes (PDF), compare them with job descriptions, receive match scores, identify missing skills, and track analysis history — all inside a secure, authenticated dashboard.

---

## ✨ Features

### 🔐 Authentication

- User registration & login (JWT-based)
- Secure access & refresh tokens
- Protected routes using Next.js middleware

### 📄 Resume Handling

- Upload resumes in **PDF format**
- Automatic text extraction from resumes

### 🤖 AI Job Matching

- Semantic similarity matching using embeddings
- Match percentage score
- Skill gap analysis (matched vs missing skills)
- Human-readable feedback summary

### 📊 Analysis History

- Save job analysis results
- View past analyses
- Access detailed analysis per job

### 🎨 Frontend Experience

- Built with **Next.js (App Router)**
- Modern UI using **shadcn/ui**
- Dark mode support
- Dynamic header based on auth state

---

## 🏗️ Tech Stack

### Backend

- **Django**
- **Django REST Framework**
- **Simple JWT**
- **PyPDF2** (PDF text extraction)
- **Sentence Transformers / Embeddings**
- SQLite (dev)

### Frontend

- **Next.js 14**
- **TypeScript**
- **Axios**
- **Tailwind CSS**
- **shadcn/ui**
- **Next.js Middleware**

---

## 📂 Project Structure

```
CareerLens/
│
├── backend/
│   ├── core/
│   ├── analyzer/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── embeddings.py
│   │   └── utils.py
│   └── manage.py
│
├── frontend/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   │   └── api.ts
│   └── middleware.ts
│
└── README.md
```

---

## ⚙️ Backend Setup (Django)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/careerlens.git
cd careerlens/backend
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run migrations

```bash
python manage.py migrate
```

### 5️⃣ Start the server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## ⚙️ Frontend Setup (Next.js)

### 1️⃣ Navigate to frontend

```bash
cd careerlens/frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start development server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔐 API Endpoints (Core)

### Authentication

- `POST /api/register/`
- `POST /api/token/`
- `POST /api/token/refresh/`

### Resume

- `POST /api/resume/upload/`

### Job Analysis

- `POST /api/job/match/`
- `GET /api/job/history/`
- `GET /api/job/history/<analysis_id>/`

---

## 🧠 How Matching Works

1. Resume PDF text is extracted
2. Job description is provided by user
3. Both texts are converted into embeddings
4. Semantic similarity score is calculated
5. Skills are compared against a predefined skills list
6. Results are saved and returned with feedback

---

## 🔒 Route Protection

- Protected pages (e.g. `/dashboard`)
- Enforced using **Next.js middleware**
- Redirects unauthenticated users to `/auth/login`

---

## 📈 Future Improvements

- Radar & bar charts for skill gaps
- Resume improvement suggestions
- Job scraping integration
- Email notifications
- Role-based access

---

## 👨‍💻 Author

**Elias Belay**
Full-Stack Developer
Project: _CareerLens_

---

## 📜 License

This project is for educational and portfolio purposes.

---
