# Visitor Pass Management System
## Overview

The Visitor Pass Management System is a full-stack MERN application designed to digitize and streamline visitor management for organizations. The system replaces traditional paper-based visitor registers with a secure digital solution that supports visitor registration, appointment scheduling, QR-based pass issuance, and visitor check-in/check-out tracking.

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Secure password hashing using bcrypt

### User Roles

* Admin

  * Manage users and system data
  * Access reports and analytics

* Security / Frontdesk

  * Register visitors
  * Issue visitor passes
  * Verify and scan QR codes
  * Manage check-ins and check-outs

* Employee / Host

  * Create visitor appointments
  * Approve visitor requests
  * View scheduled visitors

* Visitor

  * Pre-register for visits
  * View appointment status
  * Access digital visitor pass

### Visitor Management

* Visitor registration
* Visitor photo upload
* Visitor search and filtering

### Appointment Management

* Appointment creation
* Approval and rejection workflow
* Appointment tracking

### Pass Management

* QR-code based visitor passes
* Digital visitor badge generation
* Pass validation

### Check-In / Check-Out

* QR code scanning
* Entry and exit logging
* Visit history tracking

### Dashboard & Reports

* Visitor statistics
* Appointment statistics
* Search and filter functionality
* Export reports

---

## Tech Stack

### Frontend
* React
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* QR Code Generator
* PDF Generation

### Database

* MongoDB
* Mongoose

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd visitor-pass-management-system
```

Create a .env file inside the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Backend Setup
```bash
cd backend
npm install
```

### Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login

### Visitors
POST /api/visitors
GET /api/visitors
GET /api/visitors/:id
PUT /api/visitors/:id
DELETE /api/visitors/:id

### Appointments
POST /api/appointments
GET /api/appointments
GET /api/appointments/:id
PUT /api/appointments/:id
DELETE /api/appointments/:id

### Passes
POST /api/passes
GET /api/passes
GET /api/passes/:id
PUT /api/appointments/:id

### Check Logs
POST /api/checklogs/checkin
POST /api/checklogs/checkout
---

## Future Enhancements
* Email notifications
* SMS notifications
* OTP verification
* Multi-organization support
* Docker deployment
---

## Author
Developed as a MERN Stack Final Project.
