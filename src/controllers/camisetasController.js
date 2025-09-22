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

//Creat

const createCamiseta = (req, res) => {
    const {design, tema, tamanho, marca, preco, material, categoria, estoque} = req.body;
    const tamanhos = ["P", "M", "G", "GG", "XG"];

    if (!design) {
        return res.status(400).json({
            success: false,
            message: "Design é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!tema) {
        return res.status(400).json({
            success: false,
            message: "Tema é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!tamanho) {
        return res.status(400).json({
            success: false,
            message: "Tamanho é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!marca) {
        return res.status(400).json({
            success: false,
            message: "Marca é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!preco) {
        return res.status(400).json({
            success: false,
            message: "Preco é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!material) {
        return res.status(400).json({
            success: false,
            message: "Material é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!categoria) {
        return res.status(400).json({
            success: false,
            message: "Categoria é obrigatório para adicionar uma nova camiseta"
        });
    }
    if (!estoque) {
        return res.status(400).json({
            success: false,
            message: "Estoque é obrigatório para adicionar uma nova camiseta"
        });
    }

    //Regras de negócio

    if (!tamanhos.includes(tamanho)) {
        return res.status(400).json({
            success: false,
            message: `O tamanho "${tamanho} não está incluso. Tamanhos: ${tamanhos.join(", ")}`
        });
    }

    if (estoque < 0) {
        return res.status(400).json({
            success: false,
            message: `O valor do estoque não pode ser um valor negativo`
        });
    }

    const novaCamiseta = {
        id: camisetas.length + 1,
        design,
        tema,
        tamanho,
        marca,
        preco,
        material,
        categoria,
        estoque
    }

    camisetas.push(novaCamiseta);

    res.status(201).json({
        success: true,
        message: "Nova camiseta adicionada com sucesso",
        data: novaCamiseta
    });
}

const updateCamiseta = (req, res) => {
    const id = parseInt(req.params.id);
    const {design, tema, tamanho, marca, preco, material, categoria, estoque} = req.body;
    const tamanhos = ["P", "M", "G", "GG", "XG"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const camisetaExiste = camisetas.find(c => c.id === id);

    if (!camisetaExiste) {
        return res.status(404).json({
            success: false,
            message: "Esta camiseta não existe"
        });
    }

    if (!tamanhos.includes(tamanho)) {
        return res.status(400).json({
            success: false,
            message: `O tamanho "${tamanho} não está incluso. Tamanhos: ${tamanhos.join(", ")}`
        });
    }

    if (estoque < 0) {
        return res.status(400).json({
            success: false,
            message: `O valor do estoque não pode ser um valor negativo`
        });
    }

    const camisetaAtualizada = camisetas.map(camisetaExiste => camisetaExiste.id === id
        ? {
            ...camisetaExiste,
            ...(design && {design}),
            ...(tema && {tema}),
            ...(tamanho && {tamanho}),
            ...(marca && {marca}),
            ...(preco && {preco}),
            ...(material && {material}),
            ...(categoria && {categoria}),
            ...(estoque && {estoque})
        }
        : camisetaExiste
    );

    camisetas.splice(0, camisetas.length, ...camisetaAtualizada);

    const camisetaAtualiz = camisetas.find(c => c.id === id);

    res.status(200).json({
        success: true,
        message: "Camiseta atualizada com sucesso",
        data: camisetaAtualiz
    });
}

const deleteCamiseta = (req, res) => {
    const {id} = req.params;

    if (isNaN(id)) {
        return res.status(200).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const camisetaParaApagar = camisetas.find(c => c.id === idParaApagar);

    if (!camisetaParaApagar) {
        return res.status(404).json({
            success: false,
            message: "Camiseta com este id não existe"
        });
    }

    const camisetaFiltrada = camisetas.filter(c => c.id !== idParaApagar);

    camisetas.splice(0, camisetas.length, ...camisetaFiltrada);

    return res.status(200).json({
        success: true,
        message: "A camiseta foi removida com sucesso"
    });
}

export {getAllCamisetas, getCamisetaById, getCamisetaPorTema, getCamisetaPorTamanho, getCamisetaPorCategoria, getCamisetaEmEstoque, createCamiseta, updateCamiseta, deleteCamiseta}