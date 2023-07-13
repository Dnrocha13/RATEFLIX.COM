const AvaliaFilmesDAO = require('../persistence/avaliaFilmesDao');
const AvaliaFilmes = require('../model/avaliaFilmes')


class AvaliaFilmesService {
    constructor(config){
        this.AvaliaFilmesDAO = new AvaliaFilmesDAO(config)
       
    }
    criarAvaliacao(avaliaFilmes, callback) {
       const novaAvaliacao = new AvaliaFilmes(avaliaFilmes.id_filmes, avaliaFilmes.avaliacao, avaliaFilmes.nome_usuario);
       this.AvaliaFilmesDAO.Insert(novaAvaliacao, callback)
    }

    buscarTodasAsAvaliacoes(callback) {
        this.AvaliaFilmesDAO.getAll(callback)
    }
}

module.exports = AvaliaFilmesService;