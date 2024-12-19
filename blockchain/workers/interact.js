const {ethers} = require('ethers');
const contractDetails = require('../contract/artifact.js');
require('dotenv').config();



console.log("process.env.RPC_URL",process.env.RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress,contractDetails.abi , signer);




async function storeHashes(hashes) {
    try {

      const results = await contract.callStatic.storeHash(hashes);
      const tx = await contract.storeHash(hashes);
      await tx.wait(); 
  
      const formattedResults = results.map(result => ({
        Hash: result.Hash,
        Stored: result.stored
      }));
  
      console.log("Hashes stored successfully:", formattedResults);
      return formattedResults;
    } catch (error) {
      console.error("Error storing hashes:", error);
      throw error;
    }
  }


  storeHashes(["allen","allenh"]);