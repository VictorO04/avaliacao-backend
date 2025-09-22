import express from "express";
import {getAllCamisetas, getCamisetaById,getCamisetaPorTema, getCamisetaPorTamanho, getCamisetaPorCategoria, getCamisetaEmEstoque} from "../controllers/camisetasController.js";

const router = express.Router();

router.get("/", getAllCamisetas);
router.get("/id/:id", getCamisetaById);
router.get("/tema/:tema", getCamisetaPorTema);
router.get("/tamanho/:tamanho", getCamisetaPorTamanho);
router.get("/categoria/:categoria", getCamisetaPorCategoria);
router.get("/em-estoque", getCamisetaEmEstoque);

export default router;