import { db } from "../db";

export function echo(req: Express.Request,res: any){
    res.send("ECHO");   
}

export async function ping(req: any, res: any){

    if(req.session.nickname){
        res.send({ok: true, nickname: req.session.nickname});
    }else{
        res.send({ok: false});
    }
}
