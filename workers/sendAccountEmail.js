const sendAccountEmail = async (channel) => {
    console.log("Listening for account email requests");
    try {
        await channel.assertQueue('account_email_queue');   

        channel.consume('account_email_queue',async (message) => {
            const account = JSON.parse(message.content.toString());
            console.log(`Sending email to ${account.email}`);
            channel.ack(message);
    

        },{
            noAck: false
        });

    } catch (error) {
        console.error(error);
    }
}


module.exports = sendAccountEmail;