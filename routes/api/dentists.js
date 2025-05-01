import express from "express";
import { getDentists } from "../../database.js";
import verifyToken from "../../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const dentists = await getDentists();
        res.send(dentists);
    } catch (error) {
        res.json({message: error});
    }
});

export default router;