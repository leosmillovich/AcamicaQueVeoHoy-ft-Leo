const conex = require('../lib/conexionbd');

function recomendar(req, res) {

    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    let genero = req.query.genero;

    let sql = "select * from pelicula"//cuando hago join con genero no funciona el boton ver mas
    let condicion;
    if ((anio_inicio == 2005) && (anio_fin == 2020)) {
        condicion = " where anio >= 2005"
    }

    sql += condicion;
    conex.query(sql, (error, resultado) => {
        if (error) {
            return res.status(404).send("Hubo un error");
        };
        let respuesta = {
            'peliculas': resultado
        };
        console.log(respuesta);
        res.send(respuesta);
    });
};

module.exports = {
    recomendar
};