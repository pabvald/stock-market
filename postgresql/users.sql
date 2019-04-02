INSERT INTO usuario VALUES ('aarroyoc','Adrián Arroyo','7777','adrian.arroyo.calle@alumnos.uva.es',9500,'pato.png','Illuminati confirmed');
-- Añadir transacciones fake
INSERT INTO transaccion
VALUES
    (DEFAULT,'aarroyoc',50,NOW(),'accion',NULL,1),
    (DEFAULT,'aarroyoc',50,NOW(),'accion',1,1),
    (DEFAULT,'aarroyoc',25,NOW(),'accion',NULL,2)
    (DEFAULT,'aarroyoc',10,NOW(),'accion',3,2);
