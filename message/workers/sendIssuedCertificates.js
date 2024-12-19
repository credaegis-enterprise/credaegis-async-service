const sendIssuedCertificates = async (channel) => {
    console.log("Listening for issued certificates");
    try {
        await channel.assertQueue('account_email_queue');   

        channel.consume('account_email_queue', (message) => {
            const account = JSON.parse(message.content.toString());
            console.log(`Sending email to ${account.email}`);
            channel.ack("completed");

        });

    } catch (error) {
        console.error(error);
    }
}


module.exports = sendIssuedCertificates;