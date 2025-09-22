import express from "express";
import {getAllCamisetas} from "../controllers/camisetasController.js";

const router = express.Router();

router.get("/", getAllCamisetas);

export default router;