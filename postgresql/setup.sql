-- Create tables 

DROP TABLE usuario CASCADE;
DROP TABLE reto CASCADE;
DROP TABLE participante CASCADE;
DROP TABLE empresa CASCADE;
DROP TABLE precioaccion CASCADE;
DROP TABLE transaccion CASCADE;

CREATE TABLE usuario (
    nickname TEXT,
    nombre TEXT,
    password TEXT NOT NULL,
    correo TEXT NOT NULL,
    saldo INT NOT NULL,
    urlFoto TEXT,
    biografia TEXT,
    imagen TEXT DEFAULT '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',
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
       ('SBUX', 'Starbucks'),
       ('ZIXI', 'Zix'),
       ('FTEK', 'Fuel Tech'),
       ('FSLR', 'First Solar'),
       ('HA'  , 'Hawaiian Holdings'),
       ('WYNN', 'Wynn Resorts'),
       ('BIIB', 'Biogen Idec'),
       ('EDAP', 'Edap Tms.'),
       ('GERN', 'Geron'),
       ('TIGR', 'Tigerlogic');




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
       (DEFAULT,'SBUX',NOW(),7686),
       (DEFAULT,'ZIXI',NOW(),2541),  
       (DEFAULT,'FTEK',NOW(),1786),  
       (DEFAULT,'FSLR',NOW(),5686),  
       (DEFAULT,'HA'  ,NOW(),7886),  
       (DEFAULT,'WYNN',NOW(),886),  
       (DEFAULT,'BIIB',NOW(),756),  
       (DEFAULT,'EDAP',NOW(),2886),  
       (DEFAULT,'GERN',NOW(),3456),  
       (DEFAULT,'TIGR',NOW(),44246); 
       
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