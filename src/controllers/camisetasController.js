import dados from "../models/dados.js";
const {camisetas} = dados;

const getAllCamisetas = (req, res) => {
    res.status(200).json({
        total: camisetas.length,
        data: camisetas
    });
}

const getCamisetaById = (req, res) => {
    const id = parseInt(req.params.id);
    const camiseta = camisetas.find(c => c.id === id);

    if (camiseta) {
        res.status(200).json({
            success: true,
            data: camiseta
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Camiseta Geek com o id ${id} não encontrada`
        });
    }
}

export {getAllCamisetas, getCamisetaById}