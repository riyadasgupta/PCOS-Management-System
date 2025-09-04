# PCOS Management System

A full-stack web application to help manage Polycystic Ovary Syndrome (PCOS) patient data, appointments, and personalized recommendations with machine learning support.

---

## Project Structure

- **client/pcos** — React frontend application
- **server** — Node.js/Express backend API and database handlers
- **ml-model** — Machine learning models for PCOS prediction and analysis

---

## Features

- Patient registration and profile management
- Symptom tracking, diet, workouts, and medication logging
- Doctor appointment scheduling by specialization
- User authentication and protected routes
- ML-powered risk prediction for PCOS
- Note on Machine Learning Module
  
  The machine learning components for PCOS risk prediction are currently under development and will be integrated soon. Stay tuned for updates and enhancements.
- Responsive UI using Material-UI components

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud)
- Python (for ML model, if used locally)
- Git

### Installation

1. Clone the repository:
git clone <your-repo-url>
cd pcos-managemnt-system


2. Backend setup:
cd server
npm install
add environment variables in .env
npm start


3. Frontend setup:
cd client
npm install
npm start


Frontend runs on http://localhost:3000 and backend on http://localhost:5000 by default.

---

## Environment Variables

Create `.env` files in both backend and frontend:

**Backend `.env`:**
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>


**Frontend `.env`:**
REACT_APP_API_URL=http://localhost:5000/api


---

## Usage

- Register patients and doctors
- Track symptoms, workout and diet preferences
- Schedule appointments
- View ML predictions and reports
  









