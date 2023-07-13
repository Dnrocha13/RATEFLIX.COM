const MySQLDatabase = require('./MySQLDatabase');


class AvaliaFilmes extends MySQLDatabase {
    constructor(config){
        super(config);
    }

    Insert(avaliaFilmes, callback) {
        const sql = `
        INSERT INTO avaliaFilmes (idAvaliaFilmes, id_filmes, avaliacao, nome_usuario) VALUES (null, '${avaliaFilmes.id_filmes}','${avaliaFilmes.avaliacao}','${avaliaFilmes.nome_usuario}')`;
        this.query(sql, callback)
    }

    getAll(callback) {
        const sql = 'SELECT idAvaliaFilmes, id_filmes, avaliacao, nome_usuario FROM avaliaFilmes'
        this.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let avaliaFilmesResult = []
                const avaliaFilmes= result.map((row) => avaliaFilmesResult.push(row));
                callback(null, avaliaFilmesResult)
                
            }
        })
    }
};

module.exports = AvaliaFilmes;