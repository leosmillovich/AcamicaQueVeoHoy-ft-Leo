const conex = require('../lib/conexionbd');

function obtenerPelicula(req, res) {

    let id = req.params.id;

    //primer consulta: datos de la pelicula + genero.
    let sql = "SELECT poster, anio, titulo, trama, fecha_lanzamiento, director, duracion, puntuacion, nombre FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = " + id;
    conex.query(sql, (error, resultado) => {
        if (error) {
            return res.status(404).send("Hubo un error");
        };

        //segunda consulta: nombre de los actores.
        sql = "SELECT nombre FROM actor JOIN actor_pelicula ON actor.id = actor_id JOIN pelicula On pelicula_id = pelicula.id WHERE pelicula.id = " + id;
        conex.query(sql, (error, resultadoActores) => {
            if (error) {
                return res.status(404).send("Hubo un error");
            };
            let respuesta = {
                'pelicula': resultado[0],
                'genero': resultado,
                'actores': resultadoActores
            };
            res.send(respuesta);
        });
    });
};

module.exports = {
    obtenerPelicula
};