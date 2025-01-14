const { parse } = require("dotenv");
const interactFunctions = require("../utils/interact");




module.exports.fetchBatchInfo = async(req,res)=>{

    try{

        
        const batchId = parseInt(req.params.id);
        const contractState = await interactFunctions.fetchContractState();

        if(batchId>contractState.currentBatchIndex){
            res.status(400).send({
                message: "Batch does not exist, current batch index is "+contractState.currentBatchIndex
            });
        }
        
        const batchInfo = await interactFunctions.fetchBatchInfo(batchId);

        res.status(200).json({
            batchInfo: batchInfo
        });

    }
    catch(error){
        console.error("Error fetching batch info:",error);
        res.status(500).send({
            message: "Error fetching batch info",
            error: error
        });

    }
}
module.exports.fetchHashesToVerify = async(req,res)=>{
 try{

    const hashes = await interactFunctions.fetchHashesToVerify();
    res.status(200).send({
        message: "Hashes to verify fetched",
        hashes: hashes
    });

 }
 catch(error){
        console.error("Error fetching hashes to verify:",error);
        res.status(500).send({
            message: "Error fetching hashes to verify",
            error: error
        });
    }

}


module.exports.fetchAllMerkleRoots = async(req,res)=>{
    try{

        const merkleRoots =  await interactFunctions.fetchAllMerkleRoots();
        return res.status(200).json({
            merkleRoots: merkleRoots
        });
    }
    catch(error){
        console.error("Error fetching all merkle roots:",error);
        res.status(500).send({
            message: "Error fetching all merkle roots",
            error: error
        });

    }
}


module.exports.fetchContractState = async(req,res)=>{


    try{
        const result =  await interactFunctions.fetchContractState();
        console.log("result",result);
        res.status(200).json({
            contractState: result
        });

    }
    catch(error){
        console.error("Error fetching contract state:",error);
        res.status(500).send({
            message: "Error fetching contract state",
            error: error
        });

    }
}



module.exports.fetchCurrentBatchInfo = async(req,res)=>{
    try{

        const contractState = await interactFunctions.fetchContractState();
        const currentBatchIndex = parseInt(contractState.currentBatchIndex);
        const currentBatchInfo = await interactFunctions.fetchBatchInfo(currentBatchIndex);
        console.log("currentBatchInfo",currentBatchInfo);
        res.status(200).json({
            currentBatchInfo: currentBatchInfo
        });

    }
    catch(error){
        console.error("Error fetching current batch info:",error);
        res.status(500).send({
            message: "Error fetching current batch info",
            error: error
        });

    }
}
module.exports.verifyHashes = async(req,res)=>{

   console.log("req.body",req.body);
    try {
        

        const results = await interactFunctions.verifyHashes(req.body);
        console.log("results",results);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error verifying hashes:", error);
        res.status(500).send
        ({
            message: "Error verifying hashes",
            error: error
        });
    }

}