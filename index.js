const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
const amqp = require('amqplib');
const cors = require('cors');

const app = express();

const {approvalWorker,revocationWorker} = require('./blockchain/workers/besuWorkers');
const port = process.env.PORT


const blockchainRoutes = require('./blockchain/routes/blockchain.routes');



app.use(express.json());
app.use(cors());

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_HOST);
        approvalRequestChannel = await connection.createChannel();
        approvalResponseChannel = await connection.createChannel();
        revokeRequestChannel = await connection.createChannel();
        revokeResponseChannel = await connection.createChannel();
        errorChannel = await connection.createChannel();

        console.log("Connected to RabbitMQ");     
        await approvalWorker(approvalRequestChannel,approvalResponseChannel,errorChannel);
        await revocationWorker(revokeRequestChannel,revokeResponseChannel,errorChannel);
  
    } catch (error) {
        console.error("error starting async services", error);
        console.error(error);
    }
    }

connectToRabbitMQ();
app.use(function (err, req, res, next) {
    res
      .status(err.status || 500)
      .send({ message: err.message, stack: err.stack });
  });



app.use('/api/v1/blockchain',blockchainRoutes);
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
)



