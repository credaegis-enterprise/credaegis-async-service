const router = require('express').Router();
const {verifyHashes,fetchCurrentBatchInfo,fetchContractState,fetchAllMerkleRoots,fetchHashesToVerify,fetchBatchInfo,finalizeBatch} = require("../controller/blockchain.controller");


router.post('/verify',verifyHashes);
router.get('/current-batch',fetchCurrentBatchInfo) //info about current batch
router.get('/contract-state',fetchContractState);
router.get("/merkle-root/all",fetchAllMerkleRoots);
router.get("/unverified/hashes",fetchHashesToVerify);
router.get ("/batch/:id",fetchBatchInfo); //info on any batch
router.post("/finalize/:merkleRoot",finalizeBatch);



module.exports = router;