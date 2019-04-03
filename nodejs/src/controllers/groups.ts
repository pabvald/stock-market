import { db } from "../db";

//Returns the groups a user has been or is in, with all their fields
export async function getUserGroups(req: any,res: any){
    let nickname = req.params.nickname;
    let data = await db.query(`
        SELECT R.nombre, R.fechainicio, R.fechafin
        FROM reto R, participante P, usuario U 
        WHERE R.id = P.reto AND 
                     P.participante = U.nickname AND 
                     P.participante = $1;
        `,[nickname]);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(data);
} 
