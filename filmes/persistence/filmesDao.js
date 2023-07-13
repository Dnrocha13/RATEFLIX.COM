const MySQLDatabase = require('./MySQLDatabase');


class FilmesDAO extends MySQLDatabase {
    constructor(config){
        super(config);
    }

    Insert(filmes, callback) {
        const sql = `
        INSERT INTO filmes (idFilmes, id_categoria, filme, sinopse) VALUES (null, '${filmes.id_categoria}','${filmes.filme}', '${filmes.sinopse}' )`;
        this.query(sql, callback)
    }
  
    getAll(callback) {
        const sql = 'SELECT idFilmes, id_categoria, filme, sinopse FROM filmes'
        this.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let filmesResult = []
                const filmes= result.map((row) => filmesResult.push(row));
                callback(null, filmesResult)
                
            }
        })
    }
};

module.exports = FilmesDAO;