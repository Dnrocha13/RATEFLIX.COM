const Dao = require('./dao');


class UsuarioDAO extends Dao {
    constructor(connection){
        super(connection);
    }

    insertUsuarioRateflix(usuarioRateflix, callback) {
     const sql = `INSERT INTO usuarioRateflix (id, nome, email, senha) VALUES (null, '${usuarioRateflix.nome}', '${usuarioRateflix.email}', '${usuarioRateflix.hashPassowrd}' )`;
     this.query(sql, callback);
    }

    getAll(callback) {
        const sql = 'SELECT id, nome, email, senha FROM usuarioRateflix'
        this.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let usuarioRateflixResult = []
                const usuarioRateflix = result.map((row) => usuarioRateflixResult.push(row));
                callback(null, usuarioRateflixResult)
                
            }
        })
    }
};

module.exports = UsuarioDAO;
