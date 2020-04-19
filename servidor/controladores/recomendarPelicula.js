const conex = require('../lib/conexionbd');

function recomendar(req, res) {
    //Querys
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    let genero = req.query.genero;

    //Consulta basica
    let sql = "SELECT p.id, p.poster, p.trama, p.titulo, g.nombre FROM pelicula p INNER JOIN genero g ON p.genero_id= g.id";
    let condicion = "";

    //Condiciones recomendacion
    if (genero) {//Generp
        condicion = " WHERE g.nombre = '" + genero + "'";
        if (anio_inicio == 2005) {//Genero + estrenp
            condicion = " WHERE g.nombre = '" + genero + "' AND anio >= 2005";
        } else if (anio_inicio == 1900) {//Genero + clasico
            condicion = " WHERE g.nombre = '" + genero + "' AND anio < 2005";
        } else if (puntuacion) {//Genero + puntuada
            condicion = " WHERE g.nombre = '" + genero + "' AND puntuacion >= 7";
        };
    };

    //consulta final 
    sql += condicion;
    conex.query(sql, (error, resultado) => {
        if (error) {
            return res.status(404).send("Hubo un error");
        };
        let respuesta = {
            'peliculas': resultado
        };
        res.send(respuesta);
    });
};

module.exports = {
    recomendar
};