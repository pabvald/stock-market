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

    res.send(retos);
}


export async function createChallenge(req: any,res: any){
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let fechaini = new Date();
    let fechafin = req.body.fechafin;
    let creador = req.session.nickname;

    let query = await db.query(`
    INSERT INTO Reto (id,nombre,descripcion,fechaInicio,fechaFin,creador)
    VALUES(DEFAULT,$1, $2, $3, $4, $5) RETURNING id;
    `,[nombre,descripcion,fechaini,fechafin,creador]);

    await db.query(`
        WITH spentMoney AS(
			SELECT COALESCE(SUM(T.cantidad),0) AS gastado
			FROM transaccion T
			WHERE T.usuario = $1 AND
				  T.origen IS NULL
			), earnedMoney AS(
			SELECT COALESCE(SUM(T.cantidad),0) AS ganado
			FROM transaccion T
			WHERE T.usuario = $1 AND
				  T.origen IS NOT NULL
            )
            INSERT INTO Participante VALUES($2,$1,(SELECT U.saldo+E.ganado-S.gastado 
                FROM Usuario U, spentMoney S, earnedMoney E
                  WHERE U.nickname = $1));`,[creador,query.rows[0].id]);
    
    res.send({id:query.rows[0].id});
}

export async function getChallengeUsers(req: any,res: any){

    let data = await db.query(`SELECT U.nickname, 
    (
        SELECT U.saldo+S.ganado-E.gastado 
        FROM 
            (SELECT COALESCE(SUM(T.cantidad),0) AS gastado
            FROM transaccion T
            WHERE T.usuario = U.nickname AND
                T.origen IS NULL AND T.fecha<=R.fechaFin)E,
            (	SELECT COALESCE(SUM(T.cantidad),0) AS ganado
			FROM transaccion T
			WHERE T.usuario = U.nickname AND
				  T.origen IS NOT NULL AND T.fecha<=R.fechaFin
            )S
    )AS saldo, U.balanceInicial
    FROM Participante P, Usuario U,Reto R
    WHERE U.nickname =P.participante AND P.reto=0 AND R.id = P.reto;`);

    let users = [];
    for(let row of data.rows){
        users.push({
            nickname: row.nickname,
            saldo: row.saldo,
            balanceInicial:row.balanceInicial
        });
   
}

    return (users)
}

