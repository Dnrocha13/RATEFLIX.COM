const UsuarioDAO = require('../persistence/usuariodao')

class UsuarioService {
    constructor(connection){
        this.connection = connection
    }

    insertUsuarioRateflix(usuarioRateflix) {
        const usuarioDaoInstance = new UsuarioDAO(this.connection);
        return usuarioDaoInstance.insertUsuarioRateflix(usuarioRateflix);
    }

    selectAll() {
        const usuarioDaoInstance = new UsuarioDAO(this.connection);
        return usuarioDaoInstance.selectAll();
    }
}

module.exports = UsuarioService;