-- Create tables 

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
                                                                                                                                                               
-- Grant privileges 
GRANT ALL PRIVILEGES ON TABLE usuario TO stock_nodejs;
GRANT ALL PRIVILEGES ON TABLE reto TO stock_nodejs;
GRANT ALL PRIVILEGES ON TABLE participante TO stock_nodejs;
GRANT ALL PRIVILEGES ON TABLE empresa TO stock_nodejs;
GRANT ALL PRIVILEGES ON TABLE precioaccion TO stock_nodejs;
GRANT ALL PRIVILEGES ON TABLE transaccion TO stock_nodejs;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to stock_nodejs;



-- Insert Nasdaq companies and its initial stock price 
INSERT INTO empresa
VALUES ('SIRI', 'Sirius Xm Radio Inc.'),
    ('APPL','Apple'),
    ('MSFT','Microsoft'),
    ('CSCO', 'Cisco Systems'),
    ('MRVL', 'Marvell'),
    ('BBBY', 'Beth Bath & Beyond'),
    ('GOOG','Google'),
    ('NVDA', 'Nvidia'),
    ('INTC','Intel'),
    ('ADBE','Adobe'),
    ('PYPL','PayPal'),
    ('TWTR','Twitter'),
    ('AMD' ,'AMD'),
    ('QCOM','Qualcomm'),
    ('PLUG', 'Plug Power'),
    ('SYMC', 'Symantec'),
    ('NFLX', 'Netflix'),
    ('EBAY', 'Ebay Inc.'),
    ('BIDU', 'Baidu'),
    ('DLTR', 'Dollar Tree'),
    ('AMZN', 'Amazom.com'),
    ('SBUX', 'Starbucks');



INSERT INTO precioaccion
VALUES (DEFAULT,'SIRI',NOW(),15000),
       (DEFAULT,'APPL',NOW(),5000),
       (DEFAULT,'MSFT',NOW(),8000),
       (DEFAULT,'CSCO',NOW(),20000),
       (DEFAULT,'MRVL',NOW(),15000),
       (DEFAULT,'BBBY',NOW(),18000),
       (DEFAULT,'GOOG',NOW(),15066),
       (DEFAULT,'NVDA',NOW(),1500),
       (DEFAULT,'INTC',NOW(),1500),
       (DEFAULT,'ADBE',NOW(),10333),
       (DEFAULT,'PYPL',NOW(),1500),
       (DEFAULT,'TWTR',NOW(),1500),
       (DEFAULT,'AMD' ,NOW(),1500),
       (DEFAULT,'QCOM',NOW(),53456),
       (DEFAULT,'PLUG',NOW(),90543),
       (DEFAULT,'SYMC',NOW(),74123),
       (DEFAULT,'NFLX',NOW(),10032),
       (DEFAULT,'EBAY',NOW(),50320),
       (DEFAULT,'BIDU',NOW(),60085),
       (DEFAULT,'DLTR',NOW(),14160),
       (DEFAULT,'AMZN',NOW(),8099),
       (DEFAULT,'SBUX',NOW(),2886);    
       
-- Insert some users
INSERT INTO usuario VALUES ('aarroyoc','Adrián Arroyo','7777','adrian.arroyo.calle@alumnos.uva.es',9500,'pato.png','Illuminati confirmed'),
                                                        ('jugonza','Juan González','contraseña','juan.gonzalez.caminero@alumnos.uva.es',17874,'rickastley.jpeg','Paralelizar hasta reventar'),
                                                        ('willyrex','Willy Rex','totallynotplaintext','willyrex@minecraft.ad',999999,'willy.jpeg','Staying alive');



-- Insert some challenges 
INSERT INTO reto VALUES (0,'Adictos a la bolsa','Somos un grupo de personas adictas a las bolsas de playa','2000-12-31','2001-5-20','aarroyoc'),
                            (1,'Bolsatr0n medina del campo','Grupo de competición del curso de bolsa de medina','2007-10-15','2007-12-15','aarroyoc'),
                            (2,'Clase 1ºB','Clase de 1ºB','2009-3-4','2009-5-20','aarroyoc');

INSERT INTO participante VALUES (0, 'aarroyoc', 5000),(0, 'jugonza', 2500),(1, 'willyrex', 10000),(2, 'aarroyoc', 1000),(2, 'jugonza', 1500),(2, 'willyrex', 4500);



-- Insert some transactions 
INSERT INTO transaccion
VALUES  (DEFAULT,'aarroyoc',50,NOW(),'accion',NULL,1),
        (DEFAULT,'aarroyoc',50,NOW(),'accion',1,1),
        (DEFAULT,'aarroyoc',25,NOW(),'accion',NULL,2),
        (DEFAULT,'aarroyoc',10,NOW(),'accion',3,2);                                                                                                                                          