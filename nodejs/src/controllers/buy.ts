import { db } from "../db";


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
        res.status(403).send({error : 1});
        return;
    }  
  
    try {   
        data = await db.query(`
            SELECT U.saldo FROM usuario U WHERE U.nickname=$1;
        `, [nickname]);

        balance = 10;   // data.rows[0].saldo;
     
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
        res.status(500).send({error : 3});
    }
}


