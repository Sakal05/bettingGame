const hre = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const Contract = await hre.ethers.getContractFactory("BettingGame");
  const contract = await Contract.attach(
    "0x95C3CD97cF1d78fc4Dc954384FEB5B0Dce2a7DF7" // The deployed contract address
  );

  // Connect to the provider with the new Metamask account
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "https://goerli.optimism.io"
  );
  const signer = new hre.ethers.Wallet(process.env.SECKEY, provider); // Replace <private key> with the private key of the new Metamask account

  // Connect the contract with the new signer
  const contractWithSigner = contract.connect(signer);

  const tx = await contractWithSigner.acceptBet(55, 11, {
    value: ethers.utils.parseUnits("1", "wei"),
  });

  const receipt = await tx.wait();

  // Log the transaction hash
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  // Log the event emitted by the contract
  const event = receipt.events.find((e) => e.event === "acceptedBetProposed");
  console.log(
    `Bet Accepted: index=${event.args._commitment}, value=${event.args.value}`
  );

  //validate tx hash: 0x7bcd0cb01609fbb971c8b5a1a767e95637b3242c254b6c1f553142b3b852cc5e
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
