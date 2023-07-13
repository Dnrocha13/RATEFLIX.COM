const express = require('express');
const bodyParser = require('body-parser');
const Filmes = require('../model/filmes');
const FilmesService = require('../service/filmesService')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'diego'
};

const filmesService = new FilmesService(config);

app.post('/rateflix/filmes', (req, res) => {
    let FilmesInstance = new Filmes(req.body.id_categoria, req.body.filme, req.body.sinopse);
    console.log(req.body);
    filmesService.criarFilmes(FilmesInstance, (err, filmes) => {
        if (err) {
            return res.status(500).json({error:err})
        }
        res.status(201).json(filmes)
    });
});

app.get('/rateflix/filmes', (req, res) => {
    filmesService.buscarTodosOsFilmes((err, filmes) => {
        
        if(err) {
            return res.status(500).json({erro: err})
        }
        res.json(filmes);
    });
});



const PORT = 3001
app.listen(PORT, () => {
    console.log(`API iniciada na porta ${PORT}`);
});