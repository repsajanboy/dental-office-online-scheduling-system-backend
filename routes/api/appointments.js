import express from "express";
import verifyToken from "../../utils/verifyToken.js";
import { getAllAppointments, addAppointment } from "../../database.js";

const router = express.Router();

router.get("/:user_id", verifyToken, async (req, res) => {
  const userId = req.params.user_id;
  try {
    const appointementsRaw = await getAllAppointments(userId);

    const appointements = appointementsRaw.map((appointment) => ({
      ...appointment,
      appointment_date: appointment.appointment_date
        .toISOString()
        .split("T")[0], // Format to YYYY-MM-DD
    }));
    res.send(appointements);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { dentist_id, appointment_date, appointment_time, status } = req.body;
  const user_id = req.user.id;

  if (!dentist_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const appointment = await addAppointment(
      user_id,
      dentist_id,
      appointment_date,
      appointment_time,
      status
    );
    res.send(appointment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
