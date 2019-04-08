import { db } from "../db";

//Returns the groups a user has been or is in, with all their fields
export async function getUserGroups(req: any,res: any){
    let nickname = req.params.nickname;
    //SELECT R.nombre, R.fechainicio, R.fechafin, P.balanceinicial, P.balancefinal, P.ranking, Temp.numParticipantes
    let data = await db.query(`
        SELECT R.nombre, R.fechainicio, R.fechafin, P.balanceinicial, Temp.numParticipantes
        FROM reto R, participante P, usuario U, (SELECT R.id, COUNT(*) AS numParticipantes
                                                FROM participante P, Reto R 
                                                WHERE P.reto = R.id
                                                GROUP BY(R.id))Temp
        WHERE R.id = P.reto AND 
                     P.participante = U.nickname AND 
                     P.participante = $1 AND
                     Temp.id = P.reto;
        `,[nickname]);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(data);
    res.send(data.rows);
} 
