import { db } from "../db";
import { Price } from "../../../angular/src/app/models/price";


const INTERVALS = 50;      // Number of INTERVALS used to build the candlestick chart.

/**
 * Get the evolution of a company's price.
 * @param code - the code of the company whose evolution is obtained.
 */
export async function companyEvolution( code : string ) : Promise<any> {   
    let price : Price;
    let data;
    let evolution : Price[] = [];      
    
    try {

        for(let i = 0; i < INTERVALS; i++ ) {
            
            data = await db.query(`
                WITH IntervalAsc AS (
                    SELECT * 
                    FROM precioaccion P1 
                    WHERE P1.empresa = $1 AND 
                          P1.fecha <= current_timestamp - ( $2*15    || ' minutes')::interval  AND 
                          P1.fecha > current_timestamp  - (($2+1)*15 || ' minutes')::interval 
                    ORDER BY P1.fecha ASC
                
                ),  IntervalDesc AS (
                    SELECT *
                    FROM precioaccion P2 
                    WHERE P2.empresa = $1 AND 
                          P2.fecha <= current_timestamp - ($2*15 ||' minutes')::interval  AND 
                          P2.fecha > current_timestamp - (($2+1)*15 ||' minutes')::interval 
                    ORDER BY P2.fecha DESC

                ),  Maximin AS ( 
                    SELECT MAX(precio) as high, MIN(precio) as low, COUNT(*) as volume 
                    FROM IntervaloAsc
                )
                
                    
                SELECT M.high,
                    M.low,
                    O.precio AS open, 
                    C.precio AS close,
                    date_trunc('minute', C.fecha) as date,
                    M.volume                    
                FROM Maximin M,
                    (SELECT * FROM IntervalAsc  LIMIT 1) O, 
                    (SELECT * FROM IntervalDesc LIMIT 1) C;                     
            `, [code, i]);
            

            if (data.rows.length != 0 ) {
                price = {
                    high : data.rows[0].high,
                    low : data.rows[0].low,
                    open : data.rows[0].open,
                    close : data.rows[0].close,
                    date : data.rows[0].date,
                    volume : data.rows[0].count
               };
            } else { 
                price = {
                    high : 0,
                    low : 0,
                    open : 0,
                    close : 0,
                    date : null,
                    volume : 0,
               };
            } 

            // Add the price to the evolution array 
            evolution.push(price);
        }

    } catch(err) {
        console.log(err.stack);
    }
    return evolution;
}


/**
 * Get the evolution of a company's price. 
 * @param req 
 * @param res 
 */
export async function getCompanyEvolution(req : any, res : any ) {
    let code = req.params.codigo;
    let evolution = await companyEvolution(code);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(evolution);
}