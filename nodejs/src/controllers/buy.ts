import { db } from "../db";
import { COMMISSION, OPERATION_COST } from "./commissions";

/**
 * Do the purchase given in the request.
 * @param req - http request. It contains the purchase that has to be made.
 * @param res - http response.
 */
export async function buyStocks( req : any, res : any ) {
    let nickname = req.session.nickname;
    let number = req.body.number;
    let id = req.body.id;
    let data;
    let balance;
    let stock_price;

    
    if(!nickname){
        res.send({error : 1});
        return;
    }  
  
    try {   
        
        balance = await getBalance(nickname);        
        if (!balance) {
            res.send({error : 1});
            return;
        }

        data = await db.query(` 
            SELECT P.precio FROM precioaccion P where P.id=$1;
        `, [id]);

        stock_price = data.rows[0].precio;  

        if (balance < stock_price * number) {
            res.send({error:2});
            return;
        }

        data = await db.query(`
            INSERT INTO transaccion(id, usuario, cantidad, fecha, producto, precioaccion) VALUES 
            (DEFAULT, $1, $2, current_timestamp, 'accion', $3);        
        `,[nickname, number, id]);
        
        res.send({error : 0});

    } catch(err) {
        res.send({error : 3});
    }
}

/**
 * Get the current balance of an user.
 * @param nickname - user's nickname
 */
async function getBalance(nickname : string) : Promise<number> {
    let balance;

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
        FROM usuario U, spentMoney S, earnedMoney E, commissionMoney C
        WHERE U.nickname=$1;
        `,[nickname, OPERATION_COST, COMMISSION]);
        
        if (data.rows.length !== 0) {
            balance = data.rows[0].saldo + data.rows[0].ganado - data.rows[0].gastado - data.rows[0].comisiones;
        }

        return balance;

    } catch(err) {
        console.log(err.stack);
        return undefined;
    }
}


