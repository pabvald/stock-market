import { db } from "../db";


/*
 * It gets the evolution of a company's price.
 */
export async function getCompanyEvolution( req : any, res : any) {
    let code = req.params.codigo;    
    try {
        let data = await db.query(`
            SELECT P.fecha, P.precio
            FROM precioaccion P  
            WHERE P.empresa = $1
            ORDER BY P.fecha;`, [code]
        );

    } catch(err) {
        console.log(err.stack);
    }
}