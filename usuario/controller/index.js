const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3002;

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'123456',
        database:'diego'
    }
);


connection.connect((err) => {
    if (err) throw err
    console.log('Conexão com MySQL estabelecida com sucesso');
});
 app.use(bodyParser.json());
 const bcrypt = require('bcrypt');

 app.post('/rateflix/cadastro', (req, res) => {
  const {nome, email, senha} = req.body;
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar o usuário');
        } else {
            const query = 'INSERT INTO usuarioRateflix (nome, email, senha) VALUES (?, ?, ?)';
            connection.query(query, [nome, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar o usuário');
        } else {
            res.status(200).send({"msg":"Usuário Cadastrado com sucesso, Clique em logar para começar"})
        }

            });

        }
    })
 });

 app.post('/rateflix/login',(req, res) => {
    const {email, senha} = req.body;
    const query = 'SELECT * FROM usuarioRateflix WHERE email = ?'

    connection.query(query, [email], async (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).send('Erro ao realizar login');
        } else if (results.length === 0) {
            res.status(401).send('Usuário não encontrado');
        } else {
            const usuarioRateflix = results[0];
            const senhaCorreta = await bcrypt.compare(senha, usuarioRateflix.senha);
            if (senhaCorreta) {
                const token = jwt.sign({id: usuarioRateflix.id, email: usuarioRateflix.email}, 'chave_secreta', {expiresIn: '1h'});
                res.status(200).json({token})
            } else {
                res.status(401).send('Senha incorreta')
            }
        }
    })
 })




 app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
 })