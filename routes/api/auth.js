import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, getUserViaEmail } from "../../database.js";
import verifyToken from "../../utils/verifyToken.js";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  //check if fields are not empty
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fileds" });
  }

  //check if email is already use
  const user = await getUserViaEmail(email);
  console.log(user);
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const registeredUser = await register(name, email, hashedPassword, phone);
    const userId = {
      id: registeredUser.id,
    };
    jwt.sign(userId, process.env.TOKEN_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }

  //Check if user is in the database
  const user = await getUserViaEmail(email);
  console.log(user);
  if (user.length == 0) {
    return res
      .status(400)
      .json({ success: false, msg: "Email or password are incorrect." });
  }

  //Check password is valid
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Email or password are incorrect." });
  }

  try {
    const userId = {
      id: user.id,
    };

    jwt.sign(userId, process.env.TOKEN_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//Logout
router.get("/logout", verifyToken, async (req, res) => {
  try {
    res.json({ message: "Logout successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
