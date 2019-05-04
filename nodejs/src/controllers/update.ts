import { db } from "../db";

const bcrypt = require('bcrypt');

export async function checkPassword(req: any,res: any){
    let nickname = req.body.nickname;
    let password = req.body.password;
    try{
        let data = await db.query(`
        SELECT password
        FROM usuario
        WHERE
            nickname = $1
        `,[nickname]);
        let valid = await bcrypt.compare(password,data.rows[0].password);
        if(valid){
        	//console.log("password is valid");
            res.send({ok: true});
        }else{
        	//console.log("password is not valid");
            res.send({ok: false});
        }
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }

}

export async function updateName(req: any,res: any){
    let nickname = req.body.nickname;
    let name = req.body.name;
    try{
        let data = await db.query(`
        	UPDATE usuario
			SET nombre = $2
			WHERE
			nickname = $1;
		`,[nickname, name]);
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }
}

export async function updateBio(req: any,res: any){
    let nickname = req.body.nickname;
    let biography = req.body.biography;
    try{

        let data = await db.query(`
        	UPDATE usuario
			SET biografia = $2
			WHERE
			nickname = $1;
		`,[nickname, biography]);
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }
}

export async function updatePic(req: any,res: any){
    let nickname = req.body.nickname;
    let name = req.body.name;
    try{

        let data = await db.query(`
        	UPDATE usuario
			SET urlfoto = $2
			WHERE
			nickname = $1;
		`,[nickname, name]);
    }catch(e){
        console.error(e);
        res.status(500).send({ok: false});
    }
}