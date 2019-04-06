import { db } from "../db";

export async function getAllChallenges(req: any,res: any){
    
    let data = await db.query(`
    SELECT reto.id, reto.nombre, reto.fechainicio, reto.fechafin, COUNT(p.reto) AS participantes
    FROM Reto reto LEFT JOIN Participante p ON reto.id = p.reto
    GROUP BY reto.id
    ORDER BY reto.id DESC;
  
    `);

    let retos = [];
    for(let row of data.rows){
            retos.push({
                id: row.id,
                nombre: row.nombre,
                fechaInicio: row.fechainicio,
                fechaFin: row.fechafin,
                numParticipantes: row.participantes
            });
       
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(retos);
}


export async function createChallenge(req: any,res: any){
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let fechaini = req.body.fechainicio;
    let fechafin = req.body.fechafin;
    let creador = req.body.creador;

    let query = await db.query(`
    INSERT INTO Reto (id,nombre,descripcion,fechaInicio,fechaFin,creador)
    VALUES(DEFAULT,$1, $2, $3, $4, $5) RETURNING id
    `,[nombre,descripcion,fechaini,fechafin,creador]);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({id:query.rows[0].id});
}