import { db } from "../db";


const INTERVALS = 50;      // Number of INTERVALS used to build the candlestick chart.

/**
 * Get the evolution of a company's price.
 * @param code - the code of the company whose evolution is obtained.
 */
async function companyEvolution( code : string ) : Promise<any> {   
    let price : any;
    let data;
    let noMore : boolean = false;
    let evolution : any[] = [];      
    
    try {

        for(let i = 0; i < INTERVALS && !noMore; i++ ) {            
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
export async function getCompanyEvolution(req : any, res : any ) {
    let code = req.params.code;
    let evolution = null; 
    try {
       evolution =  await companyEvolution(code);       
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