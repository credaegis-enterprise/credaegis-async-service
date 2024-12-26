const {ethers} = require('ethers');
const contractDetails = require('../contract/artifact');
require('dotenv').config();



console.log("process.env.RPC_URL",process.env.RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress,contractDetails , signer);




module.exports.storeHashes = async (hashes) => {
    try {

      const results = await contract.callStatic.storeHash(hashes);
      const tx = await contract.storeHash(hashes);
      await tx.wait(); 
  
      const formattedResults = results.map(result => ({
        Hash: result.Hash,
        Stored: result.stored
      }));
  
      return formattedResults;
    } catch (error) {
      console.error("Error storing hashes:", error);
      throw error;
    }
  }



  module.exports.verifyHashes = async (hashes) => {

    const results = await contract.verifyHashesByValue(hashes);
 
    const formattedResults = results.map(result => ({
        hash: result.verifiedHashes,
        isVerified: result.verificationResults,
    }));

    return formattedResults;
 
  }
