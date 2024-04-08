# ChainLegit
decentralized platform for the exchange of legal documents

## foundry 
1. Initialize project using : ```forge init ChainLegit```
2. Make the smart contract from src folder
3. Install dependencies from openzeppelin using : ```forge install OpenZeppelin/openzeppelin-contracts```
4. The requried openzeppelin contracts will be available in the lib folder
5. Often times an error may pop up saying ```file import callback not supported```. You can resolve this by  ```forge remappings > remappings.txt```
6. Build the smart contract using ```forge build```
7. Write the test contract and test it using ```forge test```
## thirdweb
Deployed to thirdweb using the command : ```npx thirdweb deploy```
