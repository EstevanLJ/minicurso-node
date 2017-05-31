module.exports = (app) => {

    //Importa a api
    const api = require('../api.js');

    //Rota da tela inicial
    app.get('/', function (req, res) {
        res.render('search.hbs');
    })

    //Rota da busca principal
    app.post('/search', function (req, res) {

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
    });

    //Rota da requisicao ajax
    app.get('/details/:id', function (req, res) {
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
    });

    //Caso nao entre em nenhuma rota, retorna erro 404
    app.use(function (req, res, next) {
        res.status(404);
        res.render('error.hbs', {
            error: '404',
            message: 'Página não encontrada!'
        });
    });

}