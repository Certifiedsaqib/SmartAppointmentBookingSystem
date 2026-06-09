# Smart Appointment Booking System

A university-level full stack booking application for managing appointments with doctors, consultants, tutors, and more. The app includes responsive React frontend, Express.js backend, MongoDB persistence, JWT authentication, appointment management, provider management, search and filters, and dashboard statistics.

## Features

- Responsive landing page with navigation and hero section
- Appointment CRUD: list, add, update, delete, view details
- Provider CRUD: list, add, update, delete, view details
- Search appointments by customer name
- Filter appointments by provider and date
- Dashboard statistics for total appointments, providers, and upcoming appointments
- Form validation for required fields, email, phone, and appointment date
- JWT login/register and protected routes
- API error handling and meaningful responses

## Technologies Used

- Frontend: React.js, React Router DOM, Axios, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Tools: Nodemon, dotenv, Postman

## Project Structure

```
backend/
  controllers/
  models/
  routes/
  middleware/
  services/
  config/
  utils/
  app.js
  server.js
  seeder.js
frontend/
  public/
  src/
    assets/
    components/
    context/
    layouts/
    pages/
    routes/
    services/
    App.js
    index.js
.gitignore
.env.example
postman_collection.json
presentation_script.md
```

## Installation Steps

### Backend Setup

1. Open terminal and navigate to `backend` folder.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Add your MongoDB connection string and JWT secret.
5. Run `npm run seed` to add sample providers and appointments.
6. Start server with `npm run dev`.

### Frontend Setup

1. Open a separate terminal and navigate to `frontend` folder.
2. Run `npm install`.
3. Create a `.env` file if needed and set `REACT_APP_API_URL=http://localhost:5000/api`.
4. Start the React app with `npm start`.

## MongoDB Setup

- Use MongoDB Atlas or local MongoDB.
- Set `MONGO_URI` to your MongoDB connection string.
- Example: `mongodb://localhost:27017/smart-appointments`

## Environment Variables

Use `.env.example` as a template:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Providers
- `GET /api/providers`
- `GET /api/providers/:id`
- `POST /api/providers`
- `PUT /api/providers/:id`
- `PATCH /api/providers/:id`
- `DELETE /api/providers/:id`

### Appointments
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `PATCH /api/appointments/:id`
- `DELETE /api/appointments/:id`

## Screenshots

Include screenshots after running the app:
- Landing page
- Dashboard
- Appointment list
- Provider list
- Add appointment form

## Postman Collection

See `postman_collection.json` for the full API collection.
