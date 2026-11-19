README · MD
Notes App

A simple full-stack note-taking application. Users can sign up, log in, and create, view, edit and delete their own private notes. Every note is linked to the user who created it, and no user can access another user's notes.

Live Demo
Live App (Frontend): https://YOUR-FRONTEND-LINK.vercel.app
Backend API: https://YOUR-BACKEND-LINK.vercel.app
GitHub Repository: https://github.com/YOUR-USERNAME/YOUR-REPO-NAME
Tech Stack
Part Technologies
Frontend React (Vite), Tailwind CSS, React Router, Axios
Backend Node.js, Express (ES Modules), JWT, bcryptjs, CORS, dotenv
Database MongoDB Atlas with Mongoose
Deployment Vercel (frontend and backend), GitHub
Features
User sign up and login with JWT authentication
Passwords are hashed with bcrypt
Notes are accessible only to logged-in users
Each note is linked to its owner (user field in the Note model)
Create, view, edit and delete notes
A user cannot read, edit or delete another user's notes
API validation and proper error responses (400, 401, 404, 500)
Responsive UI built with Tailwind CSS (mobile, tablet, desktop)
Folder Structure
notes-app/
├── backend/
│ ├── config/ db.js
│ ├── controllers/ authController.js, noteController.js
│ ├── middleware/ authMiddleware.js, errorMiddleware.js
│ ├── models/ User.js, Note.js
│ ├── routes/ authRoutes.js, noteRoutes.js
│ ├── app.js
│ └── server.js
└── frontend/
└── src/
├── components/ Navbar.jsx, NoteCard.jsx, AuthModal.jsx
├── pages/ Home.jsx, Dashboard.jsx
├── api.js Axios setup
├── App.jsx Routes
└── main.jsx
Setup Instructions (Run Locally)
Prerequisites
Node.js 18 or higher
Git
A MongoDB Atlas account (free tier) or a local MongoDB

1. Clone the repository
   bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
2. Set up the backend
   bash
   cd backend
   npm install

Create a .env file inside the backend folder (you can copy .env.example):

PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/notes-app?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string

Start the backend:

bash
npm run dev

You should see MongoDB connected in the terminal. The API runs on http://localhost:5000.

3. Set up the frontend

Open a new terminal:

bash
cd frontend
npm install
npm run dev

The app runs on http://localhost:5173. In development, Vite proxies /api requests to the backend on port 5000, so no extra configuration is needed.

Environment Variables
Variable Where Description
PORT backend Server port (default 5000)
MONGO_URI backend MongoDB connection string
JWT_SECRET backend Secret key used to sign JWT tokens
VITE_API_URL frontend (production only) Backend URL ending with /api, e.g. https://your-backend.vercel.app/api
API Endpoints
Method Endpoint Auth required Description
POST /api/auth/signup No Create a new account
POST /api/auth/login No Log in and receive a JWT token
GET /api/notes Yes Get all notes of the logged-in user
POST /api/notes Yes Create a note
GET /api/notes/:id Yes Get one note
PUT /api/notes/:id Yes Update a note
DELETE /api/notes/:id Yes Delete a note

Protected routes need the header Authorization: Bearer <token>.

How Security and Ownership Work
The protect middleware verifies the JWT on every /api/notes route.
Every note query includes user: req.user.\_id, so a user can only work with their own notes. A note that belongs to someone else returns 404 Note not found.
Login errors use one generic message ("Invalid email or password") so that registered emails are not revealed.
Deployment
Database: MongoDB Atlas (Network Access allows 0.0.0.0/0)
Backend: Vercel project with Root Directory backend, environment variables MONGO_URI and JWT_SECRET
Frontend: Vercel project with Root Directory frontend, environment variable VITE_API_URL
