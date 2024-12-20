
const {storeHashes} = require('./interact')


const test = async(approvalRequestChannel,approvalResponseChannel,errorChannel)=>{
    console.log("Listening for test requests");
    try {
    
        approvalRequestChannel.bindQueue('APPROVAL_REQUEST_QUEUE','DIRECT_EXCHANGE','approval_request');
        approvalRequestChannel.prefetch(1);
        approvalRequestChannel.consume('APPROVAL_REQUEST_QUEUE',async (message) => {
            try{
            const content = JSON.parse(message.content.toString());
            console.log("content",content);
            const input = new Array(content.hash);
            const result = await storeHashes(input);
            const updatedResult = {
                approvalId: content.approvalId,
                hash: result[0].Hash,
                stored: result[0].Stored
            }

            console.log("updatedResult",updatedResult);
            
            approvalResponseChannel.publish('DIRECT_EXCHANGE','approval_response',Buffer.from(JSON.stringify(updatedResult)));
            approvalRequestChannel.ack(message);
        }
        catch(error){
                approvalRequestChannel.nack(message,false,false);
        }
    

        },{
            noAck: false
        });

    } catch (error) {
        console.error(error);
    }
}


module.exports = test;