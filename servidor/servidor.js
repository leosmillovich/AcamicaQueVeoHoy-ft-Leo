const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./lib/routes');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//
routes(app);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const port = 8080;
app.listen(port, () => {
  console.log("Escuchando en el puerto " + port);
});

