import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//User
export async function register(name, email, password, phone) {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
    [name, email, password, phone]
  );
  return {
    id: result.insertId,
  };
}

export async function getUserViaEmail(email) {
  const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (result.length === 0) {
    return null;
  }

  return result[0];
}
//Dentist
export async function getDentists() {
  const [rows] = await pool.query("SELECT * FROM dentists");
  return rows;
}

//Appointments
export async function addAppointment(
  user_id,
  dentist_id,
  appointment_date,
  appointment_time,
  status
) {
  const [result] = await pool.query(
    "INSERT INTO appointments (user_id, dentist_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, dentist_id, appointment_date, appointment_time, status]
  );
  return {
    id: result.insertId,
  };
}

export async function getAllAppointments(user_id) {
  const [result] = await pool.query(
    ` SELECT 
      a.id AS appointment_id,
      a.appointment_date,
      a.appointment_time,
      a.status,
      d.id AS dentist_id,
      d.name AS dentist_name,
      d.specialization,
      d.email
    FROM appointments a
    JOIN dentists d ON a.dentist_id = d.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date DESC`,
    [user_id]
  );
  return result;
}

export async function getAppointment(id) {
  const [result] = await pool.query("SELECT * FROM appointments where id = ?", [
    id,
  ]);
  return result[0];
}
