import { db } from "../db";

export async function getPortfolioSummary(req: any,res: any){
    let nickname = req.params.nickname;
    let data = await  db.query(`
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
    res.send(Object.values(activeActions));
}