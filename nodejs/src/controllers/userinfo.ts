import { db } from "../db";
import { COMMISSION, OPERATION_COST } from "./commissions";


/**
 * Returns the information contained in the user table. Also computes the user's invested and earned capital,
 * so the current capital is trivially obtained
 * @param req - http request containing the user's nickname.
 * @param res - http response
 */
export async function getUserInformation(req: any,res: any){
	let nickname = req.params.nickname;
	
	try {
		let data = await db.query(`
			WITH spentMoney AS (
					SELECT SUM(T.cantidad * PA.precio) AS gastado
					FROM transaccion T
					JOIN precioaccion PA ON T.precioaccion=PA.id
					WHERE T.usuario = $1 AND
						T.origen IS NULL
				),

				earnedMoney AS(
					SELECT SUM(T.cantidad * PA.precio) AS ganado
					FROM transaccion T
					JOIN precioaccion PA ON T.precioaccion=PA.id
					WHERE T.usuario = $1 AND
						T.origen IS NOT NULL
				),

				commissionMoney AS (
					SELECT SUM(T.cantidad * PA.precio * $3/100 + $2) as comisiones
					FROM transaccion T 
					JOIN precioaccion PA ON T.precioaccion=PA.id
					WHERE T.usuario = $1 
				)
			SELECT *
			FROM Usuario U, spentMoney S, earnedMoney E, commissionMoney C
			WHERE U.nickname = $1;
			`,[nickname, OPERATION_COST, COMMISSION]);
		
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//console.log(data.rows[0]);
		data.rows[0].ganado = parseFloat(data.rows[0].ganado); 
		data.rows[0].gastado = parseFloat(data.rows[0].gastado); 
		data.rows[0].comisiones = parseFloat(data.rows[0].comisiones);
		res.send(data.rows[0]);
	
	} catch(err) {
		console.log(err.stack);
	}
}

export async function getUserEvolution(req: any, res: any){
	let nickname = req.params.nickname;
	let datasPromise = [];
	
	let date = new Date();
	for(let i=0;i<12;i++){
		let prev = new Date(date);
		prev.setMonth(date.getMonth()-1);
		datasPromise.push(db.query(`
		WITH spentMoney AS(
			SELECT SUM(T.cantidad * PA.precio) AS gastado
			FROM transaccion T
			JOIN precioaccion PA ON T.precioaccion=PA.id
			WHERE T.usuario = $1 AND
				T.origen IS NULL AND
				T.fecha >= $2 AND
				T.fecha < $3
			), earnedMoney AS(
			SELECT SUM(T.cantidad * PA.precio) AS ganado
			FROM transaccion T
			JOIN precioaccion PA ON T.precioaccion=PA.id
			WHERE T.usuario = $1 AND
				T.origen IS NOT NULL AND
				T.fecha >= $2 AND
				T.fecha < $3
			)
		SELECT (COALESCE(E.ganado,0)-COALESCE(S.gastado,0)) AS balance
		FROM Usuario U, spentMoney S, earnedMoney E
		WHERE U.nickname = $1;
		`,[nickname,prev.toISOString(),date.toISOString()]));
		date.setMonth(date.getMonth()-1);
	}
	let balance = [];
	let datas = await Promise.all(datasPromise);
	for(let dataMonth of datas){
		balance.push(parseInt(dataMonth.rows[0].balance));
	}
	res.send(balance.reverse());

}

