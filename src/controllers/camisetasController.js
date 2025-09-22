import dados from "../models/dados.js";
const {camisetas} = dados;

const getAllCamisetas = (req, res) => {
    res.status(200).json({
        total: camisetas.length,
        data: camisetas
    });
}

export {getAllCamisetas}