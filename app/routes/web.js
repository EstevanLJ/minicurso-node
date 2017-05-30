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
                    res.send('bad');
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
            res.send('bad');
        }
    });

    //Rota da requisição ajax
    app.get('/details/:id', function (req, res) {
        api.getDetails(req.params.id, (err, result) => {
            if (err) {
                console.log(err);
                res.send('err');
            } else {
                res.send(result);
            }
        });
    });
    
}