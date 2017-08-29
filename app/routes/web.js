module.exports = (app) => {

    //Importa os controllers
    const controller = require('../controllers/controller.js');

    //Rota da tela inicial
    app.get('/', function (req, res) {
        res.render('search.hbs');
    })

    //Rota da busca principal
    app.post('/search', function (req, res) {
        controller.search(req, res);
    });

    //Rota da requisicao ajax
    app.get('/details/:id', function (req, res) {
        controller.details(req, res);
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