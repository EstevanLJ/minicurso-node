const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const hbs = require('hbs');

require('dotenv').config();

//Inicia o express
const app = express();

//Configura o local do momentjs
moment.locale('pt-br');

//Configura o HBS como engine de views e registra um helper do handlebars
app.set('view engine', 'hbs');
app.set('views', './app/views');

//Configura a pasta publica
app.use(express.static('./app/public'));

hbs.registerHelper('formatDate', function (date) {
    return moment(date).format('MMMM [de] YYYY');
});

// configura o body-parser como middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//Cria as rotas
require('./routes/web.js')(app);

module.exports = app;