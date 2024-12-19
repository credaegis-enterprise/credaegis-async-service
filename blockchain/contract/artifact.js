const contractAritfact = {
    "_format": "hh-sol-artifact-1",
    "contractName": "HashStore",
    "sourceName": "contracts/HashStore.sol",
    abi: [
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
            "name": "hash",
            "type": "string"
          }
        ],
        "name": "getHashByValue",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
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
    ]}


    module.exports = contractAritfact;