const express = require('express');
const bodyParser = require('body-parser');
const AvaliaFilmes = require('../model/avaliaFilmes');
const AvaliaFilmesService = require('../service/avaliaFilmesService')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'diego'
};

const avaliaFilmesService = new AvaliaFilmesService(config);

app.post('/rateflix/avaliacao', (req, res) => {
    let AvaliaFilmesInstance = new AvaliaFilmes(req.body.id_filmes, req.body.avaliacao, req.body.nome_usuario);
    console.log(req.body);
    avaliaFilmesService.criarAvaliacao(AvaliaFilmesInstance, (err, avaliaFilmes) => {
        if (err) {
            return res.status(500).json({error:err})
        }
        res.status(201).json(avaliaFilmes)
    });
});

app.get('/rateflix/avaliacao', (req, res) => {
    avaliaFilmesService.buscarTodasAsAvaliacoes((err, avaliaFilmes) => {
        if(err) {
            return res.status(500).json({erro: err})
        }
        res.json(avaliaFilmes);
    });
});


const PORT = 3003
app.listen(PORT, () => {
    console.log(`API iniciada na porta ${PORT}`);
});