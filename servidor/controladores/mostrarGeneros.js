const conex = require('../lib/conexionbd');

function mostrarGeneros(req, res) {

    let sql = "SELECT * FROM genero";
    
    conex.query(sql, (error, resultado) => {
        if(error){
            return res.status(404).send("Hubo un error");
        };
        let respuesta = {
            'generos': resultado
        };
        res.send(respuesta)
    });

};

module.exports = {
    mostrarGeneros
};