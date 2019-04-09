import { db } from "../db";

//Returns the groups a user has been or is in, with all their fields
export async function getUserGroups(req: any,res: any){
    let nickname = req.params.nickname;
    //SELECT R.nombre, R.fechainicio, R.fechafin, P.balanceinicial, P.balancefinal, P.ranking, Temp.numParticipantes
    let data = await db.query(`
        SELECT DISTINCT R.nombre, R.fechainicio, R.fechafin, P.balanceinicial, Temp.numParticipantes, Diferencia.balancefinal
        FROM reto R, participante P, usuario U, (SELECT R.id, COUNT(*) AS numParticipantes
                                                FROM participante P, Reto R 
                                                WHERE P.reto = R.id
                                                GROUP BY(R.id))Temp,
                                                (SELECT U.nickname, 
                                                (
                                                    SELECT U.saldo+S.ganado-E.gastado 
                                                    FROM 
                                                        (SELECT COALESCE(SUM(T.cantidad),0) AS gastado
                                                        FROM transaccion T
                                                        WHERE T.usuario = U.nickname AND
                                                            T.origen IS NULL AND T.fecha>=R.fechaFin)E,
                                                        (    SELECT COALESCE(SUM(T.cantidad),0) AS ganado
                                                        FROM transaccion T
                                                        WHERE T.usuario = U.nickname AND
                                                              T.origen IS NOT NULL AND T.fecha>=R.fechaFin
                                                        )S
                                                )AS balancefinal, P.balanceinicial
                                                FROM Participante P, Usuario U,Reto R
                                                WHERE P.participante = $1 AND U.nickname = P.participante AND R.id = P.reto)Diferencia
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
