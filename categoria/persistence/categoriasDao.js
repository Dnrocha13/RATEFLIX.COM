const MySQLDatabase = require('./MySQLDatabase');
const Categorias = require('../model/categorias')

class CategoriasDAO extends MySQLDatabase {
    constructor(config){
        super(config);
    }

    Insert(categorias, callback) {
        const sql = ` INSERT INTO categorias (id, categoria) VALUES (null, '${categorias.categoria}') `;
        this.query(sql, callback);
    }

    getAll(callback) {
        const sql = 'SELECT id, categoria nome FROM categorias'
        this.query(sql, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let categoriasResult = []
                const categorias = result.map((row) => categoriasResult.push(row));
                callback(null,categoriasResult)
            }
        })
    }
};

module.exports = CategoriasDAO;