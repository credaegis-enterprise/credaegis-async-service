const {verifyHashes} = require("../utils/interact");


module.exports.verifyHashes = async(req,res)=>{

   console.log("req.body",req.body);
    try {
        

        const results = await verifyHashes(req.body);
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