import  nodemailer  from "nodemailer";

//create transporter
const Transporter = nodemailer.createTransport({
    service : 'gmail',
    host : process.env.HOST,
    port : 587,
    secure : false,
    auth :{
        user : process.env.USER_EMAIL,
        pass : process.env.USER_PASSWORD
    }
})

//email sender

export const sendEmail = async (options : any) =>{
    const mailOptions = {
        from : {
            adress  : options.senderEmail || process.env.USER_EMAIL,
            name : options.senderName || process.env.USER_NAME
        },
        to : options.email,
        subject : options.subject || '',
        cc : options.cc || '',
        text : options.message
    }

    await Transporter.sendMail(mailOptions)
    return { success: true, message: 'Email sent successfully' };
}