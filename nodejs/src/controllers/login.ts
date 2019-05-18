import { db } from "../db";

const bcrypt = require('bcrypt');

export async function login(req: any,res: any){
    let nickname = req.body.nickname;
    let password = req.body.password;

    try{
        let data = await db.query(`
        SELECT password
        FROM usuario
        WHERE
            nickname = $1
        `,[nickname]);
        if(data.rows.length === 0){
            res.send({ok: false});
        }
        let valid = await bcrypt.compare(password,data.rows[0].password);
        if(valid){
            log(req,res,nickname);
            res.send({ok: true});
        }else{
            res.send({ok: false});
        }
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }

}

export async function register(req: any, res: any){
    let nickname = req.body.nickname;
    let password = req.body.password;
    let email = req.body.email;
    let name = req.body.name;

    try{
        let hash = await bcrypt.hash(password,10);
        let data = await db.query(`
            INSERT INTO usuario
            (nickname,nombre,password,correo,saldo)
            VALUES
            ($1,$2,$3,$4,100000)
            `,[nickname,name,hash,email]);
        log(req,res,nickname);
        res.send({ok: true});
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }
    
}

function log(req: any,res: any,nickname: string){
    req.session.nickname = nickname;
    res.cookie("nickname",nickname);
}

export function logout(req:any, res:any){
    try{
    res.clearCookie('connect.sid', {path: '/'});
    res.send({ok: true});
    }catch(e){
        res.status(520).send({ok:false});
    }
}