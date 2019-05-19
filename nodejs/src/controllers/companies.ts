import { db } from "../db";
import { threadId } from "worker_threads";

const PERIODS : number = 200;
const PERIOD_DURATION_MINUTES : number  = 2;

let PRICE_EVOLUTION = null;

/**
 * Get the evolution of a company's price.
 * @param code - the code of the company whose evolution is obtained.
 * @param periods - number of periods 
 * @param periodDuration - periodDuration in minutes 
 */
async function companyEvolution( code : string) : Promise<any> {   
    let price : any;
    let data;
    let noMore : boolean = false;
    let evolution : any[] = [];      
    let begin : number;
    let end : number;
    
    try {

        for(let i = 0; i < PERIODS && !noMore; i++ ) {  
            end = i*PERIOD_DURATION_MINUTES;
            begin = (i+1)*PERIOD_DURATION_MINUTES;
            data = await db.query(`
                WITH IntervalAsc AS (
                    SELECT * 
                    FROM precioaccion P1 
                    WHERE P1.empresa = $1 AND 
                          P1.fecha <= current_timestamp - ($2    || ' minutes')::interval  AND 
                          P1.fecha > current_timestamp  - ($3 || ' minutes')::interval 
                    ORDER BY P1.fecha ASC
                
                ),  IntervalDesc AS (
                    SELECT *
                    FROM precioaccion P2 
                    WHERE P2.empresa = $1 AND 
                          P2.fecha <= current_timestamp - ($2 ||' minutes')::interval  AND 
                          P2.fecha > current_timestamp - ($3 ||' minutes')::interval 
                    ORDER BY P2.fecha DESC

                ),  Maximin AS ( 
                    SELECT MAX(precio) as high, MIN(precio) as low, COUNT(*) as volume 
                    FROM IntervalAsc
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
            `, [code, end, begin]);
            

            if (data.rows.length != 0 ) {
                price = {
                    high : data.rows[0].high,
                    low : data.rows[0].low,
                    open : data.rows[0].open,
                    close : data.rows[0].close,
                    date : new Date(data.rows[0].date),
                    volume : Number(data.rows[0].volume),
                };              
                evolution.push(price);

            } else { 
               noMore = true;
            }           
        }
        
    } catch(err) {
        console.log(err.stack);
    }
    return evolution;
}


/**
 * Get the evolution of a company's price. 
 * @param req - http request 
 * @param res - http response
 */
export async function getPriceEvolution(req : any, res : any ) {
    let code = req.params.code;
    let evolution = null; 
    try {
       evolution =  await companyEvolution(code);   
       PRICE_EVOLUTION = evolution;    
    } catch(err) {
        res.status(500).send({ok: false});
    }    


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(evolution);
}




/**
 * Get all the companies with its current price in the stock market.
 * @param req - http request
 * @param res - http response
 */
export async function getMarket(req : any, res : any ) {
    let data;
    let companies = new Array();
    
    try {
        data = await db.query(`
            SELECT DISTINCT C.codigo as code, C.nombre as name, P.precio as price, P.id as id
            FROM empresa C , precioaccion P  
            WHERE P.empresa=C.codigo AND
            P.fecha >= ALL (SELECT P2.fecha 
                            FROM precioaccion P2 
                            WHERE P2.empresa=P.empresa);
        `,[]);

        for (let row of data.rows) {
            companies.push({
                name : row.name,
                code : row.code,
                price : row.price,
                id : row.id,
                quantity : null,              
            });
        }

        res.send(companies);        

    } catch (err) {
        res.status(500).send({ok: false});
    }
}