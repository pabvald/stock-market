import { db } from "../db";
const nodeMailer = require('nodemailer');    // Library for sending emails
const bcrypt = require('bcrypt');            // Library for encrypting
const generator = require('generate-password'); // Library for generating random passwords

const ADMIN_ACCOUNT = "stockexchangessw@gmail.com";         // Administrator account 
const ADMIN_ACCOUNT_NODE_PASSW = "imaiqnxonsomwxur";        // Node password
const ADMIN_ACCOUNT_PASSW = "admin123>";                    // 'Human' password 

const CONFIRMATION_MESSAGE = `Estimado usuario.\nSu mensaje ha sido recibido. El administrador se pondrá en contacto con usted lo antes posible para
solucionar su consulta.\n\n(Este mensaje ha sido generado de forma automática. No intente responderlo.)`;


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
        subject: 'Mensaje recibido',
        text: CONFIRMATION_MESSAGE
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
    let password = generator.generate({
        length: 10,
        numbers: true
    });    
    let nickname = await getNicknameByEmail(email);

    if (!nickname) { // User not registered
        res.send({error : 1});
        return;
    }
    let body = `Estimado ${nickname}.\n\n Ha solicitado la recuperación de su contraseña. Su nueva contraseña en StockExchangeBattleRoyale es '${password}'.\n\n (Este mensaje ha sido generado de forma automática. No intente responderlo.)`;

    let ok = await changePasswordByNickname(nickname, password);

    if (ok !== 0) {
        res.send({error: 2});
        return;
    }
    

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
        subject: 'Recuperación de contraseña', 
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
 * Send a registration confirmation email to the user.
 * @param req - http request.
 * @param res - http request. 
 */
export async function sendRegisterConfirmationEmail(req : any, res : any) {

    let nickname = req.body.nickname;
    let userAddress = req.body.address;
    let body = `Estimado ${nickname}.\n\n Ahora forma usted parte de la comunidad de  StockExchangeBattleRoyale. ¡Disfrútelo!.\n\n(Este email ha sido generado automáticamente. Por favor, no responda a este mensaje)`;
    

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
        to: userAddress, 
        subject: 'Nuevo usuario de StockExchangeBattleRoyale', 
        text: body, 
    };


    // Send register confirmation email to user.
    transporter.sendMail(mailOptions, (error : any, info : any) => {
        if (error) {
            console.log(error);
            res.send({ok: false});
        } else {
            console.log('Message %s sent to user: %s', info.messageId, info.response);
            res.send({ok: true});
        }
    });
}



/**
 * Get a user's nickname by its email.
 * @param email - user's email address.
 * @return undefined if there isn't any user with the given email 
 */
async function getNicknameByEmail(email : string) {
    let data;
    let nickname;

    try {
        data = await db.query(`
            SELECT U.nickname FROM usuario U WHERE U.correo=$1;
        `,[email]);

        if (data.rows.length !== 0) {
            nickname = data.rows[0].nickname;
        }

    } catch(err){
        console.log(err.stack);
    }

    return nickname;
}

/**
 * Change the password of a registered user.
 * @param nickname - user's nickname 
 * @param password - new password
 */
async function changePasswordByNickname(nickname : string, password : string){
    let data;
    let hash;

    try {
        hash = await bcrypt.hash(password,10);
        data = await db.query(`
            UPDATE usuario
            SET password=$2
            WHERE nickname=$1;
        `, [nickname, hash]);
        
    } catch(err) {
        console.log(err.stack);
        return 1;
    }

    return 0;
}

