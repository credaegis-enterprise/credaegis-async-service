const { ethers } = require("ethers");
const contractDetails = require("../contract/artifact");
require("dotenv").config();

console.log("process.env.RPC_URL", process.env.RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractDetails, signer);



module.exports.getMerkleRootByHashes = async (hashes) => {


    const results = await contract.getMerkleByHash(hashes);
    const formattedResult =  results.map(result => ({
      hash: result.hash,
      merkleRoot: result.merkleRoot
    }));

    return formattedResult;

}

module.exports.finalizeBatch = async (merkleRoot) => {
  try {
    const tx = await contract.finaliseBatch(merkleRoot);
    await tx.wait();
    const result = await contract.callStatic.finaliseBatch(merkleRoot);

    const [batchNumber, status] = result;

    if (batchNumber === undefined || status === undefined) {
      throw new Error("Received undefined values from the contract.");
    }

    console.log("Batch finalized successfully:", {
      batchId: batchNumber.toString(),
      isFinalized: status
    });
    
    return {
      batchId: batchNumber.toString(),
      isFinalized: status
    };
  } catch (error) {
    console.error("Error executing function:", error);
  }
};

module.exports.fetchHashesToVerify = async () => {
  const hashes = await contract.getHashesForNextBatch();
  if (hashes && hashes.length > 0) {
    const formattedResults = hashes.map((hash) => ({
      hash: hash,
    }));

    console.log("Fetched hashes for next batch:", formattedResults);
  } else {
    console.log("No new hashes found for the next batch.");
  }
};

module.exports.fetchContractState = async () => {
  try {
    const [batchHashCount, currentBatch, lastHashIndex] =
      await contract.getContractDetails();
    const contractState = {
      batchHashCount: batchHashCount.toString(),
      currentBatchIndex: currentBatch.toString(),
    };
    return contractState;
  } catch (error) {
    console.error("Error fetching contract details:", error);
  }
};

module.exports.fetchAllMerkleRoots = async () => {
  try {
    const merkleRoots = await contract.getAllMerkleRoot();
    const formattedResult = merkleRoots.map((result, index) => ({
      [`Batch ${index + 1}`]: result.roots,
    }));

    console.log("Hashes stored successfully:");
    console.log(formattedResult);
  } catch (error) {
    console.error("Error in fetching Merkle roots:", error);
  }
};

module.exports.fetchBatchInfo = async (batchId) => {
  try {
    const [hashes, merkleRoot, lastHashIndex] = await contract.getBatchById(
      batchId
    );

    const formattedResult = {
      hashes: hashes,
      merkleRoot: merkleRoot,
    };

    return formattedResult;
  } catch (error) {
    console.error("Error fetching batch details:", error);
  }
};

module.exports.revokeHashes = async (hashes) => {
  try {
    console.log("hashes", hashes);
    const tx = await contract.revokeHashes(hashes);
    const receipt = await tx.wait();

    const eventInterface = new ethers.utils.Interface(contractDetails);
    const events = receipt.logs
      .map((log) => {
        try {
          return eventInterface.parseLog(log);
        } catch (err) {
          return null;
        }
      })
      .filter((log) => log && log.name === "HashRevoked");

    const formattedResults = events.map((event) => ({
      hash: event.args.hash,
      revoked: event.args.rev,
    }));

    console.log("Hashes revoked:", formattedResults);
    return formattedResults;
  } catch (error) {
    console.error("Error revoking hashes:", error);
    throw error;
  }
};

module.exports.storeHashes = async (hashes) => {
  try {
    const results = await contract.callStatic.storeHash(hashes);
    const tx = await contract.storeHash(hashes);
    await tx.wait();

    const formattedResults = results.map((result) => ({
      Hash: result.Hash,
      Stored: result.stored,
    }));

    return formattedResults;
  } catch (error) {
    console.error("Error storing hashes:", error);
    throw error;
  }
};

module.exports.verifyHashes = async (hashes) => {
  const results = await contract.verifyHashesByValue(hashes);

  const formattedResults = results.map((result) => ({
    hash: result.verifiedHashes,
    isVerified: result.verificationResults,
    merkleRoot: result.merkleRoot.length > 0 ? result.merkleRoot : null
  }));

  return formattedResults;
};
