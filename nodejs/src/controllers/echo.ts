import { db } from "../db";

export function echo(req: Express.Request,res: any){
    res.send("ECHO");   
}

export async function get_users(req: any, res: any){
    let nicknames = await db.query("SELECT nickname FROM usuario");
    console.log(nicknames);
}
