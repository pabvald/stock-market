import { db } from "../db";

//Returns the information contained in the user table. Also computes the user's invested and earned capital,
//So the current capital is trivially obtained
export async function getUserInformation(req: any,res: any){
    let nickname = req.params.nickname;
    let data = await db.query(`
        WITH spentMoney AS(
			SELECT SUM(T.cantidad * PA.precio) AS gastado
			FROM transaccion T
			JOIN precioaccion PA ON T.precioaccion=PA.id
			WHERE T.usuario = $1 AND
				  T.origen IS NULL
			), earnedMoney AS(
			SELECT SUM(T.cantidad * PA.precio) AS ganado
			FROM transaccion T
			JOIN precioaccion PA ON T.precioaccion=PA.id
			WHERE T.usuario = $1 AND
				  T.origen IS NOT NULL
			)
		SELECT *
		FROM Usuario U, spentMoney S, earnedMoney E
		WHERE U.nickname = $1;
        `,[nickname]);
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(data.rows[0]);
    data.rows[0].ganado = parseFloat(data.rows[0].ganado); 
	data.rows[0].gastado = parseFloat(data.rows[0].gastado); 
    res.send(data.rows[0]);
}

