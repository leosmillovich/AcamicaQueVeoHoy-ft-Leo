CREATE DATABASE peliculas;

USE peliculas;

CREATE TABLE pelicula (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  duracion INT(5),
  director VARCHAR(400),
  anio INT(5),
  fecha_lanzamiento DATE,
  puntuacion INT(2),
  poster VARCHAR(300),
  trama VARCHAR(700),
  PRIMARY KEY(id)
);  

-- Ejecutar sript paso 1 --

--
CREATE TABLE genero (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30), 
  PRIMARY KEY(id)
);

--Agrego columna genero id
ALTER TABLE pelicula ADD COLUMN genero_id INT;
--Agrego FK en la tabla pelicula referenciando el genero id de la tabla genero--
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

-- Ejecutar script paso 2 --
--
CREATE TABLE  actor (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(70), 
  PRIMARY KEY(id)
);

CREATE TABLE actor_pelicula (
  id INT NOT NULL AUTO_INCREMENT,
  actor_id INT,
  pelicula_id INT,
  PRIMARY KEY (id)
);


ALTER TABLE actor_pelicula ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);
 
ALTER TABLE actor_pelicula ADD FOREIGN KEY (actor_id) REFERENCES actor(id);

--Ejecutar script 3--