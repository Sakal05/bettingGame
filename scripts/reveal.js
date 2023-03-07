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
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider); // Replace <private key> with the private key of the new Metamask account

  // Connect the contract with the new signer
  const contractWithSigner = contract.connect(signer);

  const tx = await contractWithSigner.reveal(55, 11);

  const receipt = await tx.wait();

  // Log the transaction hash
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  // Log the event emitted by the contract emit BetSettled(_commitment, side_A, side_B, value);
  const event = receipt.events.find((e) => e.event === "BetSettled");
  console.log(
    `Settlement Bed: index=${event.args._commitment}, sideA=${event.args.side_A}, sideB=${event.args.side_B}, value=${event.args.value}`
  );

  //validate tx hash: 0x14d31abf873ce298145b4e540a6721b105f522db18ab9f5417bfa2518318d5e5
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
