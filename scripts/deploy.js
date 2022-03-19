/* eslint-disable no-undef */
async function deploy() {
  // Hardhat gets signers from the accounts configured in the config
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Create an instance of the contract by providing the name
  const ContractSource = await hre.ethers.getContractFactory(
    "Furystaker"
  );
  // The deployed instance of the contract
  const deployedContract = await ContractSource.deploy(
    "0x6B36DE5b13222Fc53dA506Ad50CaDd8D97AC72C4",  //Dev
    "0x72ed1b9052ceF0ed7f146c2ad0aF4D455f92F694",  //Marketing Sir
    1647954000
  );

  console.log("Contract deployed at:", deployedContract.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
