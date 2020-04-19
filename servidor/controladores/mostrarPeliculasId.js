const conex = require('../lib/conexionbd');

function obtenerPelicula(req, res) {
    
    let id = req.params.id;
    //Consulta pelicula y genero
    let sql = "SELECT * FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = " + id;
    conex.query(sql, (error, resultado) => {
        if (error) {
            return res.status(404).send("Hubo un error en la consulta");
        }
        //Consulta actores
        sql = "SELECT * FROM actor_pelicula JOIN actor ON actor_id = actor.id WHERE pelicula_id = " + id;
        conex.query(sql, (error, resultadoActores) => {
            if (error) {
                return res.status(404).send("Hubo un error en la consulta");
            };
            let respuesta = {
                'pelicula': resultado[0],
                'genero': resultado[0].nombre,
                'actores': resultadoActores
            };
            res.send(respuesta);
        });
    });
};


module.exports = {
    obtenerPelicula
};