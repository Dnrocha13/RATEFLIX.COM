const CategoriasDAO = require('../persistence/categoriasDao');
const Categorias = require('../model/categorias')


class CategoriasService {
    constructor(config){
        this.CategoriasDAO = new CategoriasDAO(config)
    }
    criarCategorias(categorias, callback) {
        const novaCategoria = new Categorias(categorias.categoria);
        this.CategoriasDAO.Insert(novaCategoria, callback)
    }

    buscarTodasAsCategorias(callback) {
        this.CategoriasDAO.getAll(callback)
      }

}

module.exports = CategoriasService;