CREATE TABLE usuario (
    nickname TEXT,
    nombre TEXT,
    password TEXT NOT NULL,
    correo TEXT NOT NULL,
    saldo INT NOT NULL,
    urlFoto TEXT,
    biografia TEXT,
    PRIMARY KEY (nickname),
    CHECK (saldo > 0)
);

CREATE TABLE reto (
    id SERIAL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    creador TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (creador) REFERENCES usuario(nickname),
    CHECK (fechaFin > fechaInicio)
);

CREATE TABLE participante (
    reto INT,
    participante TEXT,
    balanceInicial INT NOT NULL,
    PRIMARY KEY (reto,participante),
    FOREIGN KEY (reto) REFERENCES reto(id),
    FOREIGN KEY (participante) REFERENCES usuario(nickname),
    CHECK (balanceInicial > 0)
);

CREATE TABLE empresa (
    codigo TEXT,
    nombre TEXT NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE precioaccion (
    id SERIAL,
    empresa TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    precio INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (empresa) REFERENCES empresa(codigo),
    CHECK (precio > 0)
);

CREATE TABLE transaccion (
    id SERIAL,
    usuario TEXT NOT NULL,
    cantidad INT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    producto VARCHAR(6) NOT NULL,
    origen INT,
    precioAccion INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario) REFERENCES usuario(nickname),
    FOREIGN KEY (precioAccion) REFERENCES precioaccion(id),
    FOREIGN KEY (origen) REFERENCES transaccion(id),
    CHECK (cantidad > 0),
    CHECK (producto IN ('accion'))
);

