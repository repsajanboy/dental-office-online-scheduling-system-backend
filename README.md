# 🦷 Dental Clinic API

This is a Node.js + Express + MySQL RESTful API for managing a dental clinic. It supports user registration, login, dentist listing, and appointment booking with JWT-based authentication.

---

## 🚀 Features

- ✅ User registration and login
- 🔐 JWT authentication
- 🦷 Dentist management
- 📅 Appointment booking with status
- 📂 Clean modular structure
- 🗃️ MySQL relational database

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/dental-clinic-api.git
cd dental-clinic-api

### 2. Install Dependencies
npm install

### 3. Set UP Environment Variables

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=dental_clinic
JWT_SECRET=your_jwt_secret

### 4. Set Up MySQL Database

CREATE DATABASE dental_clinic;

USE dental_clinic;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255)
);

-- Dentists table
CREATE TABLE dentists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  specialization VARCHAR(255),
  email VARCHAR(255)
);

-- Appointments table
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  dentist_id INT,
  appointment_date DATE,
  appointment_time TIME,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (dentist_id) REFERENCES dentists(id)
);

### 5. Start the server
npm run dev
