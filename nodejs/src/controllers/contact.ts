import { db } from "../db";
const nodeMailer = require('nodemailer');    // Node module which allows to send emails.

const ADMIN_ACCOUNT = "stockexchangessw@gmail.com";         // Administrator account 
const ADMIN_ACCOUNT_NODE_PASSW = "imaiqnxonsomwxur";        // Node password
const ADMIN_ACCOUNT_PASSW = "admin123>";                    // 'Human' password 

const CONFIRMATION_MESSAGE = `Estimado usuario. \n\n Su mensaje ha sido recibido. El administrador se pondrá en contacto con usted lo antes posible para
solucionar su consulta. \n\n (Este mensaje ha sido generado de forma automática. No intente responderlo.)`;


/**
 * Send the user message to the administrator account and a confirmation message to the user.
 * @param req - http request. It contains the message to be sent to the admin.
 * @param res - http request. 
 */
export async function sendContactEmail(req : any, res : any) {

    let userAddress = req.body.address;
    let userMessage = req.body.body;

    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: ADMIN_ACCOUNT, 
            pass: ADMIN_ACCOUNT_NODE_PASSW            
        }
    });

    let mailAdminOptions = {
        from: "", 
        to: "stockexchangessw@gmail.com", 
        subject: `From: <${userAddress}> - ` + req.body.subject, 
        text: userMessage, 
    };

    let mailUserOptions = {
        from: "stockexchangessw@gmail.com", 
        to: userAddress, 
        subject: 'Message received',
        text: CONFIRMATION_MESSAGE, 
    };

    // Send message to the administrator 
    transporter.sendMail(mailAdminOptions, (error1 : any, info1 : any) => {
        if (error1) {
            console.log(error1);
            res.send({ok: false});
        } else {
            console.log('Message %s sent to admin: %s', info1.messageId, info1.response);
            // Send confirmation email 
            transporter.sendMail(mailUserOptions, (error2 : any, info2 : any) => {
                if (error2) {
                    console.log(error2);
                    res.send({ok: false});
                } else {
                    console.log('Message %s sent to user: %s', info2.messageId, info2.response);
                    res.send({ok: true});
                }
            });  
        }
    });     

}

/**
 * Send an email with a new password to the user.
 * @param req - http request.
 * @param res - http request. 
 */
export async function sendRecoverPasswordEmail(req : any, res : any ) {

    let email = req.body.email;
    let recovery = await recoverByEmail(email);     
    if (!recovery) {
        res.send({error:1});
        return;
    }

    let password =  recovery.password;
    let nickname = recovery.nickname;


    let body = `Estimado ${nickname}.\n\n Has solicitado la recuperación de tu contraseña. Tu contraseña en StockExchangeBattleRoyale es '${password}'. \n\n 
    (Este mensaje ha sido generado de forma automática. No intente responderlo.)`;


    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: ADMIN_ACCOUNT, 
            pass: ADMIN_ACCOUNT_NODE_PASSW            
        }
    });

    let mailOptions = {
        from: "stockexchangessw@gmail.com", 
        to: email, 
        subject: 'Password recovery', 
        text: body, 
    };


    // Send password recovery email to user.
    transporter.sendMail(mailOptions, (error : any, info : any) => {
        if (error) {
            console.log(error);
            res.send({error: 2});
        } else {
            console.log('Message %s sent to user: %s', info.messageId, info.response);
            res.send({error : 0});
        }
    });
}

/**
 * Get the nickname and  password of an given user.
 * @param email - the email of the user whose password has to be obtained.
 */
async function recoverByEmail( email : string) {
    
    let data;
    let recovery;

    try {
        data = await db.query(`
            SELECT U.password, U.nickname FROM usuario U WHERE U.correo=$1;
        `, [email]);

        if (data.rows[0]) {
            recovery = {
                nickname : data.rows[0].nickname,
                password : data.rows[0].password, 
            };  
        }             
    
    } catch(err) {
        console.log(err.stack);
    }

    return recovery;
}