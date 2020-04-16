const conex = require('../lib/conexionbd');


function mostrarPeliculas(req, res) {

    //QUERYS
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let anio = req.query.anio;
    let columnaOrden = req.query.columna_orden;
    let tipoOrden = req.query.tipo_orden;
    let pagina = Number(req.query.pagina);
    let cantidad = Number(req.query.cantidad);
    let paginacion = (pagina - 1) * cantidad;

    let sqlBasica = 'SELECT * FROM pelicula ';//se muestran todas las peliculas de la base de datos
    let condicion;
    
    //Condiciones de filtros, se concatenan posibles combinaciones(Si, es horrible el codigo)
    if ((titulo) && (genero) && (anio)) {//intente un monton caminos pero no pude solucionar la redundancia
        condicion = ' WHERE titulo LIKE "%' + titulo + '%"' + ' AND genero_id = ' + genero + ' AND anio = ' + anio;
        sqlBasica += condicion;
    } else if ((titulo) && (genero)) {
        condicion = ' WHERE titulo LIKE "%' + titulo + '%"' + ' AND genero_id = ' + genero;
        sqlBasica += condicion;
    } else if ((titulo) && (anio)) {
        condicion = ' WHERE titulo LIKE "%' + titulo + '%"' + ' AND anio = ' + anio;
        sqlBasica += condicion;
    } else if (titulo) {
        condicion = ' WHERE titulo LIKE "%' + titulo + '%"';
        sqlBasica += condicion;
    } else if ((genero) && (anio)) {
        condicion = ' WHERE genero_id = ' + genero + ' AND anio = ' + anio;
        sqlBasica += condicion;
    } else if (genero) {
        condicion = ' WHERE genero_id = ' + genero;
        sqlBasica += condicion;
    } else if (anio) {
        condicion = ' WHERE anio = ' + anio;
        sqlBasica += condicion;
    };

    //orden
    if (columnaOrden === 'titulo') {
        sqlBasica += ' ORDER BY titulo ' + tipoOrden;
    } else if (columnaOrden === 'anio') {
        sqlBasica += ' ORDER BY fecha_lanzamiento ' + tipoOrden;
    } else if (columnaOrden === 'puntuacion') {
        sqlBasica += ' ORDER BY puntuacion ' + tipoOrden;
    };

    
    let sql = sqlBasica;
    conex.query(sql, (error, resultado) => {
        if (error) {
            return res.status(404).send("Hubo un error");
        };
        if (resultado.length == 0) {
            return res.status(404).send("Hubo un error");
        };
        let total = resultado.length;
        if (cantidad) {
            sql += " LIMIT " + cantidad + " OFFSET " + paginacion;
        };
        //Consulta final
        conex.query(sql, (error, resultado) => {
            if (error) {
                return res.status(404).send("Hubo un error");
            };
            let respuesta = {
                'peliculas': resultado,
                'total': total
            };
            res.send(respuesta);
        });
    });
};

module.exports = {
    mostrarPeliculas
};