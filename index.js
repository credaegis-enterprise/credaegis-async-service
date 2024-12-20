const dotenv = require('dotenv');
dotenv.config();
const amqp = require('amqplib');

const test = require('./blockchain/workers/test')


let channel, connection;

const connectToRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_HOST);
        approvalRequestChannel = await connection.createChannel();
        approvalResponseChannel = await connection.createChannel();
        errorChannel = await connection.createChannel();

        console.log("Connected to RabbitMQ");     
        await test(approvalRequestChannel,approvalResponseChannel,errorChannel);
  
    } catch (error) {
        console.error("error starting async services", error);
        console.error(error);
    }
    }

connectToRabbitMQ();


