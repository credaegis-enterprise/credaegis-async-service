const dotenv = require('dotenv');
dotenv.config();
const amqp = require('amqplib');

const sendAccountEmail = require('./workers/sendAccountEmail');
const sendIssuedCertificates = require('./workers/sendIssuedCertificates');


let channel, connection;

const connectToRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_HOST);
        channel = await connection.createChannel();

        console.log("Connected to RabbitMQ");

        await sendAccountEmail(channel);
  


        
    } catch (error) {
        console.error("error starting async services", error);
        console.error(error);
    }
    }

connectToRabbitMQ();


