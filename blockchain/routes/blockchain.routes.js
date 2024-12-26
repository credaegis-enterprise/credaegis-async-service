const router = require('express').Router();
const {verifyHashes} = require("../controller/blockchain.controller");


router.post('/verify',verifyHashes);

module.exports = router;