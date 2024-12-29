
const {storeHashes,revokeHashes} = require('../utils/interact')



const revocationWorker = async(revocationRequestChannel,revocationResponseChannel,errorChannel)=>{
    console.log("Listening for revocation requests");
    try {

        
        revocationRequestChannel.prefetch(1);
        revocationRequestChannel.consume('REVOKE_REQUEST_QUEUE',async (message) => {
            try{
            const content = JSON.parse(message.content.toString());
            const input = new Array(content.hash);
            console.log("input",input);
            const result = await revokeHashes(input);
            console.log("result",result);
            const updatedResult = {
                ...content,
                hash: result[0].hash,
                revoked: result[0].revoked

            }
            console.log("updatedResult",updatedResult);
            revocationResponseChannel.publish('DIRECT_EXCHANGE','revoke_response',Buffer.from(JSON.stringify(updatedResult)));
            revocationRequestChannel.ack(message);
        }
        catch(error){
            revocationRequestChannel.nack(message,false,false);
        }
    

        },{
            noAck: false
        });

    }
    catch(error){
        console.error(error);
    }
}


const approvalWorker = async(approvalRequestChannel,approvalResponseChannel,errorChannel)=>{
    console.log("Listening for approval requests");
    try {
    
        
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
                stored: result[0].Stored,
                userId: content.userId
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


module.exports = {approvalWorker,revocationWorker};