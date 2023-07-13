const express = require('express');
const bodyParser = require('body-parser');
const Categorias = require('../model/categorias');
const CategoriasService = require('../service/categoriasService')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'diego'
  };



const categoriasService = new CategoriasService(config);




app.post('/rateflix/categorias', (req, res) => {
    let CategoriasInstance = new Categorias(req.body.categoria);
    categoriasService.criarCategorias(CategoriasInstance, (err, categoria) => {
        if (err) {
            return res.status(500).json({error:err})
        }
        res.status(201).json(categoria)
    });   
});

app.get('/rateflix/categorias', (req, res) => {
    categoriasService.buscarTodasAsCategorias((err, categoria) => {
        if(err) {
            return res.status(500).json({erro: err})
        }
        res.json(categoria);
    });
});

const PORT = 3000
app.listen(PORT, () => {
    console.log(`API iniciada na porta ${PORT}`);
});