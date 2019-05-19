/* Construye datos falsos para simular el comportamiento de la bolsa */
import { parentPort } from 'worker_threads';
import { db } from '../db';

const random = require("random");

async function update(){
    console.log("START UPDATING TASK");
    const query_current = `
    SELECT DISTINCT P.empresa,
        (SELECT P2.precio 
        FROM precioaccion P2 
        WHERE 
            P2.empresa=P.empresa 
        ORDER BY fecha DESC 
        LIMIT 1)
    FROM precioaccion P;
    `;
    try { 
        let current_data = await db.query(query_current);
        let normal = random.normal(0,250);
        for(let row of current_data.rows){
            let precio: number = row.precio;
            precio += Math.round(normal());
            precio = Math.max(1,precio);
            let res = await db.query("INSERT INTO precioAccion(id, empresa, fecha, precio) VALUES (DEFAULT,$1,NOW(),$2)",[row.empresa,precio]);
        }
        console.log("END UPDATING TASK");
    } catch (err) {
        console.log("ERROR in UPDATE!!");
        console.log(err.stack);
    }
}
update();
setInterval(update,1000*60); // Cada minuto