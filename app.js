var bodyParser = require('body-parser');
let express = require('express');
let hbs = require('hbs');
let moment = require('moment');
require('dotenv').config();
let api = require('./api');

//Inicia o express
const app = express();

//Configura o local do momentjs
moment.locale('pt-br');

//Registra um helper do handlebars
hbs.registerHelper('formatDate', function (date) {
    return moment(date).format('MMMM [de] YYYY');
});

//Configura o HBS como engine de views
app.set('view engine', 'hbs');

// configura o body-parser como middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//Configura a pasta publica
app.use(express.static('public'))

//Cria as rotas
app.get('/', function (req, res) {
    res.render('search.hbs');
})

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

let port = 3000;

app.listen(port, function () {
    console.log(`Server online on port ${port}`);
})