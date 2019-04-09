
const nodeMailer = require('nodemailer');    // Node module which allows to send emails.

const ADMIN_ACCOUNT = "stockexchangessw@gmail.com";         // Administrator account 
const ADMIN_ACCOUNT_NODE_PASSW = "imaiqnxonsomwxur";        // Node password
const ADMIN_ACCOUNT_PASSW = "admin123>";                    // 'Human' password 

const CONFIRMATION_CONTACT_MESSAGE = `Estimado usuario.\n\n Hemos recibido su mensaje. El administrador se pondrá en contacto con usted lo antes posible. Gracias.`;


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
        text: CONFIRMATION_CONTACT_MESSAGE, 
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

    let newPassword = req.body.newPassword;
    let nickname = req.body.nickname;
    let body = `Estimado ${nickname}.\n\n Su nueva contraseña de 'StockExchangeBattleRoyale' es '${newPassword}'.\n\n (Este email ha sido generado automáticamente. Por favor, no responda a este mensaje)`;
    let userAddress = req.body.address;

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
        subject: 'Password recovery', 
        text: body, 
    };


    // Send password recovery email to user.
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
 * Send a registration confirmation email to the user.
 * @param req - http request.
 * @param res - http request. 
 */
export async function sendRegisterConfirmationEmail(req : any, res : any) {

    let nickname = req.body.nickname;
    let userAddress = req.body.address;
    let body = `Estimado ${nickname}.\n\n Ahora forma usted parte de la comunidad de  StockExchangeBattleRoyale. ¡Disfrútalo!.\n\n (Este email ha sido generado automáticamente. Por favor, no responda a este mensaje)`;
    

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
        subject: 'Registro en StockExchangeBattleRoyale', 
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

