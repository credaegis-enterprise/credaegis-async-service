const contractAritfact = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "rev",
        "type": "bool"
      }
    ],
    "name": "HashRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "batchId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "HashStored",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "merkleroot",
        "type": "string"
      }
    ],
    "name": "finaliseBatch",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllMerkleRoot",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "roots",
            "type": "string"
          }
        ],
        "internalType": "struct HashStore.allMerkleRoot[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "batchId",
        "type": "uint256"
      }
    ],
    "name": "getBatchById",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHashesForNextBatch",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "hashes",
        "type": "string[]"
      }
    ],
    "name": "getMerkleByHash",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "merkleRoot",
            "type": "string"
          }
        ],
        "internalType": "struct HashStore.HashMerklePair[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "hashesToRevoke",
        "type": "string[]"
      }
    ],
    "name": "revokeHashes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "stat",
            "type": "bool"
          }
        ],
        "internalType": "struct HashStore.RevokeResult[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "hashes",
        "type": "string[]"
      }
    ],
    "name": "storeHash",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "Hash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "stored",
            "type": "bool"
          }
        ],
        "internalType": "struct HashStore.StoreResult[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "hashesToVerify",
        "type": "string[]"
      }
    ],
    "name": "verifyHashesByValue",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "verifiedHashes",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "verificationResults",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "revoked",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "merkleRoot",
            "type": "string"
          }
        ],
        "internalType": "struct HashStore.VerificationResult[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


module.exports = contractAritfact;