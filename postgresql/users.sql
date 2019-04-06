INSERT INTO usuario VALUES  ('aarroyoc',    'Adrián Arroyo','7777',                 'adrian.arroyo.calle@alumnos.uva.es',   9500,   'pato.png',         'Illuminati confirmed'),
							 ('jugonza',    'Juan González','contraseña',           'juan.gonzalez.caminero@alumnos.uva.es',17874,  'rickastley.jpeg',  'Paralelizar hasta reventar'),
							 ('willyrex',   'Willy Rex',    'totallynotplaintext',  'willyrex@minecraft.ad',                999999, 'willy.jpeg',       'Staying alive');
-- Añadir transacciones fake
INSERT INTO transaccion
VALUES
    (DEFAULT,'aarroyoc',50,NOW(),'accion',NULL,1),
    (DEFAULT,'aarroyoc',50,NOW(),'accion',1,1),
    (DEFAULT,'aarroyoc',25,NOW(),'accion',NULL,2),
    (DEFAULT,'aarroyoc',10,NOW(),'accion',3,2);
