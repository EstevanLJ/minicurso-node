const app = require('./app/server.js');

let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server online on port ${port}`);
})