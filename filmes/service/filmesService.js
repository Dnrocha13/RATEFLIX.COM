const FilmesDAO = require('../persistence/filmesDao');
const Filmes = require('../model/filmes')


class FilmesService {
    constructor(config){
        this.FilmesDAO = new FilmesDAO(config)
       
    }
    criarFilmes(filmes, callback) {
       const novoFilme = new Filmes(filmes.id_categoria, filmes.filme, filmes.sinopse);
       this.FilmesDAO.Insert(novoFilme, callback)
    }

    buscarTodosOsFilmes(callback) {
        this.FilmesDAO.getAll(callback)
    }
   
}

module.exports = FilmesService;