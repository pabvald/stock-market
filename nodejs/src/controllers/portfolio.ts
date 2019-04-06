import { db } from "../db";

async function portfolio(nickname: string): Promise<any>{
    let data = await db.query(`
    WITH AccionesSinVender AS (
        SELECT T1.id
        FROM transaccion T1
        WHERE
            T1.producto='accion' AND
            T1.usuario=$1 AND
            T1.origen IS NULL AND
            T1.cantidad > (
                SELECT COALESCE(SUM(T2.cantidad),0)
                FROM transaccion T2
                WHERE T2.origen=T1.id)
    )
    SELECT T3.id, T3.cantidad, PA.precio, E.codigo, E.nombre, T3.origen
    FROM transaccion T3
        JOIN precioaccion PA ON T3.precioaccion=PA.id
        JOIN empresa E ON PA.empresa=E.codigo
    WHERE
        T3.producto='accion' AND
        T3.usuario=$1 AND
        T3.origen IN ( SELECT ASV.id FROM AccionesSinVender ASV)
    UNION
    SELECT ASV.id, T4.cantidad, PA.precio, E.codigo, E.nombre, T4.origen
    FROM AccionesSinVender ASV
        NATURAL JOIN transaccion T4
        JOIN precioaccion PA ON T4.precioaccion=PA.id
        JOIN empresa E ON PA.empresa=E.codigo
    `,[nickname]);
    let activeActions: any = new Object();
    for(let row of data.rows){
        // BUY
        if(row.origen === null){
            activeActions[row.id] = {
                id: row.id,
                quantity: row.cantidad,
                price: row.precio,
                code: row.codigo,
                name: row.nombre
            };
        }else{
            //SELL
            activeActions[row.origen].quantity -= row.cantidad;
        }
    }
    return activeActions;
}

export async function getPortfolioSummary(req: any,res: any){
    let nickname = req.params.nickname;
    let activeActions = await portfolio(nickname);
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(Object.values(activeActions));
}

export async function getHistory(req: any, res: any){
    let nickname = req.params.nickname;
    let data = await db.query(`
    SELECT T.origen, E.nombre, T.fecha, T.cantidad, PA.precio
    FROM transaccion T
        JOIN precioaccion PA ON T.precioaccion=PA.id
        JOIN empresa E ON PA.empresa=E.codigo
    WHERE
        T.usuario = $1
    ORDER BY T.fecha DESC
    `,[nickname]);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let actionHistory = new Array();
    for(let row of data.rows){
        actionHistory.push({
            action: row.origen ? "sell" : "buy",
            company: row.nombre,
            date: row.fecha,
            quantity: row.cantidad,
            price: row.precio
        });
    }
    res.send(actionHistory);
}

/**
 * Sell N actions of action packet I
 * @param req 
 * @param res 
 */
export async function sellActions(req: any, res: any){
    let buyId = req.body.id;
    let quantity = req.body.quantity;
    let nickname = req.body.nickname;
    // COMPROBAR USUARIO
    // COMPROBAR CANTIDAD
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let activeActions = await portfolio(nickname);
    if(activeActions[buyId]){
        if(activeActions[buyId].quantity < quantity){
            res.status(400).send({ok: false});
            return;
        }else{
            try{
                let data = await db.query(`
                    INSERT INTO transaccion
                    VALUES
                    (DEFAULT,$1,$2,NOW(),'accion',$3,(
                        SELECT PA1.id
                        FROM precioaccion PA1
                            JOIN precioaccion PA2 ON PA1.empresa=PA2.empresa
                            JOIN transaccion T2 ON PA2.id=T2.precioaccion
                        WHERE
                            T2.id=$3
                        ORDER BY PA1.fecha DESC
                        LIMIT 1
                    ))
                `,[nickname,quantity,buyId]);
                res.send({ok: true});
            }catch(e){
                res.status(500).send({ok: false});
            }
            
        }
    }

}