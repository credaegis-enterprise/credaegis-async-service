const sendMail = require('../utils/sendMail');


const forgotPasswordEmail = async (channel) => {

    console.log("Listening for forgot password email requests");
    

    try {
        
        channel.prefetch(1);
        channel.consume('EMAIL_QUEUE',async (message) => {
            const mail = JSON.parse(message.content.toString());
            channel.ack(message);
            await sendMail(mail.recipientEmail,mail.subject,mail.content);
        },{
            noAck: false
        });

    } catch (error) {
        console.error(error);
    }


}


module.exports = forgotPasswordEmail;




