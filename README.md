# Notes App

Simple full-stack note-taking app.

**Backend:** Node.js, Express (ES Modules), MongoDB + Mongoose, JWT, bcryptjs
**Frontend:** React (Vite), Tailwind CSS, React Router, Axios

## Folder structure

```
notes-app/
├── backend/
│   ├── config/         db.js
│   ├── controllers/    authController.js, noteController.js
│   ├── middleware/     authMiddleware.js, errorMiddleware.js
│   ├── models/         User.js, Note.js
│   ├── routes/         authRoutes.js, noteRoutes.js
│   ├── app.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/ Navbar.jsx, NoteCard.jsx
        ├── pages/      Login.jsx, Signup.jsx, Dashboard.jsx
        ├── api.js      axios setup
        ├── App.jsx     routes
        └── main.jsx
```

## How to run

MongoDB chalna chahiye (local ya Atlas).

```bash
# backend
cd backend
npm install
# .env mein MONGO_URI aur JWT_SECRET check kar lo
npm run dev          # http://localhost:5000

# frontend (naye terminal mein)
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## API

| Method | URL               | Login? | Kaam                |
|--------|-------------------|--------|---------------------|
| POST   | /api/auth/signup  | No     | Naya account        |
| POST   | /api/auth/login   | No     | Login, token milta  |
| GET    | /api/notes        | Yes    | Apne saare notes    |
| POST   | /api/notes        | Yes    | Note create         |
| GET    | /api/notes/:id    | Yes    | Ek note             |
| PUT    | /api/notes/:id    | Yes    | Note edit           |
| DELETE | /api/notes/:id    | Yes    | Note delete         |

Token header mein bhejna hai: `Authorization: Bearer <token>`

## Requirements kaise pure hue

- Signup/Login: password bcrypt se hash hota hai, login pe JWT token milta hai
- Notes sirf logged in user ko: `protect` middleware saare note routes pe laga hai
- Har note user se linked: `Note` model mein `user` field hai
- Dusre ke notes access nahi: har query mein `user: req.user._id` filter hai, toh dusre ka note 404 aata hai
- Validation + error handling: controllers mein checks hain aur sahi status codes ke saath JSON message aata hai
- UI: Tailwind CSS, mobile/tablet/desktop pe responsive
