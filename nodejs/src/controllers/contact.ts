import { db } from "../db";
const nodeMailer = require('nodemailer');

/**
 * 
 * @param req - http request. It contains the message to be sent to the admin.
 * @param res - http request. 
 */
export async function sendEmail(req : any, res : any) {
    let userAddress : string = req.body.address;

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {

        }
    });

    let mailOptions = {
        from: userAddress, // sender address
        to: "admin@stockexchange.com", // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
    };

    transporter.sendMail(mailOptions, (error : any, info : any) => {
        if (error) {
            console.log(error);
            res.status(400).send({ok: false});
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.send({ok: true});
        }

    });

}