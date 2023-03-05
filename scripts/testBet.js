const hre = require("hardhat");

async function main() {

  const Contract = await hre.ethers.getContractFactory("BettingGame");
  const contract = await Contract.attach(
    "0x2422C589F78695Be798e4BfEdBb2469a55be6a19" // The deployed contract address
);

  await contract.proposeBet(5, {value: ethers.utils.parseEther("1"), gasLimit: 40000});

  
  const receipt = await tx.wait();

  // Log the transaction hash
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  // Log the event emitted by the contract
  const event = receipt.events.find((e) => e.event === "betProposed");
  console.log(`Bet proposed: index=${event.args._commitment}, value=${event.args.value}`);
}

//Contract successfully deplo to 0x2422C589F78695Be798e4BfEdBb2469a55be6a19
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});