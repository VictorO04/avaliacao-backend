import dados from "../models/dados.js";
const {camisetas} = dados;

//Get all
const getAllCamisetas = (req, res) => {
    res.status(200).json({
        total: camisetas.length,
        data: camisetas
    });
}

//Get by id
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

//Filtros
const getCamisetaPorTema = (req, res) => {
    const tema = req.params.tema.toLowerCase();
    const temaEncontrado = camisetas.filter(c => c.tema.toLowerCase().includes(tema));

    if (temaEncontrado.length > 0) {
        res.status(200).json({
            success: true,
            total: temaEncontrado.length,
            data: temaEncontrado
        });
    } else {
        res.status(404).json({
            success: false,
            total: temaEncontrado.length,
            message: `Nenhuma camiseta com o tema ${tema} encontrada`
        });
    }
}

const getCamisetaPorTamanho = (req, res) => {
    const tamanho = req.params.tamanho.toLowerCase();
    const tamanhoEncontrado = camisetas.filter(c => c.tamanho.toLowerCase().includes(tamanho));

    if (tamanhoEncontrado.length > 0) {
        res.status(200).json({
            success: true,
            total: tamanhoEncontrado.length,
            data: tamanhoEncontrado
        });
    } else {
        res.status(404).json({
            success:false,
            total: tamanhoEncontrado.length,
            message: `camiseta com o tamanho ${tamanho} não existe`
        });
    }
}

const getCamisetaPorCategoria = (req, res) => {
    const categoria = req.params.categoria.toLowerCase();
    const categoriaEncontrada = camisetas.filter(c => c.categoria.toLowerCase().includes(categoria));

    if (categoriaEncontrada.length > 0) {
        res.status(200).json({
            success: true,
            total: categoriaEncontrada.length,
            data: categoriaEncontrada
        });
    } else {
        res.status(404).json({
            success: false,
            total: categoriaEncontrada.length,
            message: `Nenhuma camiseta com a categoria ${categoria} encontrada`
        });
    }
}

const getCamisetaEmEstoque = (req, res) => {
    const camisetasEmEstoque = camisetas.filter(c => c.estoque > 0);

    if (camisetasEmEstoque.length > 0) {
        res.status(200).json({
            success: true,
            total: camisetasEmEstoque.length,
            data: camisetasEmEstoque
        });
    } else {
        res.status(404).json({
            success: false,
            total: camisetasEmEstoque.length,
            message: "Nenhuma camiseta em estoque no momento"
        });
    }
}

export {getAllCamisetas, getCamisetaById, getCamisetaPorTema, getCamisetaPorTamanho, getCamisetaPorCategoria, getCamisetaEmEstoque}