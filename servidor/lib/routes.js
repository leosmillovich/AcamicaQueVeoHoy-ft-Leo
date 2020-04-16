const controladorPeliculas = require('../controladores/mostrarPeliculas');
const controladorGeneros = require('../controladores/mostrarGeneros');
const controladorPeliculasId = require('../controladores/mostrarPeliculasId');
const recomendador = require('../controladores/recomendarPelicula');

module.exports = (app) => {
    app.get('/peliculas/recomendacion', recomendador.recomendar);
    app.get('/peliculas', controladorPeliculas.mostrarPeliculas);
    app.get('/generos', controladorGeneros.mostrarGeneros);
    app.get('/peliculas/:id', controladorPeliculasId.mostrarPeliculasId);  
};