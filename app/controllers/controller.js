//Importa a api
const api = require('../api.js');

let controller = {};

controller.search = (req, res) => {
    if (req.body.query) {
        api.search(req.body.query, (err, result) => {
            if (err) {
                res.render('error.hbs', {
                    error: '500',
                    message: 'Desculpe, algo deu errado.'
                });
            } else {
                let movies = result.results;
                if (movies.length > 10) {
                    movies = movies.slice(0, 10);
                }
                res.render('movies.hbs', {
                    movies
                });
            }
        });
    } else {
        res.status(500);
        res.render('error.hbs', {
            error: '500',
            message: 'Desculpe, algo deu errado.'
        });
    }
}

controller.details = (req, res) => {
    api.getDetails(req.params.id, (err, result) => {
        if (err) {
            res.status(500);
            res.render('error.hbs', {
                error: '500',
                message: 'Desculpe, algo deu errado.'
            });
        } else {
            res.send(result);
        }
    });
}

module.exports = controller;