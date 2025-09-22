import express from "express";
import {getAllCamisetas, getCamisetaById} from "../controllers/camisetasController.js";

const router = express.Router();

router.get("/", getAllCamisetas);
router.get("/:id", getCamisetaById);

export default router;