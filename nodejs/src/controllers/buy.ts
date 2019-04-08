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

    if(nickname == undefined){
        res.status(403).send({ok: false});
        return;
    }

    try {
        data = await db.query(`
            INSERT INTO transaccion(id, usuario, cantidad, fecha, producto, precioaccion) VALUES 
            (DEFAULT, $1, $2, current_timestamp, 'accion', $3);
        
        `,[nickname, number, id]);
        
        res.send({ok:true});

    } catch(err) {
        res.status(500).send({ok: false});
    }

}