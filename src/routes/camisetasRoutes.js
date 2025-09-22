import express from "express";
import {getAllCamisetas, getCamisetaById,getCamisetaPorTema, getCamisetaPorTamanho, getCamisetaPorCategoria, getCamisetaEmEstoque, createCamiseta, updateCamiseta, deleteCamiseta} from "../controllers/camisetasController.js";

const router = express.Router();

router.get("/", getAllCamisetas);
router.get("/id/:id", getCamisetaById);
router.get("/tema/:tema", getCamisetaPorTema);
router.get("/tamanho/:tamanho", getCamisetaPorTamanho);
router.get("/categoria/:categoria", getCamisetaPorCategoria);
router.get("/em-estoque", getCamisetaEmEstoque);
router.post("/", createCamiseta);
router.put("/atualizar/:id", updateCamiseta)
router.delete("/id/:id", deleteCamiseta);

export default router;